//Saudação sobre o horario
const greetingMessage = () => {
	let h = new Date().getHours();
	if (h <= 5) return 'boa madrugada';
	if (h < 12) return 'bom dia';
	if (h < 18) return 'boa tarde';
	return 'boa noite';
}
// Validar senha
function verificaForcaSenha() {
	var numeros = /([0-9])/;
	var alfabeto = /([a-zA-Z])/;
	var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<,.])/;

	if($('#TCadastroTxtSenha1').val().length<6){
		$('#TCadastroTxtStatus').html("<span id='TCadastroTxtStatus-fin' style='color:red'>Fraco, insira no mínimo 6 caracteres</span>");
		uValid="0";
	}else{  	
		if($('#TCadastroTxtSenha1').val().match(numeros) && $('#TCadastroTxtSenha1').val().match(alfabeto) && $('#TCadastroTxtSenha1').val().match(chEspeciais)){
			if($('#TCadastroTxtSenha1').val() == $('#TCadastroTxtSenha2').val()){
				$('#TCadastroTxtStatus').html("<span id='TCadastroTxtStatus-fin' style='color:black'><b>Forte</b></span>");
				uValid="1";
			}else{
				$('#TCadastroTxtStatus').html("<span id='TCadastroTxtStatus-fin' style='color:red'>Senhas não são iguais</span>");
				uValid="0";
			}
		}else{
			$('#TCadastroTxtStatus').html("<span id='TCadastroTxtStatus-fin' style='color:red'>Médio, insira um caracter especial</span>");
			uValid="0";
		}
	}
}
// variaveis
var iChat = 0;
var DivID = "TLoginBtnEntrar";
const TMenu = document.getElementById("TMenu");
const TLogin = document.getElementById("TLogin");
const TCadastro = document.getElementById("TCadastro");
const TSenha = document.getElementById("TSenha");
const TPerfil = document.getElementById("TPerfil");

const TLoginTxtEmail = document.getElementById("TLoginTxtEmail");
const TLoginTxtSenha = document.getElementById("TLoginTxtSenha");
const TCadastroTxtNome = document.getElementById("TCadastroTxtNome");
const TCadastroTxtEmail = document.getElementById("TCadastroTxtEmail");
const TCadastroTxtSenha1 = document.getElementById("TCadastroTxtSenha1");
const TCadastroTxtSenha2 = document.getElementById("TCadastroTxtSenha2");
const TSenhaTxtEmail = document.getElementById("TSenhaTxtEmail");

