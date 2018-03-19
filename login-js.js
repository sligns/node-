$(function(){
	
	if(sessionStorage.key(0)!=null){
		$.ajax({   		
    		url:'http://localhost:8000/go/userDetail',
    		type:'post',
    		data:{
    			uid:sessionStorage.key(0)
    		},
    		success:function(da){
    			console.log(da)
    			$('#login-mt').modal('hide')
				$('#log-but-but').hide()
				$('#zc-but-but').hide()
				$('.fbwz-show').show()
				$('.fbwz-show h4>small').text(da[0].name)
				$('#xg-img-src').attr('src',da[0].imgurl)
				nichengname=da[0].name
				aptouxiang=da[0].imgurl 
				useruid=da[0].uid
    		},
    		error:function(da){

    		}
    	})	
	}
    

	//头像---注册时的头像
	var zcimgsrc=null
	$('#zc-file-img').on({change:function(){ 
		var Fom = new FormData();
		Fom.append('audio',this.files[0])
	    console.log(this.files[0])
        $.ajax({
			url:'http://localhost:8000/go/img',
		    type:'POST',
			data:Fom,
			contentType:false,
		    processData:false,
			success:function(e){
				console.log(e)
				zcimgsrc=e
				$('#zc-show-img').attr('src',e)
			}
		})
	}})
	$('#sex-form input').click(function(){
		$('#sp-sex-vl').text($(this).val())
	})
	//上传用户信息
	$('#zc-info').click(function(){
		console.log($('#zc-user').val(),$('#zc-pass').val(),$('#zc-nicheng').val(),zcimgsrc,$('#sp-sex-vl').text(),$('#zc-qq').val(),$('#zc-email').val(),$('#zc-name').val())
		$.ajax({
			type:"post",
			url:"http://localhost:8000/go/join",
			data:{
				user:$('#zc-user').val(),
				pass:$('#zc-pass').val(),
				name:$('#zc-nicheng').val(),
				imgurls:zcimgsrc,
				sex:$('#sp-sex-vl').text(),
				qq:$('#zc-qq').val(),
				email:$('#zc-email').val(),
				zname:$('#zc-name').val()
			},
			success:function(e){
				console.log(e)
				
				if(e=="用户名存在"){
					alert("用户名存在")
				}else{
					alert("注册成功")
					$('#zhuce-mt').modal('hide')
				}
				
			}
		});
	})
	
	//登录 
	$('.fbwz-show').hide()
	//获取当前的一个昵称 
	var nichengname=null
	var aptouxiang=null 
	var useruid=null 
	var qqq=document.cookie.match().input
	var arrjd={qqq}
	console.log(arrjd)
	setTimeout(function(){
//		$('#log-user').val(document.cookie.split(';')[1].split('=')[1])
//  	$('#log-pass').val(document.cookie.split(';')[2].split('=')[1])
		$('#log-user').val(arrjd.qqq.split(';')[0].split('=')[1])
    	$('#log-pass').val(arrjd.qqq.split(';')[1].split('=')[1])
	},100)
	$('#log-but').click(function(){
		console.log($('#log-user').val(),$('#log-pass').val())
		if($('#jz-checkbox').is(':checked')){
			alert('您选择了记住密码')
	    		$.ajax({
		 			url:'http://localhost:8000/go/loginMe',
		 			type:'post',
				 	data:{
				 		user:$('#log-user').val(),
						pass:$('#log-pass').val()
				 	},
				 	success:function(da){
				 		console.log(da)
				 		if(da.msg=='登陆成功'){
				 			var op=da.jd[0].pass
				 			$('#login-mt').modal('hide')
							$('#log-but-but').hide()
							$('#zc-but-but').hide()
							$('.fbwz-show').show()
							$('.fbwz-show h4>small').text(da.jd[0].name)
							$('#xg-img-src').attr('src',da.jd[0].imgurl)
							nichengname=da.jd[0].name
							aptouxiang=da.jd[0].imgurl 
							useruid=da.jd[0].uid
							sessionStorage.setItem(da.jd[0].uid,'0');
						
				 		}
					 }
	 			})	
			}else{
				$.ajax({
					type:"post",
					url:"http://localhost:8000/go/login",
					data:{
						user:$('#log-user').val(),
						pass:$('#log-pass').val()
					},
					success:function(e){
						console.log(e)
						alert("您没有选择记住密码")
						if(e.ok){
							alert(e.msg)
							console.log(e)
							var op=e.jd[0].pass
							$('#login-mt').modal('hide')
							$('#log-but-but').hide()
							$('#zc-but-but').hide()
							$('.fbwz-show').show()
							$('.fbwz-show h4>small').text(e.jd[0].name)
							$('#xg-img-src').attr('src',e.jd[0].imgurl)
							nichengname=e.jd[0].name
							aptouxiang=e.jd[0].imgurl 
							useruid=e.jd[0].uid
							sessionStorage.setItem(e.jd[0].uid,'0');
						
							
//							document.cookie =document.cookie.match().input=null
						}else{
							alert(e.msg)
						}
					}
				});
			}
		})
	
//	$('#log-but').click(function(){
//		
//	})
	
	
	
	
	
	
	
	
	
	
	
	//姓名的正则
	$("#zc-name").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-name').val().match( /^[\u4E00-\u9FA5A-Za-z]+$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-name').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	//qq的正则
	$("#zc-qq").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-qq').val().match(/^[1-9][0-9]{5,9}$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-qq').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	//邮政的正则
	$("#zc-email").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-email').val().match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-email').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	//qq昵称的正则
	$("#zc-nicheng").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-nicheng').val().match(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-nicheng').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	// //用户名的正则--0-9至少是5位到9位
	$("#zc-user").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-user').val().match(/^[0-9a-zA-Z]{1,16}$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-pass').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	
	//密码的正则
	$("#zc-pass").bind('input porpertychange',function(){
		var regex = "[1-9][0-9]{4,14}"
		$(this).removeClass('bg-success')
		$(this).removeClass('bg-danger')
		if($('#zc-pass').val().match(/^[0-9a-zA-Z]{1,16}$/)){
			console.log('输入正确')
			$(this).addClass('bg-success')
		}else if($('#zc-pass').val()==""){
			$(this).removeClass('bg-success')
			$(this).removeClass('bg-danger')
		}else{
			console.log("输入错误")
			$(this).addClass('bg-danger')
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	//发布文章
	
	$('#fbwz-con-but').click(function(){
		var myDate = new Date();
		console.log(nichengname)
		$.ajax({
			type:"post",
			url:"http://localhost:8000/go/textJoin",
			data:{
				title:$('#fb-wz-val').val(),
				context:$('#fb-wz-con-val').val(),
				tname:nichengname,
				tnum:0,
				time:myDate.toLocaleString(),
				imgurl:aptouxiang,
				nsuid:useruid
			},
			success:function(e){
				console.log(e)
				if(e=="ok"){
					alert("文章发布成功")
					$('#fb-mt').modal('hide')
					apshuju()
					$.ajax({
			url:"http://localhost:8000/go/list",
			type:"post",
			data:{

			},
			success:function(da){
				arrs = da
				console.log(arrs) 
				var str=''
				for(var i = 0; i < Math.ceil(da.length / 9); i++) {         
					str += '<a href="#">' + (i + 1) + '</a>'
				}
				ul2.innerHTML = str
				newR(0,9,arrs)
						 
			},   
			error:function(da){
				console.log(da)
			}
		})
				}else{
					alert("请检查您要发布的内容")
				}
			}
		});
	})
	
	
	//封装初始数据
	function apshuju(){
		$.ajax({
			type:"post",
			url:"http://localhost:8000/go/list",
			success:function(da){
				arrs = da
				console.log(arrs) 
				var str=''
				for(var i = 0; i < Math.ceil(da.length / 9); i++) {         
					str += '<a href="#">' + (i + 1) + '</a>'
				}
				ul2.innerHTML = str
				newR(0,9,arrs)
			}
		});
	}
//	apshuju()
	
	//搜索框
	$('#inp-sousuo').change(function(){
		$.ajax({
			type:"post",
			url:"http://localhost:8000/go/sList",
			data:{
				listname:$('#inp-sousuo').val()
			},
			success:function(da){
				console.log(da)
						arrs = da
				console.log(arrs) 
				var str=''
				for(var i = 0; i < Math.ceil(da.length / 9); i++) {         
					str += '<a href="#">' + (i + 1) + '</a>'
				}
				ul2.innerHTML = str
				newR(0,9,arrs)

					
			}
		});
	})
	
	//记住密码
//	$('#jz-checkbox').change(function(){
//		$.ajax({
//			type:"post",
//			url:"http://localhost:8000/go/loginMe",
//			data:{
//				user:$('#log-user').val(),
//				pass:$('#log-pass').val()
//			},
//			success:function(e){
////				if($('#jz-checkbox').is(':checked')){
////					alert(e.)
////				}else{
////					
////				}
//			}
//		});
//	})
	
	
	
	//翻页
	
	
	var arrs = []
	var num = 0

		$.ajax({
			url:"http://localhost:8000/go/list",
			type:"post",
			data:{

			},
			success:function(da){
				arrs = da
				console.log(arrs) 
				var str=''
				for(var i = 0; i < Math.ceil(da.length / 9); i++) {         
					str += '<a href="#">' + (i + 1) + '</a>'
				}
				ul2.innerHTML = str
				newR(0,9,arrs)
						 
			},   
			error:function(da){
				console.log(da)
			}
		})
	
	
	$('#ul2').delegate('a','click',function(){ 
		var aval=$(this).text()
		console.log(Number(aval))
		dian(Number(aval)-1)
	})
	
	
	
	function dian(a) { 
		console.log(a)
	        num = a
	        newR(a,9,arrs)
		}  
		//上
	function dianTop(){
	    num --
	    if(num == -1){
	        num = 0
	        alert('这里是第一页')
	    }
	    newR(num,9,arrs)
	} 
	//后
	function dianButton(){
	    num ++
	    if(num == Math.ceil(arrs.length / 9)){
	        num = Math.ceil(arrs.length / 9)-1
	        alert('这里是最后一页')
	    }
	    newR(num,9,arrs)
	}
	function newR(a,b,c){
	   	  var newArr = c.slice(a*b,a*b+b)
//	  nichengname,aptouxiang
	   	  var newStr = '' 
	   	  
	   	   for(var i=0;i<newArr.length;i++){
							newStr+=`
								<tr> 
									<td><a href="http://localhost:8000/html/look.html?uid=${newArr[i].uid}">${newArr[i].title}</a></td>
									<td><a href="http://localhost:8000/html/detail.html?uid=${newArr[i].nuid}">${newArr[i].name}</a></td>
									<td>${newArr[i].time}</td>
									<td>${newArr[i].num}</td>
								</tr>
							`
						}
	   	   
	   	   
	   	   $('#ap-wz-context').html(newStr)
	   }
	
	
	
	
	
	
	
	
	
	
	
	
	
})
