/* Local course fixture. No network, tracking, model calls, authentication or payments. */
(function () {
  'use strict';
  const REQUIRED = ['merk','doelgroep','doel','kanaal','actie','goedkeurder'];
  const QUESTIONS = {merk:'Voor welk merk is de campagne?',doelgroep:'Voor wie maken we de campagne?',doel:'Wat moet de campagne bereiken?',kanaal:'Welk kanaal en formaat gebruiken we?',actie:'Welke actie moet de kijker nemen?',goedkeurder:'Wie keurt het werk goed?'};
  const clean = value => String(value ?? '').trim().slice(0, 2000);
  function checkBrief(input = {}) {
    const fields = Object.fromEntries(REQUIRED.map(k => [k,clean(input[k])]));
    const missing = REQUIRED.filter(k => !fields[k]);
    return {status:missing.length?'ONVOLLEDIG':'COMPLEET',velden:fields,ontbreekt:missing,vragen:missing.map(k=>QUESTIONS[k]),label:'Lokale regelcontrole; geen AI- of betaalde SaaS-verbinding'};
  }
  function ingestEvent(records, event, paused=false) {
    if(paused) return {status:'GESTOPT',records:records.slice()};
    if(!event || !clean(event.event_id)) return {status:'ONGELDIG',reden:'event_id ontbreekt',records:records.slice()};
    if(records.some(r=>r.event_id===clean(event.event_id))) return {status:'BESTAAND',records:records.slice()};
    const record={event_id:clean(event.event_id),bedrijf:clean(event.bedrijf),vraag:clean(event.vraag),eigenaar:clean(event.eigenaar)||'intake',status:clean(event.bedrijf)&&clean(event.vraag)?'nieuw':'aanvullen'};
    return {status:'TOEGEVOEGD',records:records.concat(record)};
  }
  function answerSupport(question, kb) {
    const q=clean(question).toLocaleLowerCase('nl');
    if(!q || /medic|gezond|zwanger|ziekt|refund|terugbetal|order.*wijzig|ignore|negeer|instruct|wachtwoord|token|system|systeem/.test(q)) return {status:'ESCALEREN',antwoord:'Een medewerker moet deze vraag beoordelen.',bron:null};
    const found=kb.find(k=>k.queries.some(term=>q===term.toLocaleLowerCase('nl')));
    return found?{status:'CONCEPT',antwoord:found.antwoord,bron:found.id}:{status:'ESCALEREN',antwoord:'Geen goedgekeurd antwoord gevonden. Stuur de vraag naar een medewerker.',bron:null};
  }
  function qualifyLead(lead) {
    if(lead.afgemeld) return 'UITSLUITEN';
    if(lead.historie!=='gecontroleerd') return 'HANDMATIG_CONTROLEREN';
    return lead.passend && lead.bron ? 'GESCHIKT' : 'UITSLUITEN';
  }
  function calculate(p) {
    const names=['prijs','uren','uurtarief','tools'];
    if(names.some(k=>p[k]===undefined || p[k]===null || String(p[k]).trim()==='' || !Number.isFinite(Number(p[k])) || Number(p[k])<0)) throw Error('Gebruik niet-negatieve bedragen en uren.');
    const omzet=Number(p.prijs),kosten=Number(p.uren)*Number(p.uurtarief)+Number(p.tools);
    return {omzet,kosten,bijdrage:omzet-kosten,periode:p.periode||'eenmalig',label:'Oefenberekening vóór overige kosten en belasting; geen winstbelofte'};
  }
  const api={checkBrief,ingestEvent,answerSupport,qualifyLead,calculate};
  if(typeof module!=='undefined') module.exports=api;
  if(typeof window==='undefined') return;
  window.DemoStudio=api;
  const $=id=>document.getElementById(id), DATA=window.COURSE_FIXTURES;
  const show=(id,obj)=>{$(id).textContent=typeof obj==='string'?obj:JSON.stringify(obj,null,2);};
  const key='187n-course-v8-demo';
  let state={intake:null,records:[],paused:false};
  try { const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&Array.isArray(saved.records)&&saved.records.every(r=>typeof r.event_id==='string'))state={...state,...saved}; } catch{show('storage-status','Opslag niet beschikbaar; de demo werkt alleen in dit tabblad.');}
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));show('storage-status','Oefendata opgeslagen in deze browser. Geen accountisolatie.');}catch{show('storage-status','Opslag geblokkeerd; exporteer je resultaat vóór sluiten.');}};
  const download=(name,obj)=>{const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function crmRender(){show('crm-output',state.records);$('pause').textContent=state.paused?'Hervat invoer':'Stop invoer';}
  $('brief-form').addEventListener('submit',e=>{e.preventDefault();show('brief-output',checkBrief(Object.fromEntries(new FormData(e.target))));});
  $('brief-example').onclick=()=>{Object.entries(DATA.briefings[0]).forEach(([k,v])=>{const f=$('brief-form').elements.namedItem(k);if(f)f.value=v;});};
  $('brief-empty').onclick=()=>{$('brief-form').reset();show('brief-output',checkBrief({}));};
  $('brief-export').onclick=()=>download('briefing-check.json',checkBrief(Object.fromEntries(new FormData($('brief-form')))));
  $('intake-form').addEventListener('submit',e=>{e.preventDefault();const x=Object.fromEntries(new FormData(e.target));state.intake={bedrijf:clean(x.bedrijf),vraag:clean(x.vraag),status:'Briefing ontvangen'};save();show('intake-output',state.intake);});
  if(state.intake)show('intake-output',state.intake);
  $('crm-normal').onclick=()=>{const r=ingestEvent(state.records,DATA.events[0],state.paused);state.records=r.records;show('crm-status',r.status);save();crmRender();};
  $('crm-missing').onclick=()=>{const r=ingestEvent(state.records,DATA.events[1],state.paused);state.records=r.records;show('crm-status',r.status);save();crmRender();};
  $('crm-status-form').addEventListener('submit',e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));const found=state.records.find(r=>r.event_id===clean(f.event_id));if(found){found.status=f.status;save();crmRender();show('crm-status','Status bijgewerkt.');}else show('crm-status','Geen record met dit event_id.');});
  $('pause').onclick=()=>{state.paused=!state.paused;save();crmRender();};
  $('support-form').addEventListener('submit',e=>{e.preventDefault();show('support-output',answerSupport($('question').value,DATA.kennisbank));});
  $('support-tests').onclick=()=>show('support-output',DATA.testvragen.map(t=>({...t,werkelijk:answerSupport(t.vraag,DATA.kennisbank)})));
  $('export').onclick=()=>download('studio-oefendata.json',state);
  $('reset').onclick=()=>{if(!confirm('Alleen de lokale cursus-oefendata wissen?'))return;state={intake:null,records:[],paused:false};save();show('intake-output','Nog geen intake.');crmRender();};
  $('import').addEventListener('change',async e=>{try{const f=e.target.files[0];if(!f)return;if(f.size>100000)throw Error('Maximaal 100 KB.');const s=JSON.parse(await f.text());if(!Array.isArray(s.records)||s.records.length>100)throw Error('Ongeldig exportbestand.');let records=[];for(const r of s.records){const v=ingestEvent(records,r);if(v.status!=='TOEGEVOEGD')throw Error('Ongeldige of dubbele event-ID.');records=v.records;const savedStatus=clean(r.status);if(['nieuw','aanvullen','in behandeling','afgerond'].includes(savedStatus))records[records.length-1].status=savedStatus;}
    state={records,paused:Boolean(s.paused),intake:s.intake?{bedrijf:clean(s.intake.bedrijf),vraag:clean(s.intake.vraag),status:'Briefing ontvangen'}:null};save();crmRender();show('intake-output',state.intake||'Nog geen intake.');show('storage-status','Oefenexport hersteld; controleer de records.');}catch(err){show('storage-status',err.message);}e.target.value='';});
  $('cost-form').addEventListener('submit',e=>{e.preventDefault();try{show('cost-output',calculate(Object.fromEntries(new FormData(e.target))));}catch(err){show('cost-output',err.message);}});
  crmRender();
})();