function limpar(){
	TLoginTxtEmail.value = "";
	TLoginTxtSenha.value = "";
	TCadastroTxtNome.value = "";
	TCadastroTxtEmail.value = "";
	TCadastroTxtSenha1.value = "";
	TCadastroTxtSenha2.value = "";
	TSenhaTxtEmail.value = "";
}
// ao apertar enter em uma tela
document.querySelector('body').addEventListener('keydown', function(event) {
    //alert("O código da tecla pressionada é : <br> <span>" + event.keyCode + "</span>");
    var tecla = event.keyCode;
    if(tecla == 13) {
		// tecla ENTER
		const div = document.getElementById(DivID);
		const display = window.getComputedStyle(div, null).display;
		if(display == "block"){
			if(document.getElementsByClassName("burger")[0].style.left == "200px"){
				if(DivID == "TLoginBtnEntrar"){
					return Entrar();
				}else if(DivID == "TLoginBtnCadastro"){
					return Cadastro();
				}else if(DivID == "TLoginBtnSenha"){
					return Senha();
				}else{
					alert("Não achei a tela");
				}
            }
		}
    }
	if (tecla == 27){
		// var dialog = confirm("Deseja realmente deslogar?");
		// if (dialog) {
    	// 	Sair();
		// }
		if(document.getElementsByClassName("burger")[0].style.left == "200px"){
			document.getElementById("burgerBtn").click();
			return limpar();
		}
	}
});
// telas
function Telas(botao) { 
	DivID = botao.id;
	if(DivID == "TBurgerBtnMenu"){
		if(TMenu.style.display == "none"){
			DivID = "TLoginBtnEntrar";
			TLogin.style.display="block";
			TCadastro.style.display="none";
			TSenha.style.display="none";
		}
	}else if(DivID == "TLoginBtnCadastro"){
		if(TMenu.style.display == "none"){
			DivID = "TLoginBtnCadastro";
			TLogin.style.display="none";
			TCadastro.style.display="block";
			TSenha.style.display="none";
		}
	}else if(DivID == "TLoginBtnSenha"){
		if(TMenu.style.display == "none"){
			DivID = "TLoginBtnSenha";
			TLogin.style.display="none";
			TCadastro.style.display="none";
			TSenha.style.display="block";
		}
	}else if(DivID == "TMenuBtnPerfil"){
		if(TMenu.style.display == "block"){
			DivID = "TMenuBtnPerfil";
			TPerfil.style.display="block";
		}else{
			TPerfil.style.display="none";
		}
	}else if(DivID == "TCadastroBtnCancelar"){
			DivID = "TLoginBtnEntrar";
			TLogin.style.display="block";
			TCadastro.style.display="none";
			TSenha.style.display="none";
	}else if(DivID == "TSenhaBtnCancelar"){
			DivID = "TLoginBtnEntrar";
			TLogin.style.display="block";
			TCadastro.style.display="none";
			TSenha.style.display="none";
	}else{
			alert("Erro ao procurar a tela");
		
	}
	return limpar();
};
// Bloquear botao ao clickar
var BtnBloqueado = 0;
function bloqueado(){
	alert("Mais me acelera, masi irei demorar - AGUARDE");
}
// verificar se está logado
var UID = "";  var UEmail = "";
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		TMenu.style.display="block";
		TLogin.style.display="none";
		TCadastro.style.display="none";
		TSenha.style.display="none";
		var user=firebase.auth().currentUser;
		if(user!=null){
			UID = firebase.auth().currentUser.uid;
			UEmail = user.email;
			document.getElementById("TPerfilTxtUID").innerHTML=UID;
			var firebaseref = firebase.database().ref(UID + "/perfil/nome");
			firebaseref.on('value', (snapshot) => {
				document.getElementById("TMenuTxtSaudacao").innerHTML="Olá" + "</br>" + greetingMessage() + "</br>"+ snapshot.val();
				document.getElementById("TPerfilTxtNome").innerHTML=snapshot.val();
				document.getElementById("usname").innerHTML=snapshot.val();
				Log = 1;
		})
			//document.getElementById("conteudo_UID").innerHTML=UID;
			document.getElementById("TPerfilTxtEmail").innerHTML=UEmail;
			// Puxar chat se estiver logado
			var ref = firebase.database().ref("chat/" + UID);
			ref.on("child_added" , function(data) {
				var nuna = data.val();
				tabl.innerHTML = document.getElementById("tabl").innerHTML + nuna.message;
				
				Euname = document.getElementById("usname").innerHTML
				if(nuna.de == UID){
					iChat = nuna.iChat;
					document.getElementById("iChat" + UID + iChat).style.color = "blue";
					alert(nuna.para);
					document.getElementById("iChat" + nuna.para + iChat).style.color = "red";
				}

			}, 

			function(error) {
				alert(error.code)
			});




		}
	}else{
		DivID = "TLoginBtnEntrar";
		TMenu.style.display="none";
		TLogin.style.display="block";
		TPerfil.style.display="none";
		Log = 0;
	}
});
//logar
function Entrar(){
	if(BtnBloqueado == 0){
		BtnBloqueado = 1;
		var uE=document.getElementById("TLoginTxtEmail").value;
		var uS=document.getElementById("TLoginTxtSenha").value;
		firebase.auth().signInWithEmailAndPassword(uE,uS).then(result => {
			alert("Entrou com sucesso");
	  	}).catch(error => {
			alert("Erro: " + error);
	  	});
		BtnBloqueado = 0;
	}else{
		return bloqueado();
	}
};
//deslogar
var Log = 0;
function Sair(){
	if(BtnBloqueado == 0){
		BtnBloqueado = 1;
		if (Log == 1){
			firebase.auth().signOut().then(result => {
				alert("Deslogado com sucesso");
			  }).catch(error => {
				alert("Erro: " + error);
			  });
		}else{
			alert("Você não está logado");
		}
		BtnBloqueado = 0;
	}else{
		return bloqueado();
	}
};
//cadastro
function Cadastro(){
	if(BtnBloqueado == 0){
		BtnBloqueado = 1;
		var uE=document.getElementById("TCadastroTxtEmail").value;
		var uS=document.getElementById("TCadastroTxtSenha1").value;
	
		var uN=document.getElementById("TCadastroTxtNome").value;
		var uStatus=document.getElementById("TCadastroTxtStatus").innerText;
		if (uN.length > 3){
			if (uStatus == "Forte"){
				firebase.auth().createUserWithEmailAndPassword(uE, uS).then(newUser => {
					var uE=document.getElementById("TCadastroTxtEmail").value;
					var uS=document.getElementById("TCadastroTxtSenha1").value;
					firebase.auth().signInWithEmailAndPassword(uE,uS).then(result => {
						UID = firebase.auth().currentUser.uid;
						var firebaseref = firebase.database().ref();
						firebaseref.child(UID + "/perfil/").set({
							UID: UID,
							nome: uN,
							email: uE
						}).then(result => {
							alert("Finalizado com sucesso.");
							TMenu.style.display="block";
							TLogin.style.display="none";
							TCadastro.style.display="none";
							TSenha.style.display="none";
						}).catch(error => {
							alert("Erro: " + error);
						});
					}).catch(error => {
						alert("Erro: " + error);
					});
				}).catch(function(error){
					var errorCode=error.code;
					var errorMessage=error.message;
					alert("Erro: "+errorMessage);
				});
			}else{
				alert("Erro no nivel da senha: " + uStatus);
			}
		}else{
			alert("Erro no nome");
		}
		BtnBloqueado = 0;
	}else{
		return bloqueado();
	}
};
//redefinir Senha
function Senha(){
	if(BtnBloqueado == 0){
		BtnBloqueado = 1;
		UEmail = document.getElementById("TSenhaTxtEmail").value;
		firebase.auth().sendPasswordResetEmail(UEmail).then(result => {
			alert("Enviado com sucesso");
		  })
		  .catch(error => {
			alert("Erro: " + error);
		  });
		  BtnBloqueado = 0;
	}else{
		return bloqueado();
	}
};
function adddados() {
	//adicionar dados
	var firebaseref = firebase.database().ref();
	firebaseref.child(UID + "/perfil/").set({
		UID: UID,
		nome: "Sami",
		email: UEmail
	}).catch(function(error){
		var errorCode=error.code;
		var errorMessage=error.message;
		window.alert("Erro: "+errorMessage);
	});
	return lerdados();
};
function lerdados(){
	// ler os dados
	var firebaseref = firebase.database().ref(UID + "/perfil/nome");
	firebaseref.on('value', (snapshot) => {
		document.getElementById("conteudo_nome").innerHTML = snapshot.val();
	}).catch(function(error){
		var errorCode=error.code;
		var errorMessage=error.message;
		window.alert("Erro: "+errorMessage);
	});
};

