import React,{useCallback,useEffect,useRef,useState} from 'react';
import {Animated,Platform,Pressable,ScrollView,StatusBar,StyleSheet,Text,View,useWindowDimensions} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import Svg,{Circle,Defs,Ellipse,LinearGradient,Path,Rect,Stop} from 'react-native-svg';
import {apply,initialState} from './src/calculator.cjs';
import type {CalculatorState} from './src/calculator';
const C={bg:'#05070D',neon:'#00D9FF',blue:'#007BFF',white:'#FFFFFF',panel:'#171D2B',muted:'#8895AD'};
const KEYS=[['AC','±','%','÷'],['7','8','9','×'],['4','5','6','−'],['1','2','3','+'],['⌫','0','.','=']];
function Astronaut(){
  return (
    <Svg width={105} height={112} viewBox="0 0 120 130" accessible accessibilityLabel="Astronauta futurista com reflexos iridescentes em cores de arco-íris">
      <Defs>
        <LinearGradient id="orbitRainbow" x1="0%" y1="0%" x2="100%" y2="70%">
          <Stop offset="0%" stopColor="#FF6D83" />
          <Stop offset="23%" stopColor="#FFCB74" />
          <Stop offset="44%" stopColor="#92EDAD" />
          <Stop offset="63%" stopColor="#00D9FF" />
          <Stop offset="82%" stopColor="#438AFF" />
          <Stop offset="100%" stopColor="#BC81F7" />
        </LinearGradient>
        <LinearGradient id="helmetMetal" x1="10%" y1="0%" x2="83%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="40%" stopColor="#D9E9FA" />
          <Stop offset="100%" stopColor="#7692AE" />
        </LinearGradient>
        <LinearGradient id="visorSpace" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#102E49" />
          <Stop offset="48%" stopColor="#102941" />
          <Stop offset="100%" stopColor="#311D53" />
        </LinearGradient>
        <LinearGradient id="visorIridescence" x1="0%" y1="0%" x2="100%" y2="12%">
          <Stop offset="0%" stopColor="#00D9FF" stopOpacity={0.7} />
          <Stop offset="30%" stopColor="#8AFAAF" stopOpacity={0.7} />
          <Stop offset="53%" stopColor="#FFCD7C" stopOpacity={0.55} />
          <Stop offset="76%" stopColor="#FF6FAE" stopOpacity={0.58} />
          <Stop offset="100%" stopColor="#8A80FF" stopOpacity={0.8} />
        </LinearGradient>
        <LinearGradient id="suitMetal" x1="5%" y1="0%" x2="95%" y2="100%">
          <Stop offset="0%" stopColor="#F4F9FF" />
          <Stop offset="47%" stopColor="#C5D8EB" />
          <Stop offset="100%" stopColor="#7A96B0" />
        </LinearGradient>
      </Defs>
      {/* Luz ambiente discreta: nada de imagens externas ou efeitos pesados. */}
      <Circle cx="60" cy="55" r="53" fill="#007BFF" opacity={0.065}/>
      <Circle cx="60" cy="55" r="40" fill="#A05DFF" opacity={0.055}/>
      <Ellipse cx="60" cy="65" rx="56" ry="37" rotation={-25} origin="60, 65" stroke="url(#orbitRainbow)" strokeWidth={1.25} strokeDasharray="5 7" fill="none" opacity={0.75}/>
      <Circle cx="13" cy="27" r="2.1" fill="#00D9FF"/>
      <Circle cx="104" cy="21" r="1.6" fill="#FFB5E1"/>
      <Circle cx="109" cy="89" r="1" fill="#FFD48D"/>
      {/* Módulos de propulsão, luvas e botas. */}
      <Rect x="28" y="77" width="16" height="27" rx="6" fill="#1C334E" stroke="#6085A6" strokeWidth={1.5}/>
      <Rect x="76" y="77" width="16" height="27" rx="6" fill="#1C334E" stroke="#6085A6" strokeWidth={1.5}/>
      <Path d="M43 83 L30 97 M77 83 L90 97 M48 107 L44 121 M72 107 L76 121" stroke="#7897B4" strokeWidth={13} strokeLinecap="round"/>
      <Path d="M43 82 L31 96 M77 82 L89 96 M48 108 L44 119 M72 108 L76 119" stroke="url(#suitMetal)" strokeWidth={9} strokeLinecap="round"/>
      <Path d="M39 103 L34 106 M81 103 L86 106" stroke="url(#orbitRainbow)" strokeWidth={3} strokeLinecap="round" opacity={0.9}/>
      <Path d="M37 122 L47 124 M73 124 L83 122" stroke="#436580" strokeWidth={5} strokeLinecap="round"/>
      {/* Traje metálico com iluminação iridescente controlada. */}
      <Path d="M42 76 Q60 68 78 76 L87 107 Q60 120 33 107 Z" fill="url(#suitMetal)" stroke="#738FAC" strokeWidth={1.7}/>
      <Path d="M40 78 Q60 73 80 78" stroke="url(#orbitRainbow)" strokeWidth={2.8} fill="none" opacity={0.8}/>
      <Path d="M40 102 Q60 111 80 102" stroke="#617D99" strokeWidth={1.2} fill="none" opacity={0.7}/>
      <Rect x="48.5" y="84" width="23" height="17.5" rx="4" fill="#101D31" stroke="#6989AB" strokeWidth={1.3}/>
      <Path d="M53 89 H67" stroke="url(#visorIridescence)" strokeWidth={2.5} strokeLinecap="round"/>
      <Circle cx="54" cy="96" r="1.5" fill="#00D9FF"/>
      <Circle cx="61" cy="96" r="1.5" fill="#FFB56B"/>
      <Circle cx="68" cy="96" r="1.5" fill="#C089FF"/>
      {/* Capacete, visor polarizado e reflexo de espectro. */}
      <Circle cx="60" cy="46" r="30" fill="url(#helmetMetal)" stroke="#7B9AB6" strokeWidth={1.6}/>
      <Path d="M35 40 Q33 19 54 16" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.7}/>
      <Rect x="36" y="31" width="48" height="34" rx="15" fill="#14243C" stroke="#7194B1" strokeWidth={2.5}/>
      <Rect x="39" y="34" width="42" height="28" rx="12" fill="url(#visorSpace)"/>
      <Path d="M44 43 Q61 35 76 45" fill="none" stroke="url(#visorIridescence)" strokeWidth={5} strokeLinecap="round" opacity={0.9}/>
      <Path d="M43 50 Q58 44 75 53" fill="none" stroke="url(#visorIridescence)" strokeWidth={2} strokeLinecap="round" opacity={0.42}/>
      <Path d="M45 39 Q49 36 56 36" stroke="#DEFFFF" strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.8}/>
      <Path d="M43 62 Q60 67 77 62" stroke="url(#orbitRainbow)" strokeWidth={1.8} fill="none" opacity={0.95}/>
      <Path d="M46 72 Q60 75 74 72" stroke="#C8D9EA" strokeWidth={1.8} fill="none"/>
    </Svg>
  );
}
function Key({value,onPress,size}:{value:string;onPress:(v:string)=>void;size:number}){const scale=useRef(new Animated.Value(1)).current;const accent=['+','−','×','÷','AC','±','%','⌫'].includes(value);return <Pressable accessibilityRole="button" accessibilityLabel={value} onPress={()=>onPress(value)} onPressIn={()=>Animated.spring(scale,{toValue:.92,useNativeDriver:true}).start()} onPressOut={()=>Animated.spring(scale,{toValue:1,useNativeDriver:true}).start()} style={{width:size,height:size}}><Animated.View style={[s.key,{transform:[{scale}],backgroundColor:value==='='?C.neon:accent?'#102639':C.panel,borderColor:value==='='?C.neon:accent?'#1D5879':'#2B3449'}]}><Text style={[s.keyText,{color:value==='='?C.bg:accent?C.neon:C.white,fontWeight:value==='='?'800':'500'}]}>{value}</Text></Animated.View></Pressable>}
function Calculator(){const {width,height}=useWindowDimensions();const [calc,setCalc]=useState<CalculatorState>(initialState);const [history,setHistory]=useState(false);const press=useCallback((v:string)=>setCalc(c=>apply(c,v)),[]);
useEffect(()=>{if(Platform.OS!=='web')return;const onKey=(e:KeyboardEvent)=>{const map:Record<string,string>={'*':'×','/':'÷','-':'−',Enter:'=',Backspace:'⌫',Escape:'AC',Delete:'AC',',':'.'};const k=map[e.key]||e.key;if(/^[0-9]$/.test(k)||['.','+','−','×','÷','%','=','⌫','AC'].includes(k)){e.preventDefault();press(k)}};window.addEventListener('keydown',onKey);return ()=>window.removeEventListener('keydown',onKey)},[press]);
const w=Math.min(width-32,390);const size=Math.max(46,Math.min(76,(w-30)/4,(height-395)/5));const display=calc.input.replace('.',',');
return <View style={s.root}><View style={{width:w}}><View style={s.header}><View><Text style={s.overline}>MISSION CONTROL • 01</Text><Text style={s.brand}>ASTRO <Text style={{color:C.neon}}>CALC</Text></Text><Text style={s.online}>●  SISTEMA ONLINE</Text></View><Astronaut/></View><View style={s.display}><View style={s.displayTop}><Text style={s.tag}>CÁLCULO ATUAL</Text><Pressable onPress={()=>setHistory(true)} accessibilityLabel="Abrir histórico"><Text style={s.online}>◷  HISTÓRICO</Text></Pressable></View><Text style={s.expression} numberOfLines={1}>{calc.expression||'PRONTO PARA CALCULAR'}</Text><Text style={[s.result,{fontSize:display.length>14?30:display.length>9?38:50}]} numberOfLines={1} adjustsFontSizeToFit>{display}</Text><Text style={[s.tag,{textAlign:'right',color:C.neon}]}>{calc.error||'◈ PRECISÃO ORBITAL'}</Text></View><View style={s.divider}/><View style={{alignSelf:'center',gap:10}}>{KEYS.map((row,i)=><View key={i} style={{flexDirection:'row',gap:10}}>{row.map(v=><Key key={v} value={v} onPress={press} size={size}/>)}</View>)}</View><Text style={s.footer}>✦  EXPLORE O INFINITO  ✦</Text></View>
{history&&<View style={s.overlay}><View style={[s.history,{width:w}]}><View style={s.displayTop}><Text style={s.historyTitle}>LOG DE MISSÃO</Text><Pressable onPress={()=>setHistory(false)} accessibilityLabel="Fechar histórico"><Text style={[s.historyTitle,{color:C.neon}]}>✕</Text></Pressable></View><Text style={s.online}>HISTÓRICO DE OPERAÇÕES</Text><ScrollView style={{flex:1,marginTop:18}}>{calc.history.length===0?<Text style={{color:C.muted,textAlign:'center',marginTop:30}}>Nenhuma operação nesta missão.</Text>:calc.history.map(item=><Pressable key={item.id} style={s.historyItem} onPress={()=>{setCalc(c=>({...c,input:item.result,operator:null,accumulator:null,expression:item.expression,done:true}));setHistory(false)}}><Text style={{color:C.muted}}>{item.expression}</Text><Text style={{color:C.white,fontSize:24,textAlign:'right'}}>{item.result}</Text></Pressable>)}</ScrollView><Pressable onPress={()=>press('HISTORY_CLEAR')} style={s.clear}><Text style={{color:C.neon,fontWeight:'700'}}>LIMPAR HISTÓRICO</Text></Pressable></View></View>}</View>}
export default function App(){return <SafeAreaProvider><SafeAreaView style={{flex:1,backgroundColor:C.bg}} edges={['top','bottom']}><StatusBar barStyle="light-content"/><Calculator/></SafeAreaView></SafeAreaProvider>}
const s=StyleSheet.create({root:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:C.bg},header:{height:135,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},overline:{color:C.muted,fontSize:9,letterSpacing:2.2},brand:{color:C.white,fontSize:27,fontWeight:'900',letterSpacing:1.1,marginTop:9},online:{color:C.neon,fontSize:9,letterSpacing:1.3,marginTop:11,fontWeight:'700'},display:{height:177,backgroundColor:'#101725',borderColor:'#23425D',borderWidth:1,borderRadius:22,padding:19,justifyContent:'space-between',shadowColor:C.blue,shadowOpacity:.22,shadowRadius:20},displayTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},tag:{color:C.muted,fontSize:9,letterSpacing:1.2},expression:{color:'#9BA8B9',fontSize:15,textAlign:'right',marginTop:6},result:{color:C.white,fontWeight:'300',textAlign:'right'},divider:{height:1,backgroundColor:'#2A516B',marginVertical:20},key:{flex:1,alignItems:'center',justifyContent:'center',borderRadius:18,borderWidth:1},keyText:{fontSize:25},footer:{textAlign:'center',fontSize:9,color:'#728399',letterSpacing:2.2,marginTop:20},overlay:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(0,0,0,.9)',alignItems:'center',justifyContent:'center'},history:{height:'72%',maxHeight:550,backgroundColor:'#101725',borderRadius:24,borderColor:'#236284',borderWidth:1,padding:20},historyTitle:{color:C.white,fontSize:19,fontWeight:'800'},historyItem:{paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#243449'},clear:{borderColor:'#236284',borderWidth:1,alignItems:'center',padding:14,borderRadius:12}});
