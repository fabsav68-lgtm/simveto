// ═══════════════════════════════════════════════════════
//  praxis-audio.js — lecture audio partagée
//  Utilise window.PRAXIS_AUDIO_SELECTOR (défini par chaque
//  module avant l'inclusion de ce script) pour savoir quoi lire.
// ═══════════════════════════════════════════════════════

var _lecture = false;

function meilleureVoixFr() {
  var voix = speechSynthesis.getVoices().filter(function (v) {
    return v.lang && v.lang.toLowerCase().indexOf('fr') === 0;
  });
  if (voix.length === 0) return null;
  var bonsNoms = ['amélie', 'audrey', 'thomas', 'daniel'];
  var meilleure = voix.find(function (v) {
    return /enhanced|premium|neural/i.test(v.name);
  });
  if (!meilleure) {
    meilleure = voix.find(function (v) {
      var n = v.name.toLowerCase();
      return bonsNoms.some(function (bn) { return n.indexOf(bn) !== -1; });
    });
  }
  return meilleure || voix[0];
}

function lireOnglet() {
  if (_lecture) { stopLecture(); return; }
  if (!('speechSynthesis' in window)) {
    alert('Lecture audio non disponible sur ce navigateur.');
    return;
  }
  var selecteur = window.PRAXIS_AUDIO_SELECTOR || '.card-title, .card-sub, .info, p';
  var textes = [];
  document.querySelectorAll(
    selecteur.split(',').map(function (s) { return '#app ' + s.trim(); }).join(',')
  ).forEach(function (el) {
    var t = el.innerText.trim();
    if (t.length > 2) textes.push(t);
  });
  if (textes.length === 0) return;

  _lecture = true;
  var btn = document.getElementById('btn-audio');
  if (btn) btn.textContent = '⏹ Stop';

  var voixChoisie = meilleureVoixFr();
  var i = 0;
  function suivante() {
    if (!_lecture || i >= textes.length) { stopLecture(); return; }
    var u = new SpeechSynthesisUtterance(textes[i++]);
    u.lang = 'fr-FR';
    u.rate = 0.9;
    if (voixChoisie) u.voice = voixChoisie;
    u.onend = suivante;
    u.onerror = suivante;
    speechSynthesis.speak(u);
  }
  speechSynthesis.cancel();
  setTimeout(suivante, 50);
}

function stopLecture() {
  _lecture = false;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  var btn = document.getElementById('btn-audio');
  if (btn) btn.textContent = '🔊 Écouter';
}