// abrir div telas
function tela_perfil(){
	//window.open('perfil.html', '_blank');
	document.getElementsByClassName("conteiner_perfil")[0].style.display="block";
	document.getElementsByClassName("perfil")[0].style.cursor="not-allowed";
};

function saveweb(){
	window.open('https://srvapp229.br-atacadao.corp/', '_blank');
};
function tplinux(){
	window.open('http://srvtpl229:8080/', '_blank');
};


//Chat
function yconl() {
	var Xmas95 = new Date(Date.now());
	var H = Xmas95.getHours();
	var M = Xmas95.getMinutes();
	var HM = H + ":" + M;
	if(M < 10){
		M = "0" + M;
	}
	if (umsg.value)
	 {
	//UID = "pQy3UfixSrSGX2PFp1Mer85OE063";
	iChat++;
	var uPsname = document.getElementById("uDtn").value;
	var Euname = document.getElementById("usname").innerText;
	var msg = "<div class=\"nm\"><b id='iChat" + UID + iChat +"'>" + Euname + "</b> : <br />" + umsg.value + "<a id='DTM'> " + H + ":" + M +" </a>  <br /></div>" ;
	//var uPsname = UID;
	document.getElementById("umsg").value = "" ;
	firebase.database().ref("chat/" + UID).push({ message: msg, de:UID, para:uPsname, iChat:iChat}).key;
	firebase.database().ref("chat/" + uPsname).push({ message: msg, de:UID, para:uPsname, iChat:iChat}).key;
	}
	};