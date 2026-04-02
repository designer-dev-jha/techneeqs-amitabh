    const canvas = document.getElementById('globeCanvas');
    const ctx = canvas.getContext('2d');
    let W,H,cx,cy,R,angle=0;
    const POINTS=180, pts=[];

    function resize(){
    W=canvas.offsetWidth; H=canvas.offsetHeight;
    canvas.width=W; canvas.height=H;
    cx=W*0.78; cy=H*0.5; R=Math.min(W,H)*0.42;
    }

    function init(){
    pts.length=0;
    for(let i=0;i<POINTS;i++){
        pts.push({phi:Math.acos(1-2*(i+0.5)/POINTS), theta:Math.PI*(1+Math.sqrt(5))*i});
    }
    }

    function proj(phi,theta,rot){
    const t=theta+rot, x=Math.sin(phi)*Math.cos(t), y=Math.cos(phi), z=Math.sin(phi)*Math.sin(t);
    return{x:cx+R*x, y:cy-R*y, z};
    }

    function draw(){
    ctx.clearRect(0,0,W,H);
    angle+=0.003;
    const p=pts.map(pt=>proj(pt.phi,pt.theta,angle));
    for(let i=0;i<p.length;i++){
        for(let j=i+1;j<p.length;j++){
        const a=p[i],b=p[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<R*0.38){
            const al=(1-d/(R*0.38))*0.55, fr=(a.z+b.z)/2>0?1:0.35;
            ctx.strokeStyle=`rgba(255,255,255,${al*fr})`;
            ctx.lineWidth=0.6;
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
        }
    }
    p.forEach(pt=>{
        ctx.fillStyle=`rgba(255,255,255,${pt.z>0?0.9:0.35})`;
        ctx.beginPath();ctx.arc(pt.x,pt.y,pt.z>0?2.2:1.2,0,Math.PI*2);ctx.fill();
    });
    requestAnimationFrame(draw);
    }

    resize(); init(); draw();
    window.addEventListener('resize',()=>{resize();});