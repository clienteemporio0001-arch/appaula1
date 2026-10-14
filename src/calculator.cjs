const initialState=()=>({input:'0',accumulator:null,operator:null,waiting:false,expression:'',history:[],error:null,done:false});
const formatNumber=n=>!Number.isFinite(n)?'Erro':String(Number((Object.is(n,-0)?0:n).toPrecision(12)));
function compute(a,b,op){return op==='+'?a+b:op==='−'?a-b:op==='×'?a*b:op==='÷'?(b===0?NaN:a/b):b;}
function apply(state,key){
if(key==='AC')return initialState();
if(key==='HISTORY_CLEAR')return {...state,history:[]};
let s={...state,error:null};if(state.error)s={...initialState(),history:state.history};
if(key==='⌫'){if(s.waiting||s.done)return {...s,input:'0',waiting:false,done:false};return {...s,input:s.input.length<=1||(s.input.length===2&&s.input.startsWith('-'))?'0':s.input.slice(0,-1)};}
if(key==='±')return {...s,input:s.input==='0'?'0':s.input.startsWith('-')?s.input.slice(1):'-'+s.input};
if(key==='%')return {...s,input:formatNumber(Number(s.input)/100),waiting:false,done:false};
if(/^[0-9]$/.test(key)||key==='.'){
if(s.done)s={...s,accumulator:null,operator:null,expression:'',waiting:true,done:false};
if(s.waiting)return {...s,input:key==='.'?'0.':key,waiting:false};
if(key==='.')return s.input.includes('.')?s:{...s,input:s.input+'.'};
if(s.input.replace(/[^0-9]/g,'').length>=15)return s;
return {...s,input:s.input==='0'?key:s.input==='-0'?'-'+key:s.input+key};}
if(['+','−','×','÷'].includes(key)){
let a=s.accumulator;
if(s.operator&&!s.waiting&&a!==null){const r=compute(a,Number(s.input),s.operator);if(!Number.isFinite(r))return {...s,error:'Não é possível dividir por zero',input:'Erro'};a=r;}
else if(a===null||s.done)a=Number(s.input);
return {...s,accumulator:a,input:formatNumber(a),operator:key,waiting:true,done:false,expression:formatNumber(a)+' '+key};}
if(key==='='){
if(!s.operator||s.accumulator===null||s.waiting)return s;
const r=compute(s.accumulator,Number(s.input),s.operator);if(!Number.isFinite(r))return {...s,error:'Não é possível dividir por zero',input:'Erro'};
const expression=formatNumber(s.accumulator)+' '+s.operator+' '+formatNumber(Number(s.input))+' =',result=formatNumber(r);
return {...s,input:result,expression,accumulator:null,operator:null,waiting:false,done:true,history:[{id:String(Date.now())+String(Math.random()),expression,result},...s.history].slice(0,30)};}
return s;}
module.exports={initialState,formatNumber,compute,apply};