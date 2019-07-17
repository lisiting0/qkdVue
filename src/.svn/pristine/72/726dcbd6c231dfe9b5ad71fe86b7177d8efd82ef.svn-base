<template>
        <textarea :id="id" :value="value"></textarea>
</template>
<script>
    // Import TinyMCE
	import tinymce from 'tinymce/tinymce'
	import 'tinymce/themes/modern/theme'
    const INIT = 0;
    const CHANGED = 2;
    var EDITOR = null;
    export default {
        props: {
            value: {
                type: String,
                required: true
            },
            setting: {}
        },
        watch: {
            value: function (val) {
                if (this.status == INIT || tinymce.activeEditor.getContent() != val){
                    tinymce.activeEditor.setContent(val);
                }
                this.status = CHANGED
            }
        },
        data: function () {
            return {
                status: INIT,
                id: 'editor-'+new Date().getMilliseconds(),
            }
        },
        methods: {
        },
        mounted: function () {
            const _this = this;
            const setting ={
                    selector:'#'+_this.id,
                    language:"zh_CN",
					language_url: '/static/tinymce/zh_CN.js',
					skin_url: '/static/tinymce/skins/lightgray',
					toolbar:'mybutton',
					plugins: '',
					menubar:false,
					group:false,
					resize: false,
					setup: function (editor) {
						editor.addButton('mybutton', {
							text: '',
							icon: false,
							onclick: function () {
								editorObj=editor;
								$(".shade").trigger("click")
							}
						});
					}
                };
            Object.assign(setting,_this.setting)
            tinymce.init(setting);
        },
        beforeDestroy: function () {
            tinymce.get(this.id).destroy();
        }
    }
    
</script>