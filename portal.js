(()=>{
  'use strict';
  const config=window.STUDENT_CONFIG;
  const dictionary={
    pt:{navJourney:'A minha jornada',navMethod:'O método',heroEyebrow:'O TEU ESPAÇO DE APRENDIZAGEM',heroTitle1:'A tua voz.',heroTitle2:'O teu ritmo.',heroBody:'Não precisas de falar perfeitamente para começares. Cada conversa é mais um passo para te expressares com confiança.',heroButton:'Ver a minha jornada',heroTag:'Feito à tua medida',heroSub:'A tua evolução merece ser vista.',overviewKicker:'VISÃO GERAL',overviewTitle:'Um mês de evolução.',overviewNote:'O teu percurso, sempre à vista.',monthlyPlan:'PLANO MENSAL',progressCaption:'do percurso concluído',activities:'atividades concluídas',weeks:'semanas',weeksDesc:'Uma etapa de cada vez',liveSessions:'conversas ao vivo',liveDesc:'30 minutos por sessão',selfStudy:'práticas individuais',selfDesc:'Ouvir, compreender, crescer',journeyKicker:'O TEU PERCURSO',journeyTitle:'Pequenos passos.<br/>Grandes mudanças.',done:'Concluída',available:'Disponível',locked:'Bloqueada',unlockMessage:'Cada nova atividade fica disponível quando terminares a anterior e a tua professora a desbloquear.',methodKicker:'A NOSSA FORMA DE APRENDER',methodTitle:'Menos medo.<br/><em>Mais voz.</em>',methodIntro:'Não é sobre memorizar regras sem fim. É sobre usar o inglês para contar histórias, partilhar ideias e viver novas experiências.',method1Title:'Conversa real',method1Desc:'Duas sessões individuais por semana, com espaço para errar e voltar a tentar.',method2Title:'Escuta activa',method2Desc:'Uma actividade semanal de escuta e compreensão, feita ao teu ritmo.',method3Title:'Progresso visível',method3Desc:'As sessões concluídas e a próxima etapa ficam sempre claras nesta página.',footerLine:'A tua voz tem lugar no mundo.',week:'SEMANA',weekSub:'Duas conversas + um exercício de escuta',session:'SESSÃO',live:'Conversa ao vivo',podcast:'Escuta individual',nextLesson:'Próxima etapa',privateTopic:'O tema será revelado quando esta sessão ficar disponível.',goal:'O OBJECTIVO',words:'PALAVRAS PARA USAR',phrases:'EXPRESSÕES ÚTEIS',discuss:'VAMOS CONVERSAR SOBRE',podcastLabel:'O TEU PODCAST DA SEMANA',podcastInstructions:'Ouve com atenção e prepara-te para partilhar o que compreendeste na próxima conversa.',listen:'Ouvir o podcast',lessonOpen:'A TUA ETAPA ACTUAL',finishedLabel:'ETAPA CONCLUÍDA',noUrl:'O link estará disponível em breve.',sessionDuration:'30 MIN · INDIVIDUAL',selfDuration:'EXERCÍCIO AUTÓNOMO',weekDone:'Concluídas',weekReady:'Disponível agora',weekLocked:'Em breve',openTitle:'Aberto para ti',percent:'progresso',finishedAll:'Todas as atividades foram concluídas. Parabéns!'},
    en:{navJourney:'My journey',navMethod:'Our method',heroEyebrow:'YOUR PERSONAL LEARNING SPACE',heroTitle1:'Your voice.',heroTitle2:'Your pace.',heroBody:'You don’t have to speak perfectly to begin. Every conversation is another step towards expressing yourself with confidence.',heroButton:'Explore my journey',heroTag:'Made just for you',heroSub:'Your progress deserves to be seen.',overviewKicker:'OVERVIEW',overviewTitle:'One month of growth.',overviewNote:'Your journey, always in sight.',monthlyPlan:'MONTHLY PLAN',progressCaption:'of your journey completed',activities:'activities completed',weeks:'weeks',weeksDesc:'One step at a time',liveSessions:'live conversations',liveDesc:'30 minutes per session',selfStudy:'independent practices',selfDesc:'Listen, understand, grow',journeyKicker:'YOUR JOURNEY',journeyTitle:'Small steps.<br/>Big changes.',done:'Completed',available:'Available',locked:'Locked',unlockMessage:'Your next activity becomes available when you finish the previous one and your teacher unlocks it.',methodKicker:'HOW WE LEARN',methodTitle:'Less fear.<br/><em>More voice.</em>',methodIntro:'This isn’t about memorising endless rules. It’s about using English to tell stories, share ideas and explore new experiences.',method1Title:'Real conversations',method1Desc:'Two individual sessions every week, with room to make mistakes and try again.',method2Title:'Active listening',method2Desc:'One weekly listening and comprehension activity, at your own pace.',method3Title:'Visible progress',method3Desc:'Your completed sessions and next step are always clear on this page.',footerLine:'Your voice belongs in the world.',week:'WEEK',weekSub:'Two conversations + one listening exercise',session:'SESSION',live:'Live conversation',podcast:'Independent listening',nextLesson:'Next step',privateTopic:'The topic will be revealed when this session becomes available.',goal:'THE GOAL',words:'WORDS TO USE',phrases:'USEFUL PHRASES',discuss:'LET’S TALK ABOUT',podcastLabel:'YOUR PODCAST THIS WEEK',podcastInstructions:'Listen closely and get ready to share what you understood in your next conversation.',listen:'Listen to the podcast',lessonOpen:'YOUR CURRENT STEP',finishedLabel:'COMPLETED STEP',noUrl:'The link will be available soon.',sessionDuration:'30 MIN · ONE-TO-ONE',selfDuration:'INDEPENDENT EXERCISE',weekDone:'Completed',weekReady:'Available now',weekLocked:'Coming soon',openTitle:'Open for you',percent:'progress',finishedAll:'All activities are complete. Well done!'}
  };
  let lang='pt';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const validUrl=url=>{try{let p=new URL(url); return ['https:','http:'].includes(p.protocol)}catch{return false}};
  const contentReady=lesson=>{
    if(!lesson?.pt?.title||!lesson?.en?.title||!lesson?.pt?.goal||!lesson?.en?.goal)return false;
    if(lesson.type==='podcast')return !!lesson.podcast?.title&&validUrl(lesson.podcast.url);
    return true;
  };
  const requested=Math.min(13,Math.max(1,Number(config?.unlockedThrough)||1));
  let released=0;
  for(const lesson of config.lessons){if(lesson.number>requested || !contentReady(lesson))break; released=lesson.number;}
  if(requested===13 && released===12)released=13;
  // Each new release means the previous activity was completed.
  const completed=Math.min(12,Math.max(0,released-1));
  function paragraphOrRows(array,cls){return (Array.isArray(array)?array:[]).map(x=>`<li class="${cls}">${esc(x)}</li>`).join('')}
  function currentDetail(item,t,status){
    const d=item[lang]||item.pt;
    if(item.type==='podcast')return `<div class="lesson-details podcast-details"><div class="detail-head"><div class="detail-heading-icon">♫</div><div><span class="content-eyebrow">${t.podcastLabel}</span><h4>${esc(item.podcast.title)}</h4></div></div><p>${esc(d.goal)}</p><p class="detail-hint">${t.podcastInstructions}</p><a href="${esc(item.podcast.url)}" class="podcast-btn" target="_blank" rel="noopener noreferrer">${t.listen} <span aria-hidden="true">↗</span></a></div>`;
    const vocab=(d.vocabulary||[]).map(pair=>`<li><span>${esc(pair[0])}</span><small>${esc(pair[1])}</small></li>`).join('');
    return `<div class="lesson-details"><div class="lesson-goal"><span class="content-eyebrow">${t.goal}</span><p>${esc(d.goal)}</p></div><div class="lesson-columns"><div class="lesson-column"><div class="column-icon">✳</div><h4>${t.words}</h4><ul class="vocab-list">${vocab}</ul></div><div class="lesson-column"><div class="column-icon">↗</div><h4>${t.phrases}</h4><ul class="phrases-list">${paragraphOrRows(d.phrases,'phrase')}</ul></div></div><div class="question-box"><span class="content-eyebrow">${t.discuss}</span><ol>${paragraphOrRows(d.prompts,'prompt')}</ol></div></div>`;
  }
  function lessonCard(item,t){
    const number=item.number, isUnlocked=number<=released, done=number<=completed;
    const state=done?'done':isUnlocked?'current':'locked';
    const typeLabel=item.type==='podcast'?t.podcast:t.live;
    const label=done?t.finishedLabel:t.lessonOpen;
    const status=done?t.done:isUnlocked?t.available:t.locked;
    const icon=item.type==='podcast'?'♫':'✳';
    const heading=isUnlocked?esc((item[lang]||item.pt).title):t.nextLesson;
    const sub=isUnlocked?esc((item[lang]||item.pt).subtitle||''):t.privateTopic;
    return `<article class="lesson-card ${state} ${item.type==='podcast'?'listen-card':''}" ${isUnlocked?`id="lesson-${number}"`:''}>
      <div class="lesson-head"><div class="number-block"><span>${String(number).padStart(2,'0')}</span></div><div class="lesson-headcopy"><span class="lesson-kind">${icon} &nbsp; ${typeLabel} <span class="kind-separator">/</span> ${item.type==='podcast'?t.selfDuration:t.sessionDuration}</span><h3>${heading}</h3><p>${sub}</p></div><span class="lesson-state ${state}">${state==='locked'?'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>':state==='done'?'✓':'✦'} <span>${status}</span></span></div>
      ${isUnlocked?currentDetail(item,t,state):''}
    </article>`;
  }
  function render(){
    const t=dictionary[lang];document.documentElement.lang=lang;document.title=lang==='pt'?'English Confidence — O teu espaço':'English Confidence — Your Space';
    document.querySelectorAll('[data-i18n]').forEach(el=>{const value=t[el.dataset.i18n];if(value!==undefined){if(['journeyTitle','methodTitle'].includes(el.dataset.i18n))el.innerHTML=value;else el.textContent=value;}});
    document.getElementById('lang-pt').classList.toggle('active',lang==='pt');
    document.getElementById('lang-en').classList.toggle('active',lang==='en');
    document.getElementById('lang-pt').setAttribute('aria-pressed',String(lang==='pt'));
    document.getElementById('lang-en').setAttribute('aria-pressed',String(lang==='en'));
    const percent=Math.round(completed/12*100);
    document.getElementById('progress-percent').innerHTML=`${percent}<span>%</span>`;
    document.getElementById('progress-count').textContent=`${completed} / 12`;
    document.getElementById('progress-fill').style.width=`${percent}%`;
    const weeks=[0,1,2,3].map(i=>{
      const items=config.lessons.slice(i*3,i*3+3);
      const d=items.filter(x=>x.number<=completed).length;
      const status=d===3?t.weekDone:items.some(x=>x.number<=released)?t.weekReady:t.weekLocked;
      return `<section class="week-block"><div class="week-header"><div class="week-left"><div class="week-counter">0${i+1}</div><div><span class="week-topline">${t.week} ${String(i+1).padStart(2,'0')} <span>—</span> ${String(i*3+1).padStart(2,'0')}–${String(i*3+3).padStart(2,'0')}</span><p>${t.weekSub}</p></div></div><div class="week-status">${status} <span aria-hidden="true">↗</span></div></div><div class="lesson-stack">${items.map(item=>lessonCard(item,t)).join('')}</div></section>`;
    });
    document.getElementById('weeks-container').innerHTML=weeks.join('');
  }
  document.getElementById('lang-pt').addEventListener('click',()=>{lang='pt';render()});
  document.getElementById('lang-en').addEventListener('click',()=>{lang='en';render()});
  render();
})();
