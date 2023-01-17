// objects at one place to access
const obj={
   mId:document.querySelector("#my-id"),
   fId:document.querySelector("#f-id"),
   constBtn:document.querySelector("#conn"),
   msg:document.querySelector("#msg"),
   send:document.querySelector("#send"),
   Cdisplay:document.querySelector("main")
};

//peer js 

var conn = new Peer();
var Aconn=undefined;

//connection building

conn.on('open',(id)=>{
    obj.mId.value=id;
});

conn.on('connection',(NAConn)=>{
    if(Aconn!=undefined) Aconn.close();
    obj.fId.value=NAConn.peer;
    Aconn=NAConn;
    Aconn.on('data',displayFriendMsg);
});

//adding event listener on click to connect
obj.constBtn.addEventListener('click',()=>{
    if(obj.fId.value.length>0){
        if(Aconn!=undefined) Aconn.close();
        Aconn=conn.connect(obj.fId.value);
        Aconn.on('data',displayFriendMsg);
    } 
});

// event listener on send button on click to send data
obj.send.addEventListener('click',()=>{
    
        if(Aconn!=undefined){
            if(obj.msg.value.length>0){
                sendData(obj.msg.value);
                displayMyMsg();
                obj.msg.value="";
            }
        }
    
});

//function to display my msg

function displayMyMsg(){
  obj.Cdisplay.insertAdjacentHTML("beforeend",`
  <div class="my-msg">
                 <div>  
                    <div class="title">${obj.mId.value}</div>
                    <div class="content-msg">
                        ${obj.msg.value}
                    </div>
                 </div>
            </div>`)
};


//function to display friend msg
function displayFriendMsg(data){
   obj.Cdisplay.insertAdjacentHTML("beforeend",`
   <div class="friend-msg">
                 <div>
                    <div class="title">${obj.fId.value}</div>
                    <div class="content-msg">
                        ${data}
                    </div>
                 </div>
            </div>`)
};

function sendData(data){
    if(Aconn!=undefined){
        Aconn.send(data);
    }
};