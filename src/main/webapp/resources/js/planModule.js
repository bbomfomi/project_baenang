let PlanModule = ( ()=>{
	var map;
	
    function myplan(){
		$.ajax({
			type :'get',
			dataType :'json',
			url : 'myplan?p_id=1',//p_id=1 1대신에 변수로 p_id값을 받는걸로대체
			cache: false,
			processData : true,
			success : function(response) {
				var vo=response.vo;
				//플랜아이디로 받아온 플랜정보를vo로 받고 처리할부분
			},
			error : function(err) {
				alert('error: ' + err.status);
			}

		})		
	}

	function memberplan(){
		$.ajax({
			type :'get',
			dataType :'json',
			url : 'memberplan?m_id=1',//p_id=1 1대신에 변수로 p_id값을 받는걸로대체
			cache: false,
			processData : true,
			success : function(response) {
				var lvo=response.lvo;
				
				
			},
			error : function(err) {
				alert('error: ' + err.status);
			}

		})
		
	}
    
	function saveP(){
		$.ajax({
			type :'post',
			contentType:'application/json',
			dataType :'text',
			url : 'plan',
			data:JSON.stringify({
				 p_id: p_id,
	             m_id: m_id,
	             p_name: p_name,
	             p_birth: p_birth,
	             p_moddate: p_moddate
			}),
			cache: false,
			processData : true,
			success : function(response) {
				alert(response);
			},
			error : function(err) {
				alert('error: ' + err.status);
			}

		})
		
	}

    function tour(lat, len) {
		let x = lat;
		let y = len;

		$.ajax({
			type : 'get',
			dataType : 'json',
			url : 'tour?x=' + x + '&y=' + y,
			cache : false,
			processData : true,
			success : function(res) {
			
			displayTourInformation(res.contentList,x,y);
			
			},
			error : function(err) {
				alert('error: ' + err.status);
			}
		})
	}

    function displayTourInformation(contentList,x,y) {
		var tcontainer = $('.places-container'); // 새로운 container 추가
		//var container = document.getElementById('travels-container');
		// 기존 내용 비우기
		tcontainer.empty();
		map=new naver.maps.Map('map',{
		center:new naver.maps.LatLng(y,x),
		zoom:8
		});
		// 최대 10개까지만 표시
		for (var i = 0; i < Math.min(contentList.length, 10); i++) {

			var content = contentList[i];
			var contentid=content.contentid;
			
			// 새로운 div 동적으로 생성
			/* var newDiv = $('<div>').addClass('traveld').attr('id', 'content' + i).click(function() {
	        copyDiv('content' + i);
	    	}); */
	    
			var placeDiv = ViewPageModule.createPlaceDiv();
			
	    	$('.place-image').attr('id', 'img'+contentid);
			$('.place-img').attr('src',content.firstimage || '/resources/images/noimage.PNG');

	    	$('.place-details').attr('id', 'text' + contentid);
			$('.place-title').text('Name: ' + content.title);
			$('.place-cat').text("카테고리");
			$('.place-addr').text('Location: ' + content.addr);
			
			
			tcontainer.append(placeDiv);
			
			 var marker = new naver.maps.Marker({
		            position: new naver.maps.LatLng(content.mapy, content.mapx),
		            map: map
		        });
			
		        // 클로저를 사용하여 정보창 내용 설정
		        (function (marker, title,firstimage) {
		            var infoWindow = new naver.maps.InfoWindow({
		              content: '<div style="width:150px; text-align:center; padding:10px;"><b>' + title + '</b>.<br><img src="' + firstimage + '"></div>'
		            });

		            naver.maps.Event.addListener(marker, 'click', function () {
		                infoWindow.open(map, marker,firstimage);
		            });
		        })(marker, content.title,content.firstimage);

		}
	
		// 추가로 필요한 정보는 여기에 계속 추가할 수 있습니다.
	}
	
    function createDiv(contentid) {
            var newDiv = $('<div>').addClass('traveld').attr('id', contentid).click(function() {
                copyDiv(contentid);
                
            });


            // 생성된 div들을 어딘가에 추가하거나 반환할 수 있음
            return newDiv;
    } 

    function copyDiv(sourceDivId) {
        var id=sourceDivId;
        // 클릭된 div의 내용을 가져오기	    
        var sourceDiv = document.getElementById(id);
        var divText = sourceDiv.innerHTML.trim();
        
        // selected-container 요소 찾기
        var targetDiv = document.getElementById('selected-container');
        
        // 내용이 있는 경우에만 실행
        if (divText !== "") {
            // selected-container가 없을 경우
            if (!targetDiv) {
                // 새로운 div 생성
                var newDiv = document.createElement('div');
                newDiv.id = 'selected-container';

                var selectedDiv = document.createElement('div');
                selectedDiv.className = 'selected';
                selectedDiv.innerHTML = divText;

                // 생성된 div를 특정 위치에 추가 (예: 다른 div의 하위로)
                var destinationContainer = document.getElementById("wrapcontainer");
                var mapw=document.getElementById("map");
                mapw.parentNode.insertBefore(newDiv, mapw);
                //destinationContainer.appendChild(newDiv);
                //container.append($(newDiv));
                newDiv.appendChild(selectedDiv);
            } else {
                // 이미 존재하는 selected-container에 내용 추가
                var selectedDiv = document.createElement('div');
                selectedDiv.className = 'selected';
                selectedDiv.innerHTML = divText;

                // 생성된 div를 특정 위치에 추가 (예: 다른 div의 하위로)
                targetDiv.appendChild(selectedDiv);
            }
        }
    }

    function removeDiv() {
        var Div=document.getElementById("selected-container");
        var parent = Div.parentNode;
        
        if (parent) {
            parent.removeChild(Div);
        }
    }
	//호텔
    function displayLodgingInformation(contentList,x,y) {
		var tcontainer = $('#hotels'); // 새로운 container 추가
		//var container = document.getElementById('travels-container');
		// 기존 내용 비우기
		tcontainer.empty();
		map=new naver.maps.Map('map',{
		center:new naver.maps.LatLng(y,x),
		zoom:15
		});
		// 최대 10개까지만 표시
		for (var i = 0; i < Math.min(contentList.length, 10); i++) {

			var content = contentList[i];
			var contentid=content.contentid;
			var newDiv=createDiv(contentid);
			// 새로운 div 동적으로 생성
			/* var newDiv = $('<div>').addClass('traveld').attr('id', 'content' + i).click(function() {
	        copyDiv('content' + i);
	    	}); */
	    
			var placeDiv = ViewPageModule.createPlaceDiv();
			
	    	$('.place-image').attr('id', 'img'+contentid);
			$('.place-img').attr('src',content.firstimage || '/resources/images/noimage.PNG');

	    	$('.place-details').attr('id', 'text' + contentid);
			$('.place-title').text('Name: ' + content.title);
			$('.place-cat').text("카테고리");
			$('.place-addr').text('Location: ' + content.addr);
	    	
			tcontainer.append(placeDiv);
			
			 var marker = new naver.maps.Marker({
		            position: new naver.maps.LatLng(content.mapy, content.mapx),
		            map: map,
		            icon:{url:'/resources/img/marker/캡처.PNG'}
		        });
		        // 클로저를 사용하여 정보창 내용 설정
		        (function (marker, title) {
		            var infoWindow = new naver.maps.InfoWindow({
		                content: '<div style="width:150px;text-align:center;padding:10px;"><b>"' + title + '"</b>.<br><img src="'+img+'" style="width:100px; text-align:center;"></div>'
		            });

		            naver.maps.Event.addListener(marker, 'click', function () {
		                infoWindow.open(map, marker);
		            });
		        })(marker, content.title);
		       
		
		}

		// 추가로 필요한 정보는 여기에 계속 추가할 수 있습니다.
	}

	//맵모듈
	function handleEnterKey(event) {
		if (event.key === "Enter") {
			submitForm(); // 엔터 키를 눌렀을 때 submitForm 함수 호출
		}
	}

	// 폼 제출 함수
	function submitForm() {
		
		var inputValue = document.querySelector('input[type="text"]').value;
		$.ajax({
			type : 'get',
			dataType : 'json',
			url : 'search?addr=' + inputValue,
			cache : false,
			processData : true,
			success : function(res) {
				PlanModule.tour(res.x, res.y);
				x=res.x;
				y=res.y;
			},
			error : function(err) {
				alert('error: ' + err.status);
			}

		})

	}	
	
	function lodging(lat, len) {
		
		var ctype="32";

		$.ajax({
			type : 'get',
			dataType : 'json',
			url : 'tour?x=' + x + '&y=' + y + '&ctype=' +ctype,
			cache : false,
			processData : true,
			success : function(res) {
				PlanModule.displayLodgingInformation(res.contentList,x,y);

			},
			error : function(err) {
				alert('error: ' + err.status);
			}
		})
	}
	function restaurant(){
		var cat="A05020100";
		$.ajax({
			type : 'get',
			dataType : 'json',
			url : 'tour?x=' + x + '&y=' + y + '&cat=' +cat,
			cache : false,
			processData : true,
			success : function(res) {
				PlanModule.displayTourInformation(res.contentList,x,y);

			},
			error : function(err) {
				alert('error: ' + err.status);
			}
		})
	}
	function cafe(){
		var cat="A05020900";
		$.ajax({
			type :'get',
			dataType : 'json',
			url : 'tour?x=' + x + '&y=' + y + '&cat='+cat,
			cache : false,
			processData : true,
			success : function(res) {
				PlanModule.displayTourInformation(res.contentList,x,y);

			},
			error : function(err) {
				alert('error: ' + err.status);
			}
		})
		
	}
	function attraction(){
		var ctype="12";
		$.ajax({
			type : 'get',
			dataType : 'json',
			url : 'tour?x=' + x + '&y=' + y+'&ctype='+ctype,
			cache : false,
			processData : true,
			success : function(res) {
				PlanModule.displayTourInformation(res.contentList,x,y);

			},
			error : function(err) {
				alert('error: ' + err.status);
			}
		})
		
	}

    return {
        myplan : myplan,
        memberplan : memberplan,
        saveP : saveP,
        tour : tour,
        displayTourInformation : displayTourInformation,
        createDiv : createDiv,
        copyDiv : copyDiv,
        removeDiv : removeDiv,
        displayLodgingInformation:displayLodgingInformation,
		lodging : lodging,
		restaurant : restaurant,
		cafe : cafe,
		attraction : attraction
    };
})();