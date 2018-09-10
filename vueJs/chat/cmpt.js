Vue.component('vInput' ,{
    props: {
        value: {
            type : [String, Number] , 
            default: '' 
        }
    },
    render: function (h) {
        var _this = this; 
        return h('div' ,[
            h('span',' 昵称 '), 
            h('input', {
                attrs: { type:'text'},
                domProps: { 
                    value: this.value
                },
                on:{
                    input: function (event) {
                        _this.value = event.target.value; 
                        _this.$emit ('input' , event.target.value); 
                    }
                }
            })]);
    },
    watch:{
        value:(val)=>{
            console.log(val)
        }
    }
})

Vue.component ('vTextarea',{
    props : {
        value:{
            type: String, 
            default:''
        }
    }, 
    render: function (h){
        var _this = this; 
        return h('div' , [
            h('span','留言内容：'), 
            h('textarea', {
                attrs: { placeholder:'请输入留言内容'},
                domProps: { value: this.value},
                ref: 'message', 
                on: {
                    input: function(event){
                        _this.value = event.target.value;
                        _this.$emit ('input', event.target.value) ; 
                    }
                }
            })
        ])
    },
    methods: {
        focus: function () {
            this.$refs.message.focus();
        } 
    }
})

Vue.component('list',{
        props:{
            list:{
                type:Array,
                default:function(){
                    return [];
                }
            }
        },
        render:function(h){
            var _this = this;
            var list = [];
            this.list.forEach(
                function(msg,index){
                    var node = h('div',{
                        attrs:{
                            class:'list-item'
                        }
                    },[
                        h('span',msg.name+':'),
                        h('div',{
                            attrs:{ class:'list-msg'}
                        },
                            [   h('p',msg.message),
                                h('a',{
                                    attrs:{
                                        class:'list-reply'
                                    },
                                    on:{
                                        click:function(){
                                            _this.handleReply(index);
                                        }
                                    }
                                },'回复')
                            ])
                    ]);
                    list.push(node);
                }
            );
            if(this.list.length){
                return h('div',{
                    attrs:{
                        class:'list'
                    }
                },list)
            }else{
                return h('div',{
                    attrs:{
                        class:'list-nothing'
                    }
                },'留言列表为空')
            }
        },
        methods:{
            handleReply:function(index){
                this.$emit('reply',index);
            }
        }
})