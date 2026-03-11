import { useState } from "react";

/* ═══ SHARED UI ═══ */
const tabs = ["Overview","Five Levels","SPARK & Position","Industry","Meso/Cluster","Macro & Meta","Q2: VRIO/ARK","Q3: ETA/Swatch","Cram Sheet"];

const SectionTitle = ({ children, pt }) => (<div className="mb-4"><h2 className="text-xl font-bold text-slate-800 border-b-2 border-blue-600 pb-2">{children}</h2>{pt && <p className="text-sm text-slate-500 mt-1">{pt}</p>}</div>);

const Card = ({ title, pt, children, color = "blue" }) => {
  const colors = { blue:"border-blue-500 bg-blue-50", green:"border-green-500 bg-green-50", amber:"border-amber-500 bg-amber-50", red:"border-red-500 bg-red-50", purple:"border-purple-500 bg-purple-50", slate:"border-slate-400 bg-slate-50", rose:"border-rose-500 bg-rose-50", cyan:"border-cyan-500 bg-cyan-50" };
  return (<div className={`border-l-4 ${colors[color]} p-4 rounded-r-lg mb-4`}>{title && <div className="font-bold text-slate-800 mb-1">{title}</div>}{pt && <div className="text-xs text-slate-500 mb-2">{pt}</div>}<div className="text-sm text-slate-700">{children}</div></div>);
};

const Tag = ({ children, color = "blue" }) => {
  const c = { blue:"bg-blue-100 text-blue-800", green:"bg-green-100 text-green-800", amber:"bg-amber-100 text-amber-800", red:"bg-red-100 text-red-800", purple:"bg-purple-100 text-purple-800", slate:"bg-slate-200 text-slate-700", rose:"bg-rose-100 text-rose-800", cyan:"bg-cyan-100 text-cyan-800" };
  return <span className={`${c[color]} text-xs font-semibold px-2 py-0.5 rounded-full`}>{children}</span>;
};

const Arrow = () => <span className="text-slate-400 text-lg mx-1">→</span>;

/* ═══ INTERACTIVE FRAMEWORK COMPONENTS ═══ */
const PC = { macro:{main:"#2563eb",light:"#eff6ff",dark:"#1d4ed8"}, supra:{main:"#7c3aed",light:"#f5f3ff",dark:"#6d28d9"}, meso:{main:"#059669",light:"#ecfdf5",dark:"#047857"}, industry:{main:"#d97706",light:"#fffbeb",dark:"#b45309"}, firm:{main:"#dc2626",light:"#fef2f2",mid:"#fecaca",dark:"#b91c1c"} };

function Num({ n, color }) {
  return <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:"50%",fontSize:11,fontWeight:700,background:color,color:"#fff",marginRight:8,flexShrink:0 }}>{n}</span>;
}

function Expandable({ items, color, border }) {
  return (<div style={{ marginTop:8 }}>{items.map((it,j) => (<div key={j} style={{ display:"flex",alignItems:"flex-start",gap:6,padding:"5px 10px",marginBottom:j<items.length-1?3:0,background:"#fff",borderRadius:6,border:`1px solid ${border||color+"22"}`,fontSize:13,color:"#4b5563",lineHeight:1.55 }}><span style={{color,fontWeight:700,flexShrink:0}}>›</span><span>{it}</span></div>))}</div>);
}

const IH = ({ children }) => <div style={{fontSize:18,fontWeight:800,textAlign:"center",color:"#0f172a",marginBottom:2}}>{children}</div>;
const ISub = ({ children }) => <p style={{fontSize:12,color:"#94a3b8",margin:"0 0 14px",textAlign:"center",fontStyle:"italic"}}>{children}</p>;

