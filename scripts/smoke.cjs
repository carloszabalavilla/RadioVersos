const assert=require('node:assert/strict');
const results=[];
async function request(url,method='GET',body,headers={}){
 const res=await fetch(url,{method,headers:body?{'Content-Type':'application/json',...headers}:headers,body:body?JSON.stringify(body):undefined,redirect:'manual',signal:AbortSignal.timeout(15000)});
 const text=await res.text();let data;try{data=JSON.parse(text);}catch{data=text;}
 assert(res.status<500,method+' '+url+' returned '+res.status);
 return {res,data};
}
async function radio(){
 const base='http://127.0.0.1:8084/app/backend/';
 async function call(file,entity,obj){
  const body=entity?new URLSearchParams({[entity]:JSON.stringify(obj)}):undefined;
  const r=await fetch(base+file,{method:body?'POST':'GET',body,signal:AbortSignal.timeout(10000)});let data=await r.json();
  assert.equal(r.status,200,file+' status');assert.equal(data.error,false,file+' error');return data.datos;
 }
 const name="Smoke O'Connor <b>&</b>";
 const a={nombre:name,genero:'Jazz',nacionalidad:'Ficticia',album:'Local',premio:'Ninguno',biografia:"Demo's biography"};
 await call('phpArtista/alta_artista.php','artista',a);
 const artist=(await call('phpArtista/listado_artistas.php')).find(x=>x.artist_name===name);assert(artist);a.id=Number(artist.artist_id);
 assert.deepEqual(await call('phpArtista/listado_artistas_canciones.php?idArtista='+a.id),[]);
 a.biografia='Edited biography';await call('phpArtista/editar_artista.php','artista',a);
 assert.equal((await call('phpArtista/buscar_artista.php?idartista='+a.id)).biography,a.biografia);
 const s={nombre:'Smoke song',duracion:'03:30',lanzamiento:'2026',album:'Local',letra:"Demo's lyric",url:'',artistaId:a.id};
 await call('phpCancion/alta_cancion.php','cancion',s);
 const song=(await call('phpArtista/listado_artistas_canciones.php?idArtista='+a.id))[0];s.id=Number(song.song_id);
 s.letra="Updated O'Connor lyric";await call('phpCancion/editar_cancion.php','cancion',s);
 assert.equal((await call('phpCancion/buscar_cancion.php?idCancion='+s.id)).lyric,s.letra);
 await call('phpCancion/borrar_cancion.php?idCancion='+s.id);
 await call('phpArtista/borrar_artista.php?idArtista='+a.id);
 const bad=await fetch(base+'phpArtista/buscar_artista.php?idartista=1%20OR%201=1');assert.equal(bad.status,400);
 results.push('RadioVersos: artistas/canciones CRUD, apóstrofes, letra, listas vacías e ID inválido correctos');
}

radio().then(()=>console.log(results.join("\n"))).catch(error=>{console.error(error.message);process.exitCode=1;});
