// Gera somente assets nativos a partir de SVG local; sem rede, conta Expo ou imagens remotas.
const fs=require('node:fs');const path=require('node:path');const sharp=require('sharp');
(async()=>{
  const dir=path.join(__dirname,'..','assets');
  const source=fs.readFileSync(path.join(dir,'astro-icon.svg'),'utf8');
  const transparent=source.replace(/<rect id="background"[^>]*\/>/,'');
  await sharp(Buffer.from(source)).resize(1024,1024).png().toFile(path.join(dir,'icon.png'));
  await sharp(Buffer.from(transparent)).resize(1024,1024).png().toFile(path.join(dir,'adaptive-icon.png'));
  await sharp(Buffer.from(transparent)).resize(512,512).png().toFile(path.join(dir,'splash-icon.png'));
  for(const name of ['icon.png','adaptive-icon.png','splash-icon.png']){
    const data=fs.readFileSync(path.join(dir,name));
    if(data.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG inválido: '+name);
    console.log('Asset gerado: '+name+' ('+data.length+' bytes)');
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