/* ─── INTERACTIVE PENTAGON ─── */
function InteractivePentagon() {
  const [hover, setHover] = useState(null);
  const levels = [
    { key:"industry",n:4,pentIdx:2,title:"① Micro Indústria",sub:"Competitive landscape — START HERE Comece aqui",items:["Industry Characteristics","Competition","Cooperation","Strategic Groups","Lead Firms","Micro Policies","Micro Institutions"],col:PC.industry },
    { key:"meso",n:3,pentIdx:1,title:"② Meso Cluster",sub:"Cluster & value chain ecosystem",items:["Inputs & Suppliers","Demand & Customers","Shared Resources","Shared Activities","Complementarities","Substitutes","Meso Policies","Meso Institutions"],col:PC.meso },
    { key:"macro",n:1,pentIdx:0,title:"③ Macro Nacional",sub:"National environment",items:["Macroeconomics","National Resources & Capabilities","Gov't Policies","Institutions","Civil Society"],col:PC.macro },
    { key:"supra",n:2,pentIdx:4,title:"④ Meta Supranacional",sub:"Global & international forces",items:["Geopolitics","Global Tech","Global Economics","Social/Env Issues","Multilateral Orgs","Trade Blocs","Foreign Gov'ts","Int'l Financial Flows","Foreign MNCs","Other Groups"],col:PC.supra },
    { key:"firm",n:5,pentIdx:3,title:"⑤ Firm Empresa",sub:"Internal strategy & execution — END HERE Por último",col:PC.firm,dual:{left:{heading:"Strategy (SPARK+L)",items:["Scope","Positioning","Activities","Resources","Knowledge","Leadership"]},right:{heading:"Execution",items:["Org & Mgmt","Governance","Firm Policies","Firm Institutions"]}}},
  ];

  const cx=150,cy=148,r=115;
  const pentLabels=["Macro\nNacional","Meso\nCluster","Industry\nIndústria","Firm\nEmpresa","Meta\nSupra"];
  const pentCols=[PC.macro.main,PC.meso.main,PC.industry.main,PC.firm.main,PC.supra.main];
  const pentPts=[];
  for(let i=0;i<5;i++){const a=(Math.PI*2*i)/5-Math.PI/2;pentPts.push({x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)});}
  const pentKeyMap={};levels.forEach(l=>{pentKeyMap[l.pentIdx]=l.key;});

  return (<div>
    <IH>Drivers of Firm Performance</IH>
    <ISub>Ordem de análise: Industry → Meso → Macro → Meta → Firm (sequência do professor)</ISub>
    <div style={{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 4px 20px rgba(0,0,0,0.06)",marginBottom:14,display:"flex",justifyContent:"center"}}>
      <svg viewBox="0 0 300 296" style={{width:"100%",maxWidth:300,height:"auto"}}>
        <defs><radialGradient id="fpg" cx="50%" cy="48%" r="55%"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#f1f5f9"/></radialGradient><filter id="fpds"><feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.1"/></filter></defs>
        <polygon points={pentPts.map(p=>`${p.x},${p.y}`).join(" ")} fill="url(#fpg)" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#fpds)"/>
        {pentPts.map((p,i)=>{const next=pentPts[(i+1)%5];const key=pentKeyMap[i];const isH=hover===key;return <polygon key={i} points={`${cx},${cy} ${p.x},${p.y} ${next.x},${next.y}`} fill={isH?pentCols[i]:"transparent"} opacity={isH?0.12:0} style={{transition:"opacity 0.3s"}}/>;
        })}
        {pentPts.map((_,i)=>{const f=0.58;const a=(Math.PI*2*i)/5-Math.PI/2;const mx=cx+r*f*Math.cos(a);const my=cy+r*f*Math.sin(a);const key=pentKeyMap[i];const isH=hover===key;return <text key={i} x={mx} y={my} textAnchor="middle" fontSize={isH?"11":"10"} fill={pentCols[i]} fontWeight="700" opacity={isH?1:0.7} style={{transition:"all 0.3s"}}>{pentLabels[i].split("\n").map((l,li)=><tspan key={li} x={mx} dy={li===0?0:12}>{l}</tspan>)}</text>;})}
        <circle cx={cx} cy={cy} r="28" fill="#fff" stroke="#94a3b8" strokeWidth="1"/>
        <text x={cx} y={cy-3} textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">Firm</text>
        <text x={cx} y={cy+10} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">Performance</text>
      </svg>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {levels.map(lv=>{const isH=hover===lv.key;return(
        <div key={lv.key} onMouseEnter={()=>setHover(lv.key)} onMouseLeave={()=>setHover(null)} onTouchStart={()=>setHover(lv.key)} onTouchEnd={()=>setHover(null)} style={{background:isH?lv.col.light:"#fff",border:`1.5px solid ${isH?lv.col.main+"55":"#e5e7eb"}`,borderRadius:14,padding:"12px 14px",boxShadow:isH?`0 4px 16px ${lv.col.main}15`:"0 1px 4px rgba(0,0,0,0.03)",transition:"all 0.3s ease"}}>
          <div style={{display:"flex",alignItems:"center",marginBottom:5}}>
            <Num n={lv.n} color={lv.col.main}/>
            <div><div style={{color:lv.col.main,fontWeight:700,fontSize:14,lineHeight:1.2}}>{lv.title}</div><div style={{color:"#94a3b8",fontSize:11}}>{lv.sub}</div></div>
          </div>
          {lv.items ? <div style={{color:"#4b5563",fontSize:13,lineHeight:1.7,paddingLeft:30}}>{lv.items.join("  ·  ")}</div> : (
            <div style={{display:"flex",gap:20,flexWrap:"wrap",paddingLeft:30}}>
              {[lv.dual.left,lv.dual.right].map((col,ci)=><div key={ci}><div style={{fontWeight:600,fontSize:11,color:lv.col.dark,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.5px"}}>{col.heading}</div><div style={{fontSize:13,color:"#4b5563",lineHeight:1.7}}>{col.items.join("  ·  ")}</div></div>)}
            </div>
          )}
        </div>
      );})}
    </div>
  </div>);
}

/* ─── INTERACTIVE FIRM LEVEL ─── */
function InteractiveFirmLevel() {
  const [active, setActive] = useState(null);
  const strat=[{k:"Scope Escopo",d:"Which markets, segments, geographies to compete in Em quais mercados, segmentos e geografias competir"},{k:"Positioning Posicionamento",d:"Where to position: price, performance, cost Onde posicionar: preço, desempenho, custo"},{k:"Activities Atividades",d:"What activities to perform and how to configure them Quais atividades realizar e como configurá-las"},{k:"Resources Recursos",d:"What tangible/intangible assets to develop and deploy Quais ativos tangíveis/intangíveis desenvolver e implantar"},{k:"Knowledge Conhecimento",d:"What knowledge to create, acquire, and leverage Qual conhecimento criar, adquirir e alavancar"},{k:"Leadership Liderança",d:"Who leads and how they set direction Quem lidera e como define a direção"}];
  const exec=[{k:"Organization & Management Organização e Gestão",d:"Structure, processes, people, culture Estrutura, processos, pessoas, cultura"},{k:"Governance Governança",d:"Oversight, incentives, accountability Supervisão, incentivos, responsabilização"},{k:"Firm Policies Políticas da Empresa",d:"Internal rules and guidelines Regras e diretrizes internas"},{k:"Firm Institutions Instituições da Empresa",d:"Norms, routines, embedded practices Normas, rotinas, práticas incorporadas"}];
  const ItemCard=({item})=>{const on=active===item.k;return(<div onClick={()=>setActive(on?null:item.k)} style={{background:on?PC.firm.light:"#fff",border:`1px solid ${on?PC.firm.mid:"#e5e7eb"}`,borderRadius:10,padding:"10px 12px",marginBottom:6,cursor:"pointer",transition:"all 0.2s"}}><div style={{fontSize:13,fontWeight:600,color:on?PC.firm.dark:"#1f2937"}}>{item.k}</div>{on&&<div style={{fontSize:12,color:"#6b7280",marginTop:4,lineHeight:1.5}}>{item.d}</div>}</div>);};

  return (<div>
    <IH>Firm Level Drivers</IH>
    <ISub>Toque em qualquer item para ver a descrição · Tap any item for description</ISub>
    <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
      <div style={{flex:"1 1 200px",minWidth:0}}>
        <div style={{fontSize:11,fontWeight:700,color:PC.firm.dark,textTransform:"uppercase",letterSpacing:1,marginBottom:8,paddingLeft:4}}>Strategy (SPARK+L)</div>
        {strat.map(i=><ItemCard key={i.k} item={i}/>)}
      </div>
      <div style={{flex:"1 1 200px",minWidth:0}}>
        <div style={{fontSize:11,fontWeight:700,color:PC.firm.dark,textTransform:"uppercase",letterSpacing:1,marginBottom:8,paddingLeft:4}}>Execution Execução</div>
        {exec.map(i=><ItemCard key={i.k} item={i}/>)}
      </div>
    </div>
  </div>);
}

/* ─── INTERACTIVE WHAT IS INDUSTRY ─── */
function InteractiveWhatIsIndustry() {
  return (<div style={{marginBottom:16}}>
    <IH>What Constitutes an Industry? O que é uma Indústria?</IH>
    <ISub>Definindo os limites da competição Defining the boundaries of competition</ISub>
{/* ★ NEW: 3-step useful output methodology */}
    <div style={{background:"linear-gradient(135deg,#1e40af,#2563eb)",borderRadius:14,padding:"18px 16px",marginBottom:14,color:"#fff",boxShadow:"0 4px 20px rgba(37,99,235,0.2)"}}>
      <div style={{fontSize:15,fontWeight:800,textAlign:"center",marginBottom:12}}>O Método do "Output Útil" em 3 Passos The "Useful Output" Method</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {[
          {n:"1",title:"O que o cliente realmente recebe?",sub:"What useful output does the customer receive?",detail:"Não olhe a tecnologia — apenas a forma e função do produto/serviço que chega ao cliente.",ex:"Smartphone: comunicação móvel + apps + computação portátil"},
          {n:"2",title:"Quem compete diretamente por esse cliente?",sub:"Who competes directly for that customer?",detail:"Todas as empresas com o mesmo output útil estão na mesma indústria.",ex:"iOS e Android: engenharia diferente, mas mesmo output útil → mesma indústria"},
          {n:"3",title:"Trace o limite da indústria",sub:"Draw the industry boundary",detail:"Output diferente = indústria diferente. Mesmo que sejam 'tech'.",ex:"Amazon (logística), Microsoft (produtividade), Meta (mídia social) → 3 indústrias"},
        ].map(step=>(
          <div key={step.n} style={{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",borderLeft:"3px solid rgba(255,255,255,0.5)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{background:"#fff",color:"#1e40af",width:22,height:22,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{step.n}</span>
              <div><div style={{fontWeight:700,fontSize:14}}>{step.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>{step.sub}</div></div>
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.9)",lineHeight:1.6,paddingLeft:30,marginBottom:4}}>{step.detail}</div>
            <div style={{fontSize:11,color:"#fbbf24",paddingLeft:30,fontStyle:"italic"}}>Ex: {step.ex}</div>
          </div>
        ))}
      </div>
    </div>

        {/* Original "includes" section */}
    <div style={{background:"#fff",borderRadius:14,border:"2px solid #2563eb22",padding:"16px 14px",marginBottom:12,boxShadow:"0 2px 12px rgba(37,99,235,0.06)"}}>
      <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
        <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#2563eb,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,marginRight:10,flexShrink:0}}>✓</div>
        <div style={{fontSize:15,fontWeight:700,color:"#1e40af"}}>An Industry Includes Uma Indústria Inclui</div>
      </div>
      <div style={{paddingLeft:36,display:"flex",flexDirection:"column",gap:6}}>
        {[<span>Products/services with <b style={{color:"#1e40af"}}>similar form and function</b> in <b style={{color:"#1e40af"}}>direct competition</b><br/><span style={{fontSize:11,color:"#64748b"}}>Produtos/serviços com forma e função similares em competição direta</span></span>,<span>The <b style={{color:"#1e40af"}}>firms</b> that provide these products and services<br/><span style={{fontSize:11,color:"#64748b"}}>As empresas que fornecem esses produtos e serviços</span></span>].map((txt,i)=>(<div key={i} style={{fontSize:13,color:"#374151",lineHeight:1.6,paddingLeft:12,borderLeft:"3px solid #3b82f6"}}>{txt}</div>))}
      </div>
    </div>
    <div style={{background:"#fffbeb",borderRadius:14,border:"2px solid #d9770622",padding:"16px 14px",boxShadow:"0 2px 12px rgba(217,119,6,0.06)"}}>
      <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
        <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#d97706,#f59e0b)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,marginRight:10,flexShrink:0}}>!</div>
        <div style={{fontSize:15,fontWeight:700,color:"#92400e"}}>Key Notes Notas Importantes</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {["Implies a particular set of customers Implica um conjunto específico de clientes","Does not generally conform to standard industry codes Geralmente não segue códigos industriais padrão","Industry boundaries may shift over time Os limites da indústria podem mudar ao longo do tempo","Same product may appear in different industries if different customers buy for different purposes O mesmo produto pode aparecer em indústrias diferentes se clientes diferentes compram por propósitos diferentes"].map((txt,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 12px",background:"#fff",borderRadius:8,border:"1px solid #fde68a"}}><Num n={i+1} color="#d97706"/><span style={{fontSize:13,color:"#4b5563",lineHeight:1.55}}>{txt}</span></div>))}
      </div>
    </div>
  </div>);
}

/* ─── INTERACTIVE INDUSTRY DETAIL ─── */
function InteractiveIndustryDetail() {
  const [open, setOpen] = useState(null);
  const sections=[
    {key:"ic",title:"Industry Characteristics Características da Indústria",color:"#0369a1",border:"#bae6fd",items:["Relevant segments, activities, resources, knowledge Segmentos, atividades, recursos, conhecimento relevantes","Relevant technologies and processes Tecnologias e processos relevantes","Geographic scope of competition Escopo geográfico da competição"]},
    {key:"comp",title:"Competition Competição",color:"#b91c1c",border:"#fecaca",items:["Ferocity of competition Intensidade da competição","Nature of competition Natureza da competição","Identity of competitors Identidade dos concorrentes","Strategies of competitors Estratégias dos concorrentes","Capabilities of competitors Capacidades dos concorrentes"]},
    {key:"coop",title:"Cooperation Cooperação",color:"#059669",border:"#a7f3d0",items:["Scope for cooperation with competitors Espaço para cooperação com concorrentes","Alliances Alianças","Joint development or marketing Desenvolvimento/marketing conjunto","Lobbying Lobby","Other joint activities Outras atividades conjuntas"]},
    {key:"sg",title:"Strategic Grouping Grupos Estratégicos",color:"#7c3aed",border:"#ddd6fe",items:["Groups of firms with similar strategies Grupos de empresas com estratégias similares","Interaction within and between groups Interação dentro e entre grupos"]},
    {key:"lf",title:"Lead Firms Empresas Líderes",color:"#d97706",border:"#fde68a",items:["Strength Força","Behavior Comportamento"]},
  ];
  return (<div style={{marginBottom:16}}>
    <IH>Industry Drivers — Interactive Detail</IH>
    <ISub>Toque em cada categoria para expandir · Tap to expand</ISub>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {sections.map(sec=>{const on=open===sec.key;return(
        <div key={sec.key} onClick={()=>setOpen(on?null:sec.key)} style={{background:on?`${sec.color}08`:"#fff",border:`1.5px solid ${on?sec.color+"44":"#e5e7eb"}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",boxShadow:on?`0 4px 14px ${sec.color}10`:"0 1px 3px rgba(0,0,0,0.03)",transition:"all 0.25s ease"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:sec.color,boxShadow:on?`0 0 8px ${sec.color}55`:"none",transition:"box-shadow 0.3s"}}/>
              <span style={{fontSize:14,fontWeight:700,color:on?sec.color:"#374151",transition:"color 0.2s"}}>{sec.title}</span>
              <span style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>({sec.items.length})</span>
            </div>
            <span style={{fontSize:14,color:"#94a3b8",transform:on?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.25s",display:"inline-block"}}>▾</span>
          </div>
          {on && <Expandable items={sec.items} color={sec.color} border={sec.border}/>}
        </div>
      );})}
    </div>
  </div>);
}

/* ─── INTERACTIVE COMPETITION SPECTRUM ─── */
function InteractiveCompetition() {
  const [exp, setExp] = useState(null);
  const types=[
    {key:"mono",label:"Monopoly Monopólio",color:"#7c3aed",items:["No competition Sem competição","Most favorable unless limited by regulation Mais favorável, salvo regulação"]},
    {key:"oligo",label:"Oligopoly Oligopólio",color:"#2563eb",items:["Competition among limited firms Competição entre poucas empresas","Recognition of interdependence Reconhecimento de interdependência"]},
    {key:"hyper",label:"Hypercompetition Hipercompetição",color:"#d97706",items:["Several firms, potential new entrants Várias empresas, potenciais entrantes","Firms may distinguish themselves briefly Empresas podem se diferenciar brevemente"]},
    {key:"segment",label:"Segmented Competition Competição Segmentada",color:"#475569",items:["Multiple segments with distinct buyer groups Múltiplos segmentos com grupos de compradores distintos","Different price/performance packages Diferentes pacotes preço/desempenho","Pricing flexibility within segments Flexibilidade de preços dentro dos segmentos","Competition dynamics differ across segments Dinâmicas competitivas diferem entre segmentos"]},
    {key:"perfect",label:"Perfect Competition Competição Perfeita",color:"#ea580c",items:["Many firms cannot distinguish themselves Muitas empresas não conseguem se diferenciar","Price competition only Apenas competição por preço"]},
    {key:"subsid",label:"Subsidized Competition Competição Subsidiada",color:"#dc2626",items:["Money-losing firms kept in business Empresas deficitárias mantidas em operação","Competition on price Competição por preço"]},
  ];
  const spectrum=[{label:"Subsidized",color:"#dc2626",x:35},{label:"Perfect",color:"#ea580c",x:130},{label:"Hyper",color:"#d97706",x:225},{label:"Segmented",color:"#475569",x:310},{label:"Oligopoly",color:"#2563eb",x:395},{label:"Monopoly",color:"#7c3aed",x:465}];

  return (<div style={{marginBottom:16}}>
    <IH>Types of Competition Tipos de Competição</IH>
    <ISub>Toque para ver características · Tap to see characteristics</ISub>
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
      {types.map(t=>{const on=exp===t.key;return(
        <div key={t.key} onClick={()=>setExp(on?null:t.key)} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",borderRadius:12,cursor:"pointer",background:on?`${t.color}08`:"#fff",border:`1.5px solid ${on?t.color+"44":"#e5e7eb"}`,boxShadow:on?`0 4px 14px ${t.color}10`:"0 1px 3px rgba(0,0,0,0.03)",transition:"all 0.25s ease"}}>
          <div style={{width:12,height:12,borderRadius:"50%",backgroundColor:t.color,flexShrink:0,marginTop:3,boxShadow:on?`0 0 10px ${t.color}55`:"none",transition:"box-shadow 0.3s"}}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:700,fontSize:14,color:on?t.color:"#1f2937",transition:"color 0.2s"}}>{t.label}</span>
              <span style={{fontSize:14,color:"#94a3b8",transform:on?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.25s",display:"inline-block"}}>▾</span>
            </div>
            {on && <Expandable items={t.items} color={t.color}/>}
          </div>
        </div>
      );})}
    </div>
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:"18px 12px",boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
      <div style={{fontSize:15,fontWeight:700,textAlign:"center",color:"#0f172a",marginBottom:4}}>Where is the Industry? Onde está a Indústria?</div>
      <p style={{fontSize:11,color:"#94a3b8",textAlign:"center",margin:"0 0 10px"}}>Posicione sua indústria no espectro</p>
      <svg viewBox="0 0 500 80" style={{width:"100%",height:"auto"}}>
        <defs><linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#dc2626"/><stop offset="30%" stopColor="#d97706"/><stop offset="60%" stopColor="#475569"/><stop offset="80%" stopColor="#2563eb"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
        <rect x="30" y="18" width="440" height="6" rx="3" fill="#e2e8f0"/>
        <rect x="30" y="18" width="440" height="6" rx="3" fill="url(#cgrad)" opacity="0.6"/>
        {spectrum.map((sp,i)=><g key={i}><circle cx={sp.x} cy="21" r="7" fill={sp.color} stroke="#fff" strokeWidth="2.5"/><text x={sp.x} y="46" textAnchor="middle" fontSize="9" fill={sp.color} fontWeight="700">{sp.label}</text></g>)}
        <text x="30" y="70" fontSize="9" fill="#94a3b8">← Mais competição More competition</text>
        <text x="470" y="70" fontSize="9" fill="#94a3b8" textAnchor="end">Less competition Menos competição →</text>
      </svg>
    </div>
  </div>);
}


/* ─── NEW: INTERACTIVE INDUSTRY ECONOMICS ───
   ★ STRUCTURAL CHANGE #3: Dynamic industry economics analysis
   Not "what are current margins" but "why is profit structurally possible"
─── */
function InteractiveIndustryEconomics() {
  const [open, setOpen] = useState(null);
  const questions = [
    { key:"why", title:"Why is profit POSSIBLE here? Por que o lucro é possível aqui?", color:"#059669", border:"#a7f3d0",
      items:[
        "Which departures from perfect competition exist? Quais desvios da competição perfeita?",
        "Entry barriers: scale, learning, scope, brands, patents, regulation, retaliation Barreiras de entrada?",
        "Exit barriers: specialized assets, strategic/emotional barriers, exit costs Barreiras de saída?",
        "Information asymmetries between firms and/or customers Assimetrias de informação?",
        "Are products differentiable or homogeneous? Diferenciáveis ou homogêneos?",
      ]},
    { key:"where", title:"Where does profit COME FROM? De onde vem o lucro?", color:"#2563eb", border:"#bfdbfe",
      items:[
        "Price premiums from differentiation (brand, quality, features)? Prêmios por diferenciação?",
        "Cost advantages from scale, learning, scope, or resource access? Vantagens de custo por escala?",
        "Customer switching costs or lock-in? Custos de troca?",
        "Regulatory protection or government policies? Proteção regulatória?",
        "Network effects or platform dynamics? Efeitos de rede?",
        "Control of scarce inputs, distribution, or complementary assets? Controle de insumos escassos?",
      ]},
    { key:"shift", title:"What SHIFTS would change the profit structure? O que mudaria a estrutura?", color:"#dc2626", border:"#fecaca",
      items:[
        "New entrants overcoming barriers (technology change, regulation change)? Novos entrantes superando barreiras?",
        "Substitutes emerging from adjacent industries? Substitutos adjacentes?",
        "Buyer or supplier power shifting (consolidation, vertical integration)? Mudança no poder de compradores?",
        "Competition type migrating on the spectrum (e.g., oligopoly → hypercompetition)? Tipo de competição migrando?",
        "Macro/Meta forces disrupting the structure (trade policy, technology waves, geopolitics)? Forças macro/meta perturbando?",
        "Lead firms changing strategy or new lead firms emerging? Empresas líderes mudando?",
      ]},
  ];

  return (<div style={{marginBottom:16}}>
    <IH>Industry Economics Economia da Indústria</IH>
    <ISub>Não é estática — é como a estrutura de lucro se forma, persiste e muda</ISub>
    <div style={{background:"#fef2f2",border:"2px solid #dc262622",borderRadius:14,padding:"12px 14px",marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:"#991b1b",textAlign:"center",marginBottom:4}}>⚠️ Erro Comum Common Mistake</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{background:"#fff",border:"1px solid #fca5a5",borderRadius:8,padding:"6px 12px",fontSize:12}}><span style={{color:"#dc2626",fontWeight:700}}>✗</span> Tratar como 'qual é a margem atual'</div>
        <div style={{background:"#fff",border:"1px solid #86efac",borderRadius:8,padding:"6px 12px",fontSize:12}}><span style={{color:"#16a34a",fontWeight:700}}>✓</span> Perguntar 'Por que possível? De onde? O que mudaria?'</div>
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {questions.map(q=>{const on=open===q.key;return(
        <div key={q.key} onClick={()=>setOpen(on?null:q.key)} style={{background:on?`${q.color}06`:"#fff",border:`1.5px solid ${on?q.color+"44":"#e5e7eb"}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",boxShadow:on?`0 4px 14px ${q.color}10`:"0 1px 3px rgba(0,0,0,0.03)",transition:"all 0.25s ease"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:14,fontWeight:700,color:on?q.color:"#374151",transition:"color 0.2s",flex:1}}>{q.title}</span>
            <span style={{fontSize:14,color:"#94a3b8",transform:on?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.25s",display:"inline-block",flexShrink:0,marginLeft:8}}>▾</span>
          </div>
          {on && <Expandable items={q.items} color={q.color} border={q.border}/>}
        </div>
      );})}
    </div>
  </div>);
}

/* ═══ TAB CONTENT ═══ */

function Overview() {
  return (<div>
    <SectionTitle pt="Informações da prova e como escrever">Exam Info & How to Write</SectionTitle>
    <Card title="Exam Structure (from Practice Exam)" pt="Estrutura da prova (do simulado)" color="blue">
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[{q:"Q1",t:"Five Levels",w:"25%",m:"30 min"},{q:"Q2",t:"VRIO → ARK",w:"25%",m:"30 min"},{q:"Q3",t:"ETA/Swatch",w:"25%",m:"30 min"}].map(x=>(<div key={x.q} className="bg-white border rounded-lg p-3 text-center"><div className="font-bold text-blue-700 text-lg">{x.q}</div><div className="text-xs font-semibold">{x.t}</div><div className="text-xs text-slate-500">{x.w} · {x.m}</div></div>))}
      </div>
      <div className="bg-amber-50 border border-amber-300 rounded p-2 text-xs">⚠️ Total = 75%. Espere uma <strong>4ª questão não revelada (25%)</strong>. Prepare-se para aplicar Five Levels + SPARK a um cenário desconhecido.</div>
    </Card>
    <Card title="The Single Governing Logic" pt="A lógica central única do curso" color="green">
      <div className="bg-white rounded-lg p-4 text-center border">
        <div className="text-lg font-bold text-green-800 mb-2">Understand and improve firm performance</div>
        <div className="text-sm text-slate-600 mb-3">Compreender e melhorar o desempenho da empresa</div>
        <div className="flex flex-wrap justify-center gap-2">
          {[["Performance is RELATIVE","Relativo"],["Comprehensive","Abrangente"],["Integrative","Integrativo"],["Dynamic","Dinâmico"],["Question-based","Baseado em perguntas"]].map(([e,v])=>(<Tag key={e} color="green">{e} {v}</Tag>))}
        </div>
      </div>
    </Card>
    <Card title="Strategy in This Course (Ch.1)" pt="Definição de estratégia neste curso" color="purple">
      <div className="flex items-center justify-center flex-wrap gap-1 text-xs font-semibold">
        <Tag color="purple">Create value for customers</Tag><span className="text-purple-400">+</span><Tag color="purple">Beat competitors</Tag><span className="text-purple-400">+</span><Tag color="purple">Get paid for it</Tag>
      </div>
      <div className="mt-3 flex items-center justify-center flex-wrap gap-1 text-xs"><Tag color="slate">Analysis</Tag><Arrow /><Tag color="slate">Decisions</Tag><Arrow /><Tag color="slate">Action / Execution</Tag><Arrow /><Tag color="slate">Leadership</Tag></div>
      <p className="mt-3 text-xs text-center text-slate-500">No "magic bullets." Strategy is both big picture AND detailed plans for execution.</p>
      <p className="mt-1 text-xs text-center text-slate-400">Não há "bala de prata." Estratégia inclui tanto a visão geral QUANTO os planos detalhados para execução.</p>
    </Card>
    <Card title="6-Step Answer Formula" pt="Fórmula de resposta em 6 passos (inferida das exigências do material)" color="amber">
      <div className="space-y-2">
        {[["1","State the performance issue","Declare o problema de desempenho"],["2","Identify the dominant level","Identifique o nível dominante"],["3","Name specific drivers","Nomeie os drivers específicos"],["4","Explain HOW → mechanism","Explique o mecanismo de impacto"],["5","Cross-level linkage","Conexão entre níveis"],["6","Judge: positive/negative? Persist?","Julgue: positivo/negativo? Persistente?"]].map(([n,en,pt])=>(<div key={n} className="flex items-start gap-2"><div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">{n}</div><div><span className="font-semibold text-sm">{en}</span> <span className="text-xs text-slate-500">{pt}</span></div></div>))}
      </div>
    </Card>
    <Card title="Weak vs. Strong" pt="Resposta fraca vs. forte" color="red">
      <table className="w-full text-xs"><thead><tr><th className="text-left pb-1 text-red-700">Weak ✗</th><th className="text-left pb-1 text-green-700">Strong ✓</th></tr></thead>
      <tbody className="divide-y">
        {[["Defines concepts only","Applies to specific case"],['"Competition was intense"',"WHY intense, HOW changed profitability"],['"Resources mattered"',"WHICH, why V-R-I, organized to exploit?"],["Static snapshot","Trend + future direction"],["One level only","Cross-level connection"],["Generic conclusion","Crisp judgment on performance"]].map(([w,s],i)=>(<tr key={i}><td className="py-1 pr-2 text-red-600">{w}</td><td className="py-1 text-green-700">{s}</td></tr>))}
      </tbody></table>
    </Card>
  </div>);
}

function FiveLevels() {
  return (<div>
    <SectionTitle pt="O Framework de Cinco Níveis — Diagramas interativos + Referência">The Five-Level Framework</SectionTitle>
    <div className="mb-6"><InteractivePentagon /></div>
    <Card title="Three Critical Insights (Ch.2)" pt="Três percepções fundamentais" color="blue"><div className="grid grid-cols-3 gap-2">{[["Systemic Sistêmico","Levels interdependent; changes cascade"],["Changing Mudança contínua","Must project forward, not snapshot"],["Interdependent Interdependente","Favorable macro ≠ firm success if micro/firm unfavorable"]].map(([t,d])=>(<div key={t} className="bg-white border rounded p-3 text-center"><div className="font-bold text-blue-700 text-sm mb-1">{t}</div><div className="text-xs text-slate-600">{d}</div></div>))}</div></Card>
    <Card title="Levels AND Trends (Ch.2)" pt="Níveis E Tendências" color="amber"><div className="text-center font-semibold">"Better might still not be good. Worse might still not be bad."</div><div className="text-center text-xs text-slate-500 mt-1">Melhorar não significa necessariamente que está bom. Piorar não significa necessariamente que está ruim.</div></Card>
    <Card title="Q1 Template" pt="Modelo de resposta rápida para Q1" color="green"><div className="bg-white border rounded p-3 text-sm italic">"At the [level], the crucial driver was [X]. This mattered because [mechanism]. It influenced profitability by [price / cost / demand / bargaining / entry / rivalry]. The impact was [positive / negative], and the trend was [direction]."</div><div className="mt-2 bg-red-50 border border-red-300 rounded p-2 text-xs">⚠️ Q1 exige 5 casos diferentes, um por nível. <strong>Complete com suas anotações das Sessions 1–8.</strong></div></Card>
  </div>);
}

function SparkPosition() {
  return (<div>
    <SectionTitle pt="Modelo SPARK e Análise de Posicionamento">SPARK Model & Positioning</SectionTitle>
    <div className="mb-6 bg-white rounded-xl p-4 border border-slate-200"><InteractiveFirmLevel /></div>
    <div className="bg-gradient-to-br from-green-800 to-green-900 text-white rounded-xl p-5 mb-4">
      <div className="text-center font-bold text-xl mb-1">Strategy = SPARK</div><div className="text-center text-green-300 text-xs mb-4">Ch.3 — Ferramenta de análise no nível da empresa</div>
      <div className="space-y-2">{[{l:"S",w:"cope",q:"WHERE? Onde?",d:"Industries, segments, geography",c:"bg-green-700"},{l:"P",w:"ositioning",q:"HOW? Como?",d:"Price/performance + cost + vs. competitors",c:"bg-green-600"},{l:"A",w:"ctivities",q:"DO what? Faz o quê?",d:"Tasks to serve customers",c:"bg-emerald-700"},{l:"R",w:"esources",q:"HAVE what? Tem o quê?",d:"Brands, patents, workforce, facilities, financial",c:"bg-emerald-600"},{l:"K",w:"nowledge",q:"KNOW what? Sabe o quê?",d:"Market, tech, competitor, process, organizational",c:"bg-teal-700"}].map(s=>(<div key={s.l} className={`${s.c} rounded-lg p-3 flex items-center gap-3`}><div className="text-3xl font-black text-green-200 w-8">{s.l}</div><div className="flex-1"><div className="flex items-baseline gap-2"><span className="font-bold">{s.l}<span className="font-normal">{s.w}</span></span><span className="text-green-300 text-xs">{s.q}</span></div><div className="text-xs text-green-200 mt-0.5">{s.d}</div></div></div>))}</div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="bg-green-700 rounded p-2"><strong>S</strong> determines WHERE</div><div className="bg-green-700 rounded p-2"><strong>P + A</strong> determine HOW</div><div className="bg-green-700 rounded p-2"><strong>R + K</strong> determine WITH WHAT</div></div>
      <div className="mt-2 text-center text-xs text-green-300">High-performing firms often have a distinctive SPARK.</div>
    </div>
    <Card title="Positioning: The Full Picture (Ch.3)" pt="Posicionamento: Ponto mais cobrado e mais errado na prova" color="red"><div className="bg-red-50 border border-red-200 rounded p-3 mb-3 text-center"><div className="font-bold text-red-700">You CANNOT judge positioning from:</div><div className="flex justify-center gap-4 mt-2"><div className="bg-white border border-red-300 rounded px-3 py-1 text-sm">Price/Performance alone ✗</div><div className="bg-white border border-red-300 rounded px-3 py-1 text-sm">Cost/Performance alone ✗</div></div><div className="mt-2 font-bold text-green-700">Only MARGIN (Price − Cost) reveals truth ✓</div><div className="text-xs text-slate-500 mt-1">Somente a MARGEM (Preço − Custo) revela a verdade</div></div><div className="grid grid-cols-3 gap-2 mb-3">{[{f:"Firm B",p:"Below avg",c:"Very low",pr:"Above avg ✓",st:"Cost Leader",cl:"border-blue-400 bg-blue-50"},{f:"Firm C",p:"High",c:"Slightly high",pr:"Above avg ✓",st:"Differentiator",cl:"border-purple-400 bg-purple-50"},{f:"Firm D",p:"High",c:"Low",pr:"Highest ✓✓",st:"Rare: IP/scale/platform",cl:"border-green-400 bg-green-50"}].map(f=>(<div key={f.f} className={`border-2 ${f.cl} rounded-lg p-3 text-center`}><div className="font-bold text-sm">{f.f}</div><div className="text-xs mt-1">Price: {f.p}</div><div className="text-xs">Cost: {f.c}</div><div className="text-xs font-bold mt-1">Profit: {f.pr}</div><div className="text-xs text-slate-500 mt-1">{f.st}</div></div>))}</div><div className="text-xs text-slate-600">Why not all Firm D? Smart competitors + inherent tradeoffs. Exceptions: IP as standard (Microsoft), massive scale (Intel), resource advantages (Saudi Aramco), platform (Google/Facebook).</div></Card>
    <Card title="A-R-K Advantage Logic" pt="Lógica de vantagem de Atividades-Recursos-Conhecimento" color="purple"><div className="space-y-2"><div className="bg-red-50 border-l-2 border-red-400 p-2 text-xs"><strong>NOT enough:</strong> "We are better at marketing"</div><div className="bg-green-50 border-l-2 border-green-400 p-2 text-xs"><strong>IS enough:</strong> "We are better at marketing <em>and therefore customers pay us a price premium</em>"</div></div><div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="bg-purple-100 rounded p-2"><strong>Individual</strong> A, R, or K</div><div className="bg-purple-200 rounded p-2"><strong>Combinations</strong> of A+R+K</div><div className="bg-purple-300 rounded p-2"><strong>Systems</strong> (hardest to imitate)</div></div></Card>
    <Card title="Time Dimension (Ch.3)" pt="Dimensão temporal da estratégia" color="cyan"><div className="grid grid-cols-3 gap-2 text-xs">{[{t:"Commitment",d:"Large investment → long-term advantage",ex:"Chemicals, pharma, oil, mining"},{t:"Hustle",d:"Stream of temporary advantages, move fast",ex:"Motion pictures, fashion, trading, some tech"},{t:"Real Options",d:"Stay in game without big commitment",ex:"High uncertainty + irreversibility"}].map(s=>(<div key={s.t} className="bg-white border rounded p-3"><div className="font-bold text-cyan-700">{s.t}</div><div className="mt-1">{s.d}</div><div className="mt-1 text-slate-500 italic">{s.ex}</div></div>))}</div><div className="mt-2 text-xs text-slate-500"><strong>Time pacing:</strong> New products on set schedule. Fashion 2x/yr; PC every 6 mo.</div></Card>
    <Card title="General vs. Specific Competitive Advantages (Ch.3)" pt="Vantagens competitivas gerais vs. específicas" color="amber"><div className="grid grid-cols-2 gap-3 text-xs"><div className="bg-amber-50 border rounded p-3"><div className="font-bold text-amber-700 mb-1">General Gerais</div><div>Built up over time: R&D, brands, manufacturing excellence.</div></div><div className="bg-amber-50 border rounded p-3"><div className="font-bold text-amber-700 mb-1">Specific Específicas</div><div>Why the company succeeds or fails TODAY against specific competitors.</div></div></div><div className="mt-2 text-xs text-center">Hustle = criar vantagens gerais para gerar continuamente as vantagens específicas necessárias para competir agora.</div></Card>
    <Card title="Scope Combinations (Ch.3, Fig 3.1)" pt="Matriz de combinações de Escopo" color="slate"><div className="grid grid-cols-2 gap-3"><div className="grid grid-cols-2 gap-1 text-xs">{["Local Diversifier","Global Diversifier","Local Specialist","Global Specialist"].map(s=>(<div key={s} className="bg-slate-100 border rounded p-2 text-center">{s}</div>))}</div><div className="grid grid-cols-2 gap-1 text-xs">{["Local Broadline","Global Broadline","Local Focus","Global Focus"].map(s=>(<div key={s} className="bg-slate-100 border rounded p-2 text-center">{s}</div>))}</div></div></Card>
    <Card title="Activities & Resources Lists" pt="Listas de Atividades e Recursos" color="green"><div className="grid grid-cols-2 gap-3 text-xs"><div><div className="font-semibold text-green-700 mb-1">Activities Atividades:</div><div className="flex flex-wrap gap-1">{["Product/Service Dev","Production","Logistics","Sales & Marketing","Customer Service","Accounting","Finance","HR Management","Strategy Setting"].map(a=>(<span key={a} className="bg-green-50 border border-green-200 rounded px-1.5 py-0.5">{a}</span>))}</div></div><div><div className="font-semibold text-green-700 mb-1">Resources Recursos:</div><div className="flex flex-wrap gap-1">{["Natural Resources","Financial Resources","Human Resources","Physical Assets","Locations","Patents","Brands","Reputation","Org Resources"].map(r=>(<span key={r} className="bg-green-50 border border-green-200 rounded px-1.5 py-0.5">{r}</span>))}</div></div></div></Card>
    <Card title="Signals of Value (Ch.3)" pt="Sinais de valor — impactam a disposição a pagar" color="rose"><div className="flex flex-wrap gap-1 text-xs">{["Brands","Installed base / existing customers","Celebrity endorsements","Awards","Independent certification (ISO)","Price as signal of quality","Customer education"].map(s=>(<span key={s} className="bg-rose-50 border border-rose-200 rounded px-2 py-1">{s}</span>))}</div><div className="mt-2 text-xs text-slate-500">Price can signal exclusivity. Raising price can sometimes increase sales.</div></Card>
  </div>);
}

function IndustryTab() {
  return (<div>
    <SectionTitle pt="Análise no Nível da Indústria — Diagramas interativos + Referência">Industry-Level Analysis (Ch.4)</SectionTitle>
    <InteractiveWhatIsIndustry />
    <InteractiveIndustryDetail />
    <InteractiveCompetition />

    {/* ★ Industry Economics dynamic analysis */}
    <InteractiveIndustryEconomics />
    <div className="mt-2 mb-3 text-center"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">▼ Detailed Reference Referência Detalhada ▼</span></div>
    <Card title="Industry Definition — CRITICAL" pt="Definição de indústria — EXTREMAMENTE IMPORTANTE" color="red"><div className="bg-white border-2 border-red-300 rounded-lg p-4 text-center mb-3"><div className="font-bold text-red-700 mb-2">Products/services with SIMILAR FORM AND FUNCTION in DIRECT COMPETITION</div><div className="text-xs text-slate-600">Focus on "useful output" to customers. NOT statistical codes.</div></div><div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-green-50 border border-green-300 rounded p-2">✓ iPhone + Android = same industry (smartphones)</div><div className="bg-red-50 border border-red-300 rounded p-2">✗ Amazon + Microsoft + Meta ≠ same industry (different outputs)</div></div></Card>
    <Card title="Conditions for Perfect Competition" pt="Condições para competição perfeita (desvios = explicam lucro)" color="slate"><div className="grid grid-cols-2 gap-1 text-xs">{["No entry/exit barriers","Homogeneous products","No brands","No scale/scope/learning economies","No preferential relationships","No informational asymmetries","No transportation costs","No collusion"].map(c=>(<div key={c} className="flex items-center gap-1"><span className="text-red-500">✗</span> {c}</div>))}</div><div className="mt-2 text-xs font-semibold text-center">Desvios dessas condições → explicam por que lucros existem</div></Card>
    <Card title="Barriers to Entry & Exit (Ch.4)" pt="Barreiras de entrada e saída" color="purple"><div className="grid grid-cols-2 gap-3 text-xs"><div><div className="font-semibold text-purple-700 mb-1">Entry Barriers:</div><ul className="space-y-0.5 list-disc list-inside"><li>Economies of scale, learning, scope</li><li>Brands and differentiation</li><li>Patents and government regulation</li><li>Access to inputs or distribution</li><li>Expected retaliation</li></ul></div><div><div className="font-semibold text-purple-700 mb-1">Exit Barriers:</div><ul className="space-y-0.5 list-disc list-inside"><li>Specialized assets</li><li>Strategic barriers</li><li>Emotional barriers</li><li>Large costs of exiting</li></ul></div></div><div className="mt-2 bg-purple-50 border border-purple-300 rounded p-2 text-xs text-center font-semibold">"Barriers to entry and exit allow differences in profitability to persist" (Ch.4)</div></Card>
    <Card title="Table 4.3: Features by Competition Type" pt="Tabela de características por tipo de competição" color="slate"><div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="bg-slate-100"><th className="text-left p-1">Feature</th><th className="p-1">Subsidized</th><th className="p-1">Perfect</th><th className="p-1">Hyper</th><th className="p-1">Oligopoly</th><th className="p-1">Monopoly</th></tr></thead><tbody className="divide-y">{[["Entry","Subsidized","Free","Feasible","Limited","No entry"],["Products","Inferior may succeed","Homogeneous","Distinguishable briefly","Distinguishable long","Unique"],["Brands","Subsidies overcome","None","Temporary","Sustained","Unique"],["Scale/Scope","Subsidies overcome","None","Limited","Pot. large","Very large"],["Customer rel.","Subsidies overcome","None","Temporary","Sustained","Exclusive"],["Info asymmetry","Subsidies overcome","None","Temporary","Sustained","Complete"],["Collusion","Not specified","None","Little","Possible","Total"],["Profit","Very low","Low","Low-mod","Pot. high","High sustained"]].map(([f,...vs])=>(<tr key={f}><td className="p-1 font-semibold">{f}</td>{vs.map((v,i)=><td key={i} className="p-1 text-center">{v}</td>)}</tr>))}</tbody></table></div></Card>
    <Card title="Competitor Envelope Analysis — CEA (Ch.4)" pt="Análise de envelope do concorrente" color="rose"><div className="text-xs mb-2">Assess competitors as they <strong>might be</strong>, not just as they are. "They do strategy too."</div><div className="grid grid-cols-2 gap-1 text-xs">{["What if competitors optimized their activities?","What if they fully leveraged resources & knowledge?","What if they overcame strategic shortcomings?","What if taken over by savvy, deep-pocketed firms?","What would WE do if we managed the competitors?","Also: look for unmet demand / underserved segments"].map(q=>(<div key={q} className="bg-rose-50 border rounded p-1.5">{q}</div>))}</div></Card>
    <Card title="Quality vs. Price Competition" pt="Competição por qualidade vs. preço" color="green"><div className="text-xs text-center font-semibold">"Competition based on quality, features, etc. generally leads to better industry profitability than competition solely on price."</div></Card>
  </div>);
}

function MesoCluster() {
  return (<div>
    <SectionTitle pt="Nível Meso / Cluster (Ch.5)">Meso / Cluster Level</SectionTitle>
    <Card title='This level is "often missed in strategic analyses" (Ch.2)' pt='Este nível é "frequentemente ignorado em análises estratégicas"' color="amber"><div className="text-xs">A distinct source of performance involving suppliers, customers, related industries, spillovers, complementarities, substitutes, shared resources/activities.</div></Card>
    <div className="grid grid-cols-2 gap-3 mb-4"><div className="bg-green-50 border-2 border-green-400 rounded-lg p-4"><div className="font-bold text-green-700 text-center mb-2">Complementarities Complementares</div><div className="text-center text-2xl mb-2">📈</div><div className="text-xs space-y-1"><div>→ <strong>EXPAND</strong> demand Expandem demanda</div><div>→ Make focal product more valuable</div><div>→ Create shared efficiencies</div></div></div><div className="bg-red-50 border-2 border-red-400 rounded-lg p-4"><div className="font-bold text-red-700 text-center mb-2">Substitutes Substitutos</div><div className="text-center text-2xl mb-2">📉</div><div className="text-xs space-y-1"><div>→ <strong>CONTRACT</strong> demand Contraem demanda</div><div>→ Replace <strong>function</strong>, not just form</div><div>→ Compete for customer's <strong>time or money</strong></div></div></div></div>
    <Card title="Bargaining Power Framework" pt="Framework de poder de barganha" color="blue"><div className="grid grid-cols-2 gap-3 text-xs"><div><div className="font-semibold text-blue-700 mb-1">Intrinsic Bargaining Strength:</div><ul className="space-y-0.5 list-disc list-inside"><li>Concentration</li><li>Volume of purchases</li><li>Availability of substitutes</li><li>Switching costs</li><li>Vertical integration threat</li><li>Pull-through to end-user</li></ul></div><div><div className="font-semibold text-blue-700 mb-1">Price Sensitivity:</div><ul className="space-y-0.5 list-disc list-inside"><li>Cost / total purchases</li><li>Strategy and positioning</li><li>Buyer/supplier profitability</li><li>Impact on quality / performance</li></ul></div></div></Card>
    <Card title="Business Ecosystem Warning" pt="Alerta sobre ecossistemas de negócios" color="red"><div className="bg-red-100 border border-red-300 rounded p-3 text-center"><div className="font-bold text-red-800 text-sm">Where is value GENERATED, APPROPRIATED, and DEFENDED?</div><div className="text-xs text-red-700 mt-1">Onde o valor é GERADO, APROPRIADO e DEFENDIDO?</div><div className="text-xs text-slate-600 mt-2">"Asset light" and ecosystem strategies can be dangerous if firms don't understand this.</div></div></Card>
    <Card title={`"It's a Wonderful Life" Test`} pt="Se um participante for removido, o que acontece?" color="purple"><div className="text-xs">Imagine removing a player from the ecosystem. If the industry would be significantly worse off, that player has substantial power. If barely noticed, they do not.</div></Card>
    <Card title='"When Will Buyers Get the Value?"' pt="Quando os compradores capturarão o valor?" color="amber"><div className="text-xs space-y-1"><div>→ When we do NOT bring substantial value</div><div>→ When we do NOT bring something unique</div><div>→ When the pie WITH us ≈ WITHOUT us</div><div>→ When we need them more than they need us</div><div>→ When they can demand a price decrease and we can't resist</div><div>→ Buyer industry far from perfect competition → buyers have power</div><div>→ Buyer industry close to perfect competition → buyers have little power</div></div><div className="mt-2 text-xs text-slate-500 italic">Same logic applies in reverse for supplier power.</div></Card>
    <Card title="Meso Driver Checklist" pt="Lista de drivers no nível Meso" color="cyan"><div className="grid grid-cols-2 gap-1 text-xs">{["Demand & Customers","Inputs & Suppliers","Shared Resources","Shared Activities","Complementarities","Substitutes","Meso Policies","Meso Institutions"].map(d=>(<div key={d} className="bg-white border rounded p-2 text-center">{d}</div>))}</div></Card>
  </div>);
}

function MacroMeta() {
  return (<div>
    <SectionTitle pt="Níveis Macro e Meta (Ch.6–Ch.7)">Macro & Meta Levels</SectionTitle>
    <Card title="MACRO / NATIONAL (Ch.6)" pt="Nível Nacional" color="blue"><div className="grid grid-cols-2 gap-2 mb-3">{[{t:"Macroeconomics",d:"Demand, fiscal, inflation, rates, exchange, unemployment"},{t:"Gov't Policies",d:"Monetary, fiscal, tax, industrial, trade, education, S&T, competition, IP, regulatory"},{t:"Institutions",d:"Design (policy bureaus) · Support (education, research) · Governance (legal, regulatory, admin)"},{t:"Civil Society",d:"Social structures, attitudes, cultural attributes, stability"}].map(x=>(<div key={x.t} className="bg-blue-50 border rounded p-3"><div className="font-bold text-blue-700 text-sm">{x.t}</div><div className="text-xs text-slate-600 mt-1">{x.d}</div></div>))}</div><div className="bg-amber-50 border border-amber-300 rounded p-3 text-xs"><strong>Notas Ch.6:</strong> Observe <Tag color="amber">Níveis</Tag> <Tag color="amber">Tendências</Tag> <Tag color="amber">Disrupção</Tag> <Tag color="amber">Mudanças não-lineares</Tag></div><div className="mt-2 text-xs text-slate-500"><strong>Two-edged sword:</strong> Good macro helps all firms; some firms profit from frictions in weak environments.</div></Card>
    <Card title="META / SUPRANATIONAL (Ch.7)" pt="Nível Supranacional" color="purple"><div className="grid grid-cols-3 gap-1 text-xs mb-3">{["Geopolitics","Global Technology","Global Economics","Social & Environmental","Multilateral Orgs (WTO, WB, IMF)","Trade Blocs (EU, USMCA, RCEP)","Foreign Governments","Int'l Financial Flows (FDI, portfolio)","Foreign MNCs","Other Groups (NGOs)"].map(d=>(<div key={d} className="bg-purple-50 border rounded p-2 text-center">{d}</div>))}</div></Card>
    <Card title="Writing Standard for Macro & Meta" pt="Padrão de escrita para respostas" color="red"><div className="grid grid-cols-2 gap-3 text-xs"><div className="bg-red-50 border border-red-300 rounded p-3"><div className="font-bold text-red-700 mb-1">DO NOT write ✗</div><div>"The economy was bad"</div><div>"Geopolitics mattered"</div></div><div className="bg-green-50 border border-green-300 rounded p-3"><div className="font-bold text-green-700 mb-1">DO write ✓</div><div>Show <strong>transmission mechanism</strong>: HOW it reaches demand, cost, inputs, finance, regulation, bargaining power</div></div></div></Card>
  </div>);
}

function VrioArk() {
  return (<div>
    <SectionTitle pt="Q2: VRIO estendido para ARK no SPARK">Q2: VRIO Extended to ARK in SPARK</SectionTitle>
    <Card title="VRIO Framework (extended)" pt="Framework VRIO (estendido neste curso)" color="purple"><div className="grid grid-cols-4 gap-2 mb-3">{[{l:"V",w:"aluable",d:"Improves WTP or lowers cost"},{l:"R",w:"are",d:"Few firms control it"},{l:"I",w:"nimitable",d:"Costly to obtain"},{l:"O",w:"rganized",d:"Firm captures value"}].map(v=>(<div key={v.l} className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 text-center"><div className="text-2xl font-black text-purple-700">{v.l}</div><div className="text-xs font-semibold">{v.l}{v.w}</div><div className="text-xs text-slate-600 mt-1">{v.d}</div></div>))}</div><div className="bg-purple-100 border border-purple-300 rounded p-2 text-center text-sm font-semibold">In STRT 6200: VRIO applies to <Tag color="purple">Resources</Tag> <strong>AND</strong> <Tag color="purple">Activities</Tag> <strong>AND</strong> <Tag color="purple">Knowledge</Tag> = the <strong>ARK in SPARK</strong></div></Card>
    <Card title="Q2A: Home Alone — Professor's Own Answer" pt="Resposta do próprio professor (slide 20)" color="green"><div className="text-xs text-green-700 font-semibold mb-3 text-center">✅ VERIFICADO: Lecture Notes Ch.5 Part 1, slide 20</div><div className="space-y-3">{[{m:"Home Alone 1",pay:"$100K",sc:"THE PART",bg:"bg-blue-50 border-blue-300",logic:"Scarce commodity = the role itself. Actor unproven. Talent not yet V-R-I. Studio bears risk. Low bargaining power."},{m:"Home Alone 2",pay:"$13.7M",sc:"THE KID",bg:"bg-green-50 border-green-300",logic:"Scarce commodity = Culkin himself. After hit: V (proven revenue), R (only one Culkin), I (emotional bond irreplaceable). Full VRIO → resource holder appropriates value."},{m:"Home Alone 3",pay:"$0",sc:"THE FRANCHISE",bg:"bg-amber-50 border-amber-300",logic:"Scarce commodity = the franchise brand itself. Actor substitutable at high price. VRIO resource has a max price. Franchise > any single actor."}].map(h=>(<div key={h.m} className={`border-2 ${h.bg} rounded-lg p-4`}><div className="flex items-center justify-between mb-2"><div className="font-bold text-lg">{h.m}</div><div className="font-bold text-lg">{h.pay}</div></div><div className="bg-white rounded px-3 py-2 text-center mb-2"><span className="text-xs text-slate-500">Scarce commodity:</span><span className="font-black text-lg ml-2">{h.sc}</span></div><div className="text-xs text-slate-700">{h.logic}</div></div>))}</div><div className="mt-3 bg-blue-50 border border-blue-200 rounded p-2 text-xs"><strong>Paralelo Jennifer Lawrence (slide 21):</strong> Hunger Games $500K → HG2 $10M → HG3+4 &gt;$40M. Same VRIO escalation.</div><div className="mt-2 text-xs font-semibold text-center">Chave: O que é "escasso" MUDA ao longo do tempo. VRIO é dinâmico. Poder de barganha segue a escassez.</div></Card>
    <Card title="Q2B: Natalie Portman — Three-Picture Deal" pt="Pergunta sobre ferramentas de influências externas" color="blue"><div className="text-xs space-y-2"><div className="flex items-start gap-2"><Tag color="amber">Micro</Tag> <span>After franchise success, actor VRIO → compensation escalates</span></div><div className="flex items-start gap-2"><Tag color="cyan">Meso</Tag> <span>Bargaining escalation is structural in entertainment</span></div><div className="flex items-start gap-2"><Tag color="green">Logic</Tag> <span>Lucas Films locked Portman in BEFORE VRIO = <strong>forward contract</strong> on potentially-VRIO resource</span></div></div></Card>
    <Card title="Q2C: Hollywood Flops — Limits of VRIO" pt="Limites do VRIO" color="red"><div className="space-y-2 text-xs">{[["1","VRIO necessary but not sufficient","Great actor + bad script = flop. Activity system matters as much as resources."],["2",'"O" is where flops happen',"Studios have VRIO resources but fail to Organize."],["3","Demand uncertainty = industry characteristic","Audience demand fundamentally unpredictable."],["4","Resources not automatically synergistic","Multiple VRIO ≠ guaranteed customer value."],["5","VRIO explains portfolios, not singles","Disney avg = more hits than misses."]].map(([n,t,d])=>(<div key={n} className="flex items-start gap-2"><div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">{n}</div><div><strong>{t}.</strong> {d}</div></div>))}</div></Card>
  </div>);
}

function EtaSwatch() {
  return (<div>
    <SectionTitle pt="Q3: ETA / Grupo Swatch">Q3: ETA / Swatch Group</SectionTitle>
    <Card title="Key Facts to Know Cold" pt="Fatos que você deve saber de cor" color="blue"><div className="grid grid-cols-2 gap-2 text-xs">{[["New movement","5 years + CHF 10M"],["ETA position","Dominant in Swiss market"],["Forced to supply","By Swiss Competition Commission (1990s)"],["Swatch investment","Billions of CHF expanding ETA"],["Hayek quote","Like BMW supplying engines to Audi & Mercedes"],["Pricing","Not allowed to raise prices without permission"],["Phase-out","ébauches → 2008 → 2011; movements → 85% by 2012; 50% gradual"],["Rivals responded","Cloned (patents expired) or developed own"],["ETA share by 2019","33%"],["Critical fact","Movements MORE CONCENTRATED than watches"]].map(([k,v])=>(<div key={k} className="bg-blue-50 border rounded p-2"><div className="font-semibold text-blue-700">{k}</div><div className="text-slate-700">{v}</div></div>))}</div></Card>
    <Card title="ETA Timeline" pt="Linha do tempo" color="slate"><div className="relative"><div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-300"></div><div className="space-y-3 ml-8">{[["1990s","Commission: ETA must supply any Swiss firm","red"],["2000","New movement: 5yr + CHF 10M","blue"],["2002–05","Swatch tries to phase out ébauche sales","amber"],["2008","Forced to keep supplying, no reduction","red"],["2011","Allowed to stop ébauches","amber"],["2012","Movements reduced to 85% of 2010","amber"],["2013","Gradual reduction to 50%","amber"],["2019","ETA share = 33%","green"],["Dec 2019","Commission: stop supplying","red"],["Jul 2020","Reversed: ETA free to sell or not","green"]].map(([yr,ev,c])=>(<div key={yr} className="flex items-start gap-2 relative"><div className={`absolute -left-8 w-4 h-4 rounded-full border-2 ${c==='red'?'bg-red-400 border-red-600':c==='green'?'bg-green-400 border-green-600':c==='amber'?'bg-amber-400 border-amber-600':'bg-blue-400 border-blue-600'}`}></div><div><span className="font-bold text-xs">{yr}:</span><span className="text-xs ml-1">{ev}</span></div></div>))}</div></div></Card>
    <div className="grid grid-cols-2 gap-3 mb-4">
      <Card title="A. Why limit sales?" color="red"><div className="text-xs space-y-1"><div>→ Raise rivals' costs (5yr + CHF 10M)</div><div>→ Stop subsidizing competitors</div><div>→ Fewer competitors → higher Swatch brand profits</div><div>→ ETA: utility → proprietary advantage</div></div></Card>
      <Card title="B. Why continue selling?" color="green"><div className="text-xs space-y-1"><div>→ Amortize fixed costs; achieve scale</div><div>→ Maintain competitor dependency</div><div>→ Revenue may exceed competitive cost</div><div>→ Avoid further antitrust fines</div></div></Card>
      <Card title="C. Commission impact?" color="amber"><div className="text-xs space-y-1"><div>→ Lowered entry barriers → more competitors</div><div>→ Competition shifted: manufacturing → brand/design/marketing</div><div>→ Stimulated alternative development</div><div>→ Likely reduced avg profitability</div></div></Card>
      <Card title="D. Movement vs Watch economics?" color="purple"><div className="text-xs space-y-1"><div><strong>Movements:</strong> High fixed cost, massive scale → few firms → oligopoly</div><div><strong>Watches:</strong> Brand differentiation, many segments → many firms → segmented</div><div className="font-semibold mt-1">Movimentos → concentração natural. Relógios → fragmentação natural.</div></div></Card>
    </div>
    <Card title="Movement vs Watch Economics" pt="Comparação econômica: movimentos vs. relógios" color="slate"><table className="w-full text-xs"><thead><tr><th className="text-left pb-1"></th><th className="text-left pb-1 text-blue-700">Movements</th><th className="text-left pb-1 text-amber-700">Watches</th></tr></thead><tbody className="divide-y">{[["Scale economies","Very high (5yr, CHF 10M; billions)","Lower (assembly/branding)"],["Entry barriers","Very high","Lower with movement access"],["Viable firms","Few → oligopoly","Many → segmented"],["Value capture","Manufacturing efficiency + scarcity","Brand + design + customer rel."]].map(([f,m,w])=>(<tr key={f}><td className="py-1 pr-2 font-semibold">{f}</td><td className="py-1 pr-2">{m}</td><td className="py-1">{w}</td></tr>))}</tbody></table></Card>
  </div>);
}

function CramSheet() {
  return (<div>
    <SectionTitle pt="Resumo rápido e checklist final">Cram Sheet & Final Checklist</SectionTitle>
    <div className="bg-slate-900 text-white rounded-xl p-5 mb-4"><div className="text-center font-bold text-xl mb-4 text-yellow-300">17 THINGS TO KNOW COLD</div><div className="space-y-2">{[["1","Performance is RELATIVE","Desempenho é RELATIVO","blue"],["2","Comprehensive, integrative, dynamic, question-based","Abrangente, integrativo, dinâmico, baseado em perguntas","blue"],["3","Five levels: Industry → Meso → Macro → Meta → Firm","Ordem: Indústria→Cluster→Nacional→Supra→Empresa","blue"],["4","Levels AND trends","Níveis E tendências","blue"],["5","Industry = useful output to customer + direct competition","Indústria = output útil + competição direta","amber"],["6","Full positioning = price AND cost","Posicionamento completo = preço E custo","green"],["7","SPARK: Scope, Positioning, Activities, Resources, Knowledge","","green"],["8","VRIO extends to ARK in SPARK","VRIO se estende ao ARK no SPARK","purple"],["9","Complementors EXPAND; substitutes CONTRACT demand","Complementares expandem; substitutos contraem demanda","cyan"],["10","Ecosystems: where is value generated, appropriated, defended?","Ecossistemas: onde o valor é gerado, apropriado, defendido?","red"],["11","Macro: levels, trends, disruption, non-linearity","Macro: níveis, tendências, disrupção, não-linearidade","blue"],["12","Q2 Home Alone: THE PART → THE KID → THE FRANCHISE","","green"],["13","Q3 ETA: 5yr, CHF 10M, 33% by 2019, more concentrated","","amber"],["14","Barriers to entry/exit allow profit differences to PERSIST","Barreiras fazem diferenças de lucro persistirem","purple"],["15","Industry Economics: WHY possible, WHERE from, WHAT shifts it","Economia: por que possível, de onde, o que muda","rose"],["16","General vs. Specific advantages → explains hustle logic","Vantagens gerais vs. específicas","cyan"],["17",`"Wonderful Life" test: remove a player, does it matter?`,"Remova um participante, faz diferença?","purple"]].map(([n,en,pt,c])=>{const colors={blue:"bg-blue-800",green:"bg-green-800",amber:"bg-amber-800",purple:"bg-purple-800",red:"bg-red-800",cyan:"bg-cyan-800",rose:"bg-rose-800"};return(<div key={n} className={`${colors[c]} rounded-lg px-4 py-2 flex items-center gap-3`}><div className="bg-white text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">{n}</div><div className="flex-1"><span className="font-semibold text-sm">{en}</span>{pt&&<span className="text-xs text-slate-300 ml-2">{pt}</span>}</div></div>);})}</div></div>
    <Card title="Mistakes That Cost Points" pt="Erros que mais custam pontos" color="red"><div className="grid grid-cols-2 gap-2 text-xs">{["Industry by tech, not useful output","Performance as absolute, not relative","Static analysis, no trends","Levels listed without HOW/WHY mechanism","Meso confused with micro",'"Better resources" without WTP/cost effect',"Positioning from price alone or cost alone","Unsupported case detail not in files","Industry economics as snapshot, not dynamic structure"].map(m=>(<div key={m} className="flex items-start gap-1"><span className="text-red-500 flex-shrink-0">✗</span><span>{m}</span></div>))}</div></Card>
    <Card title="Final 60-Minute Review Plan" pt="Plano de revisão dos 60 minutos finais" color="green"><div className="space-y-3">{[{t:"0–15 min",a:"MEMORIZE Memorize",d:"17 items above. Performance is relative. Five levels + drivers. SPARK. ARK. Price + cost."},{t:"15–30 min",a:"WRITE FROM MEMORY Escreva de memória",d:"Five levels + drivers. Competition spectrum. Home Alone: part/kid/franchise. ETA facts."},{t:"30–45 min",a:"PRACTICE 3 MINI-ANSWERS Pratique 3 respostas",d:"One Five-Level. One VRIO/ARK. One ETA. Each 6–8 sentences."},{t:"45–60 min",a:"CHECK TWO THINGS Verifique duas coisas",d:"Did I explain HOW? Did I explain WHY?"}].map(p=>(<div key={p.t} className="bg-green-50 border border-green-200 rounded-lg p-3"><div className="flex items-center gap-2 mb-1"><Tag color="green">{p.t}</Tag><span className="font-bold text-green-800 text-sm">{p.a}</span></div><div className="text-xs text-slate-700">{p.d}</div></div>))}</div></Card>
    <Card title="Final Checklist" pt="Checklist final" color="amber"><div className="space-y-2 text-xs">{["Identify 3 more cases from Sessions 1–8 for Q1 (biggest gap)","Prepare for unknown Q4 (Five Levels + SPARK on unfamiliar scenario)","Write from memory: five levels + drivers + SPARK + competition types + HA sequence + ETA facts","Practice 3 mini-answers (one per question type)","Every answer: HOW? and WHY?"].map((c,i)=>(<div key={i} className="flex items-start gap-2"><div className="w-4 h-4 border-2 border-amber-400 rounded flex-shrink-0 mt-0.5"></div><span>{c}</span></div>))}</div></Card>
    <div className="bg-slate-100 rounded-lg p-4 text-center"><div className="font-bold text-slate-800 text-sm mb-1">The reflex to bring into the exam room:</div><div className="text-slate-700 text-sm"><strong>Identify the level → Identify the driver → Explain the mechanism → Judge the performance effect</strong></div><div className="text-xs text-slate-500 mt-1">Identifique o nível → Identifique o driver → Explique o mecanismo → Julgue o efeito no desempenho</div></div>
    <div className="mt-4 text-xs text-slate-400 text-center">All framework content verified against Ch.1–Ch.7, lecture notes, practice exam. Home Alone from Lecture Notes Ch.5 Part 1 slide 20. Interactive diagrams: Enright 2021. No external sources.</div>
  </div>);
}

const tabContent = {"Overview":Overview,"Five Levels":FiveLevels,"SPARK & Position":SparkPosition,"Industry":IndustryTab,"Meso/Cluster":MesoCluster,"Macro & Meta":MacroMeta,"Q2: VRIO/ARK":VrioArk,"Q3: ETA/Swatch":EtaSwatch,"Cram Sheet":CramSheet};

export default function App() {
  const [tab, setTab] = useState("Overview");
  const Content = tabContent[tab];
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 text-white px-4 py-3"><div className="text-lg font-bold">STRT 6200 Midterm Study Guide</div><div className="text-xs text-slate-400">Enhanced Edition · English - Português Brasileiro | Closed Book</div></div>
      <div className="overflow-x-auto border-b bg-slate-50"><div className="flex min-w-max">{tabs.map(t=>(<button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${tab===t?"border-blue-600 text-blue-700 bg-white":"border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}>{t}</button>))}</div></div>
      <div className="p-4 max-w-3xl mx-auto"><Content /></div>
    </div>
  );
}
