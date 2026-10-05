const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function demoMessage(message){
  const old = document.querySelector('.toast');
  if(old) old.remove();
  const t=document.createElement('div');
  t.className='toast';
  t.textContent=message;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2800);
}

document.addEventListener('DOMContentLoaded',()=>{
  const login=$('#loginForm');
  if(login){
    login.addEventListener('submit',e=>{
      e.preventDefault();
      if(!$('#email').value.includes('@') || !$('#password').value){
        demoMessage('Please enter a valid email and password.');
        return;
      }
      sessionStorage.setItem('bloodlinkLoggedIn','1');
      window.location.href='pages/dashboard.html';
    });
  }

  const page=document.body.dataset.page;
  if(page) setupPage(page);
});

function setupPage(page){
  $$('.nav a').forEach(a=>{
    if(a.dataset.page===page) a.classList.add('active');
  });

  const run=$('#runPrediction');
  if(run) run.addEventListener('click',runPrediction);

  const refresh=$('#refreshData');
  if(refresh) refresh.addEventListener('click',refreshData);

  $$('.coord').forEach(b=>b.addEventListener('click',()=>{
    demoMessage('Transfer coordination request created successfully.');
  }));

  const donor=$('#findDonors');
  if(donor) donor.addEventListener('click',findDonors);

  const exportBtn=$('#exportReport');
  if(exportBtn) exportBtn.addEventListener('click',exportReport);

  const predictForm=$('#predictForm');
  if(predictForm) predictForm.addEventListener('submit',e=>{
    e.preventDefault();
    calculatePrediction();
  });

  const inventoryForm=$('#inventoryForm');
  if(inventoryForm) inventoryForm.addEventListener('submit',e=>{
    e.preventDefault();
    const group=$('#invGroup').value;
    const units=Number($('#invUnits').value);
    if(!units || units<0) return demoMessage('Enter valid inventory units.');
    demoMessage(`${group} inventory updated to ${units} units.`);
    $('#inventoryForm').reset();
  });

  const donorForm=$('#donorForm');
  if(donorForm) donorForm.addEventListener('submit',e=>{
    e.preventDefault();
    const group=$('#donorGroup').value;
    const city=$('#donorCity').value;
    demoMessage(`Matching ${group} donors near ${city}... 126 eligible donors found.`);
  });

  const transferButtons=$$('.transfer');
  transferButtons.forEach(b=>b.addEventListener('click',()=>demoMessage('Hospital transfer request sent to network.')));
}

function runPrediction(){
  const el=$('#shortageWindow');
  if(el) el.textContent='68h';
  const score=$('#riskScore');
  if(score) score.textContent='94%';
  const msg=$('#predictionMsg');
  if(msg) msg.textContent='O− inventory is projected to cross the emergency threshold within 68 hours. Network coordination is recommended now.';
  demoMessage('AI prediction refreshed. New high-risk signal detected.');
}

function calculatePrediction(){
  const group=$('#pGroup').value;
  const demand=Number($('#pDemand').value)||100;
  const stock=Number($('#pStock').value)||50;
  const emergency=Number($('#pEmergency').value)||1;
  const donation=Number($('#pDonation').value)||20;
  const seasonal=Number($('#pSeasonal').value)||1;
  let risk=(demand*seasonal*emergency)/(stock+donation)*52;
  risk=Math.max(4,Math.min(99,Math.round(risk)));
  const hours=Math.max(12,Math.round(2200/(risk+1)));
  $('#predictionScore').textContent=risk+'%';
  $('#predictionHours').textContent=hours+'h';
  $('#predictionGroup').textContent=group;
  $('#predictionAdvice').textContent=risk>75?'Critical: initiate donor activation and inter-hospital transfer immediately.':risk>50?'Watch: increase donor outreach and prepare regional transfer.':'Stable: continue monitoring inventory and demand.';
  demoMessage('Prediction calculated using demo network factors.');
}

function refreshData(){
  const units=$('#networkUnits');
  if(units){
    const n=8426+Math.floor(Math.random()*160-80);
    units.textContent=n.toLocaleString();
  }
  demoMessage('Network inventory refreshed.');
}

function findDonors(){
  const count=Math.floor(100+Math.random()*80);
  demoMessage(`${count} eligible donors found within the selected radius.`);
}

function exportReport(){
  const report=`BLOODLINK AI — EMERGENCY BLOOD NETWORK REPORT
Generated: ${new Date().toLocaleString()}

NETWORK STATUS
Blood Units: 8,426
Hospitals Monitored: 24
High-Risk Blood Groups: 3
Predicted Shortage Window: 72 hours

RISK INDEX
O- : 92% CRITICAL
A- : 68% WATCH
B- : 54% WATCH
O+ : 31% STABLE

RECOMMENDED ACTIONS
1. Activate O- donor network.
2. Coordinate regional transfer to critical hospitals.
3. Monitor emergency demand spikes.
4. Review A- donation gap.

NOTE: This is a hackathon prototype using simulated data.
`;
  const blob=new Blob([report],{type:'text/plain'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='BloodLink-AI-Report.txt';
  a.click();
  URL.revokeObjectURL(a.href);
  demoMessage('Report exported.');
}
