// ═══════════════════════════════════════════════════════
//  PRAXISVETO — Système de Splash Cinématique
//  Style cinématique : situation → tension → question
//  Une micro-histoire par module · 6 secondes · bouton Passer
//
//  Usage : <script src="praxisveto-splash.js"></script>
//  Détection automatique du module via document.title / URL
// ═══════════════════════════════════════════════════════

(function(){

// ── MICRO-HISTOIRES PRAXISVETO ───────────────────────────
var HISTOIRES = {

  'accueil': {
    icon: '🏥',
    couleur: '#a060f8',
    scenes: [
      { texte: '8h45. La clinique\nouvre dans 15 minutes.', sous: '' },
      { texte: 'Le téléphone sonne\ndéjà.', sous: 'Un propriétaire. Paniqué.' },
      { texte: '"Mon chien fait\ndes convulsions."', sous: 'Il attend votre réponse.' },
      { texte: 'Que lui dites-vous\nen premier ?', sous: '', question: true },
    ]
  },

  'admin': {
    icon: '📋',
    couleur: '#60a8f8',
    scenes: [
      { texte: 'Mardi matin.\nConsultations à flux tendu.', sous: '' },
      { texte: 'Le frigo à vaccins\naffiche 11°C.', sous: 'Il devrait être à 4°C.' },
      { texte: 'La alarme s\'est\ndéclenchée à 3h du matin.', sous: '' },
      { texte: 'Que faites-vous\navant toute chose ?', sous: '', question: true },
    ]
  },

  'hygiene': {
    icon: '🧹',
    couleur: '#40c878',
    scenes: [
      { texte: 'Un chat parvovirosique\na été hospitalisé 3 jours.', sous: '' },
      { texte: 'Il vient de partir.\nLe chenil est vide.', sous: '' },
      { texte: 'Le prochain animal\narrive dans 2 heures.', sous: '' },
      { texte: 'Par où\ncommencez-vous ?', sous: '', question: true },
    ]
  },

  'contention': {
    icon: '⚠️',
    couleur: '#e84040',
    scenes: [
      { texte: 'Un berger allemand\narrive en laisse.', sous: '' },
      { texte: 'Il retrousse les babines\ndès que vous approchez.', sous: '' },
      { texte: 'Le propriétaire dit\n"d\'habitude il est gentil."', sous: '' },
      { texte: 'Quel est votre\npremier geste ?', sous: '', question: true },
    ]
  },

  'comm': {
    icon: '🤝',
    couleur: '#40a8e0',
    scenes: [
      { texte: 'Mme Martin arrive\nles yeux rouges.', sous: '' },
      { texte: 'Son chat Caramel\nvient de mourir sur la table.', sous: '' },
      { texte: 'Le vétérinaire\nest en chirurgie.', sous: 'Elle vous regarde.' },
      { texte: 'Que lui dites-vous ?', sous: '', question: true },
    ]
  },

  'juridique': {
    icon: '⚖️',
    couleur: '#e8a030',
    scenes: [
      { texte: 'Un client furieux\nagite une facture.', sous: '' },
      { texte: '"Mon chien a mordu\nma voisine hier soir."', sous: '' },
      { texte: '"Le vétérinaire ne m\'a\npas dit ce que je devais faire."', sous: '' },
      { texte: 'Quelles sont vos\nobligations légales ?', sous: '', question: true },
    ]
  },

  'diabete': {
    icon: '🩸',
    couleur: '#78d840',
    scenes: [
      { texte: 'Rex, 8 ans.\nDiabétique depuis 6 mois.', sous: '' },
      { texte: 'Sa glycémie ce matin :\n0,38 g/L.', sous: '' },
      { texte: 'Le vétérinaire\nest en consultation.', sous: 'Rex tremble légèrement.' },
      { texte: 'Que reconnaissez-vous ?\nQue faites-vous ?', sous: '', question: true },
    ]
  },

  'vitaux': {
    icon: '📊',
    couleur: '#60a8f8',
    scenes: [
      { texte: 'Premier jour de stage\nen clinique vétérinaire.', sous: '' },
      { texte: 'Le vétérinaire vous tend\nun stéthoscope.', sous: '' },
      { texte: '"Prenez les constantes\nde Noisette."', sous: 'Un lapin. 2 kg. Immobile.' },
      { texte: 'Par quoi\ncommencez-vous ?', sous: '', question: true },
    ]
  },

  'anesth': {
    icon: '💉',
    couleur: '#c060f8',
    scenes: [
      { texte: 'Milo, 3 ans.\nCastration sous AG.', sous: '' },
      { texte: '20 minutes après\nl\'induction.', sous: 'La SpO₂ affiche 88%.' },
      { texte: 'L\'alarme sonne.\nLe vétérinaire opère.', sous: '' },
      { texte: 'Que vérifiez-vous\nen premier ?', sous: '', question: true },
    ]
  },

};

// ── DÉTECTION DU MODULE ──────────────────────────────────
function detecterModule(){
  var title = (document.title || '').toLowerCase();
  var url   = (window.location.href || '').toLowerCase();
  var combined = title + ' ' + url;

  if(/accueil/.test(combined))           return 'accueil';
  if(/admin/.test(combined))             return 'admin';
  if(/hygi[eè]ne/.test(combined))        return 'hygiene';
  if(/contention/.test(combined))        return 'contention';
  if(/comm/.test(combined))              return 'comm';
  if(/juridique/.test(combined))         return 'juridique';
  if(/diab[eè]te|diabete|canin/.test(combined)) return 'diabete';
  if(/vitaux/.test(combined))            return 'vitaux';
  if(/anesth/.test(combined))            return 'anesth';
  return null;
}

// ── CSS ──────────────────────────────────────────────────
function injecterCSS(){
  if(document.getElementById('praxis-splash-css')) return;
  var style = document.createElement('style');
  style.id = 'praxis-splash-css';
  style.textContent = `
    #praxis-splash {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #0a0d08;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 24px;
      font-family: 'Georgia', 'Times New Roman', serif;
      overflow: hidden;
    }
    #praxis-splash::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(0deg, rgba(120,216,64,.012) 0, rgba(120,216,64,.012) 1px, transparent 1px, transparent 60px),
        repeating-linear-gradient(90deg, rgba(120,216,64,.012) 0, rgba(120,216,64,.012) 1px, transparent 1px, transparent 60px);
      pointer-events: none;
    }
    .splash-scene {
      text-align: center;
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 28px;
      opacity: 0;
      transition: opacity .5s ease;
      pointer-events: none;
    }
    .splash-scene.active { opacity: 1; pointer-events: auto; }
    .splash-texte {
      font-size: clamp(22px, 5vw, 32px);
      font-weight: 400;
      color: #d8e8d0;
      line-height: 1.45;
      text-align: center;
      white-space: pre-line;
      letter-spacing: -0.3px;
      margin-bottom: 12px;
      font-style: italic;
    }
    .splash-texte.question {
      font-style: normal;
      font-weight: 700;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.5px;
    }
    .splash-sous {
      font-size: 14px;
      color: #3a5030;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-style: normal;
      letter-spacing: 0.5px;
      text-align: center;
      line-height: 1.6;
    }
    .splash-progress {
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      background: var(--splash-color, #78d840);
      width: 0;
      transition: width linear;
      opacity: 0.7;
    }
    .splash-passer {
      position: absolute;
      top: 16px; right: 16px;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #3a5030;
      cursor: pointer;
      font-family: 'Fira Mono', 'Courier New', monospace;
      transition: color .2s, border-color .2s;
      -webkit-tap-highlight-color: transparent;
    }
    .splash-passer:hover { color: #d8e8d0; border-color: rgba(255,255,255,.2); }
    .splash-commencer {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--splash-color, #78d840);
      border: none;
      border-radius: 30px;
      padding: 14px 36px;
      font-size: 14px;
      font-weight: 700;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      letter-spacing: -0.3px;
      color: #0a0d08;
      cursor: pointer;
      opacity: 0;
      transition: opacity .4s ease, transform .2s ease;
      -webkit-tap-highlight-color: transparent;
      white-space: nowrap;
    }
    .splash-commencer.show { opacity: 1; }
    .splash-commencer:hover { transform: translateX(-50%) translateY(-2px); }
    .splash-points {
      position: absolute;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      opacity: 0;
      transition: opacity .4s;
    }
    .splash-points.show { opacity: 1; }
    .splash-point {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: rgba(255,255,255,.12);
      transition: background .3s;
    }
    .splash-point.active { background: var(--splash-color, #78d840); }
    #praxis-splash.fade-out {
      opacity: 0;
      transition: opacity .5s ease;
    }
  `;
  document.head.appendChild(style);
}

// ── LANCER ───────────────────────────────────────────────
function lancerSplash(moduleKey){
  var histoire = HISTOIRES[moduleKey];
  if(!histoire) return;

  injecterCSS();

  var couleur = histoire.couleur;
  var scenes  = histoire.scenes;
  var DUREE   = 1600; // ms par scène

  var el = document.createElement('div');
  el.id = 'praxis-splash';
  el.style.setProperty('--splash-color', couleur);

  // Bouton passer
  var btnPasser = document.createElement('button');
  btnPasser.className = 'splash-passer';
  btnPasser.textContent = 'Passer →';
  btnPasser.onclick = fermer;
  el.appendChild(btnPasser);

  // Scènes
  var sceneEls = scenes.map(function(scene){
    var div = document.createElement('div');
    div.className = 'splash-scene';
    var p = document.createElement('p');
    p.className = 'splash-texte' + (scene.question ? ' question' : '');
    p.style.color = scene.question ? couleur : '#d8e8d0';
    p.textContent = scene.texte;
    div.appendChild(p);
    if(scene.sous){
      var s = document.createElement('p');
      s.className = 'splash-sous';
      s.textContent = scene.sous;
      div.appendChild(s);
    }
    return div;
  });
  sceneEls.forEach(function(s){ el.appendChild(s); });

  // Points
  var pointsWrap = document.createElement('div');
  pointsWrap.className = 'splash-points';
  var pointEls = scenes.map(function(){
    var d = document.createElement('div');
    d.className = 'splash-point';
    return d;
  });
  pointEls.forEach(function(p){ pointsWrap.appendChild(p); });
  el.appendChild(pointsWrap);

  // Bouton commencer
  var btnCommencer = document.createElement('button');
  btnCommencer.className = 'splash-commencer';
  btnCommencer.textContent = 'Commencer →';
  btnCommencer.onclick = fermer;
  el.appendChild(btnCommencer);

  // Barre progression
  var progress = document.createElement('div');
  progress.className = 'splash-progress';
  el.appendChild(progress);

  document.body.appendChild(el);

  var sceneIdx = 0;
  var timer;

  function afficherScene(idx){
    sceneEls.forEach(function(s, i){ s.classList.toggle('active', i === idx); });
    pointEls.forEach(function(p, i){ p.classList.toggle('active', i === idx); });
    pointsWrap.classList.add('show');
    if(idx === scenes.length - 1){
      btnCommencer.classList.add('show');
      btnPasser.style.display = 'none';
    }
  }

  function avancer(){
    if(sceneIdx < scenes.length){
      afficherScene(sceneIdx);
      sceneIdx++;
      if(sceneIdx < scenes.length){
        timer = setTimeout(avancer, DUREE);
      }
    }
  }

  function fermer(){
    clearTimeout(timer);
    el.classList.add('fade-out');
    setTimeout(function(){ el.remove(); }, 500);
  }

  // Barre progression
  var dureeTotal = scenes.length * DUREE;
  progress.style.transition = 'width ' + dureeTotal + 'ms linear';
  setTimeout(function(){ progress.style.width = '100%'; }, 50);

  avancer();

  // Auto-fermeture
  setTimeout(function(){
    if(document.getElementById('praxis-splash')) fermer();
  }, dureeTotal + 2000);
}

// ── INIT ─────────────────────────────────────────────────
function init(){
  var cle = 'veto_splash_' + window.location.pathname;
  if(sessionStorage.getItem(cle)) return;
  sessionStorage.setItem(cle, '1');

  var moduleKey = detecterModule();
  if(!moduleKey) return;

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ lancerSplash(moduleKey); });
  } else {
    lancerSplash(moduleKey);
  }
}

init();

})();
