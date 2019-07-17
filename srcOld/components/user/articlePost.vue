<template>
<div class="main jy_all_top jy_art">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right" @click.stop="postArt">发布</a><p>发布头条</p>
		</div>
	</div>
	<div class="jy_art_tit">
		<input type="text" v-model="title" placeholder="请输入文章标题">
	</div>
	<div class="jy_art_content">
		<!--<div class="jy_art_textarea" contenteditable=true><img src="@images/e1.jpg"></div>
		<textarea placeholder="请输入文章内容"><img src="@images/e1.jpg"></textarea>-->
		<quill-editor autofocus v-model="quillHtml" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"> </quill-editor>
	</div>
	<div class="jy_art_menu">
		<selectPhoto :cutting="false" @fileBack="fileBack">
		 <a class="jy_art_addImg iconfont">&#xe663;</a>
		</selectPhoto>
	</div>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import selectPhoto from '../plugs/selectPhoto'

import Vue from 'vue';
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(vueQuillEditor)

export default {
	name: 'articlePost',
	data () {
		return {
			isloading:false,
			quillHtml:'',
			title:'',
			img:'',
			editorOption:{
				placeholder:"请输入文章内容",
				modules:{
					toolbar:[
					 // ['image'],
					]
				}
			}
		}
	},
	mounted () {
		const t=this;
		$("body").addClass("fullscreen");

	},
	destroyed () {
		$("body").removeClass("fullscreen");
	},
	components: {
		Loading,
		Back,
		selectPhoto,
	},
	methods:{
		onEditorBlur(e){
			const t=this;
			//console.log("onEditorBlur")
		},
		onEditorFocus(e){
			const t=this;
			//console.log("onEditorFocus")
		},
		onEditorChange(e){
			const t=this;
			//console.log("onEditorChange")
			//console.log(t.quillHtml)
		},
		getBase64(file,callback){
			const t=this;
            let maxWidth = 1280;  
			/*if(file.size>t.$store.state.imgMaxSize){  
				// mualert.alertBox("图片不能超过800K");  
				t.$vux.toast.show({
					type:"cancel",
					text: t.$t('comment.maxSize'),
					position:"middle",
					width:"2rem",
				});
				return  
			};  */
			let reader = new FileReader();  
			reader.onload = function(event){
				let imgUrl = event.target.result;  
				let img = new Image();  
				img.onload = function(){
					let canvasId = 'canvasBase64Imgid',  
						canvas = document.getElementById(canvasId);  
					if(canvas!=null){document.body.removeChild(canvas);}  
					canvas = document.createElement("canvas");  
					canvas.innerHTML = 'New Canvas';  
					canvas.setAttribute("id", canvasId);  
					canvas.style.display='none';  
					document.body.appendChild(canvas);  
					canvas.width = this.width;  
					canvas.height = this.height;  
					let imageWidth = this.width,   
					imageHeight = this.height;  
					if (this.width > maxWidth){  
						imageWidth = maxWidth;  
						imageHeight = this.height * maxWidth/this.width;  
						canvas.width = imageWidth;  
						canvas.height = imageHeight;  
					}  
					let context = canvas.getContext('2d');  
					context.clearRect(0, 0, imageWidth, imageHeight);  
					context.drawImage(this, 0, 0, imageWidth, imageHeight);  
					let base64 = canvas.toDataURL('image/jpeg',0.7);  
					//let imgbase = base64.substr(22);  
					callback(base64);
					img.onload=null;
					//this.imgUrl =   
				}  
				img.src = imgUrl;  
			}  
			reader.readAsDataURL(file);  
        },
		async postArt(){
			const t=this;
			t.isloading=true;
			const imgReg = /<img.*?(?:>|\/>)/gi;
			const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			const arr = t.quillHtml.match(imgReg);
			if(arr){
				t.img=arr[0].match(srcReg);
				t.img=t.img[1]&&t.img[1].replace(new RegExp(t.$store.state.imageUrl, 'g'), "");
			}
			try{
				
				const result = await t.$server.postArt({
					title:t.title,
					content:t.quillHtml.replace(new RegExp(t.$store.state.imageUrl, 'g'), ""),
					cover:t.img
				});
				t.$vux.toast.show({
					type:"success",
					text: result.data.message,
					position:"middle",
					width:"2rem",
				});
				t.$router.replace({name:"headline"});
			}catch(e){
				console.log(e);
				/*t.$vux.toast.show({
					type:"cancel",
					text: result.data.message,
					position:"middle",
					width:"2rem",
				});*/
			}
			t.isloading=false;
		},
		async fileBack (obj) {
			const t = this
			t.file = obj.file[0]//提交的图片
			if(t.file){
				console.log("图片大小:"+(t.file.size/1024)+"KB");
				if(t.file.size>1024*1024){  //大于1M进行再压缩
					t.getBase64(t.file,async (base64Codes)=>{
						//t.imgDataUrl.push('data:image/png;base64,'+url);   //显示的图片
						let file=t.convertBase64UrlToBlob(base64Codes);
						let param = new FormData() //创建form对象
						param.append('file', file, t.file.name) //单个图片 ，多个用循环 append 添加
						//console.log("上传图片");
						const result = await t.$server.uploadPic(param);
						if(result.data.status==1){
							let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
							if(!t.img){
								t.img=result.data.data.path;
							}
							t.$refs.myQuillEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
						}
					});
				}else{
					let param = new FormData() //创建form对象
					param.append('file', t.file, t.file.name) //单个图片 ，多个用循环 append 添加
					//console.log("上传图片");
					const result = await t.$server.uploadPic(param);
					if(result.data.status==1){
						let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
						if(!t.img){
							t.img=result.data.data.path;
						}
						t.$refs.myQuillEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
					}
				}
			}else{
				t.$vux.toast.show({
					type:"text",
					text: "图片出错",
					position:"bottom",
					width:"2rem",
				});
			}
		},
		convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
		getCursorPosition(elem){//获取光标所在位置
			if(window.getSelection){ 
				return elem.selectionStart; 
			}else if(document.selection){ 
				elem.focus(); 
				var range = document.selection.createTextRange(); 
				range.moveStart('character',-elem.value.length); 
				return range.text.length; 
			} 
			return elem.value.length; 
		},
		setCursorPosition(elem, position){ 
			if(window.getSelection){ 
				elem.focus(); 
				elem.setSelectionRange(position,position); 
			}else if(document.selection){ 
				var range = elem.createTextRange(); 
				range.collapse(true); 
				range.moveEnd('character',position); 
				range.moveStart('character',position); 
				range.select(); 
			} 
		} 
	}
}
</script>
