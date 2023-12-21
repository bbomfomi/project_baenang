<%@page import="org.apache.ibatis.reflection.SystemMetaObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.io.File" %>
<%@ page import="java.util.Arrays" %>

<!DOCTYPE html>
<html>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<!-- 외부 CSS 파일 참조 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main.css">

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script>

	$(document).ready(function() {
	    // 페이지 로드 시 초기 추천 기능 실행
	    rec();
	});
	
	function rec(){
		$.ajax({
			type:'get',
			dataType:'json',
			url:'rec',
			cache:false,
			processData:true,
			success:function(res){
				alert("최근 트렌드 관광지 추천 : "+res.title);
				$('#recommand').append(res.title);
			},
			error:function(err){
				alert('error: '+err.status);
			}
		})
	}
	
	function openPopup(cityId) {
	    // 팝업으로 띄울 페이지의 URL
        var popupUrl = "/city?cityId=" + cityId;

	    // 팝업 창 옵션 설정
	    var popupOption = "width=800, height=600, resizable=no, scrollbars=no, status=no;";

	    // 팝업 창 열기
	    window.open(popupUrl, "CitySearchPopup", popupOption);
	}
</script>
<head>
    <meta charset="UTF-8">
    <title>메인페이지</title>
<!--     <style>
        div{
        	border: 1px solid red;
        }
        body {
            font-family: Arial, sans-serif;
        }
        .navi {
            background-color: #f8f9fa;
            padding: 10px;
            text-align: center;
        }
        .navi a {
            margin-right: 10px;
            text-decoration: none;
            color: #007bff;
        }
        
        #search-container {
            text-align: center;
            margin-top: 50px;
        }
        #search-box {
            padding: 10px;
            width: 300px;
            font-size: 16px;
        }
        #search-button {
            padding: 10px;
            font-size: 16px;
        }
        #blog-container {
            margin-top: 20px;
        }
        img .item{
        		    /* 각각의 아이템 스타일 */
		    margin-right: 20px; /* 각 아이템 간격 설정 */
	        width: 200px; 
	        height: 200px;
        }
         .citiesImg{
	        width: 30%; /* 이미지가 부모 요소에 꽉 차게 됩니다. */
	        height: auto; /* 가로 비율 유지하면서 세로 비율을 조절합니다. */
	        border: 2px solid blue; /* 예시: 테두리 스타일을 추가합니다. */
	      	margin-top: 20px;
	    }
        li{
        	list-style: none;
        }
        .blog-con{
         	display: flex;
		    overflow-x: auto; /* 수평 스크롤을 허용 */
		    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
        }
        
        #search-container {
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    text-align: center;
		    margin-top: 50px;
		}
		
		#search-container div {
		    margin-bottom: 10px; /* 각 div 간격 조절 */
		}
        
    </style> -->
</head>

<body>
	<div id="navi" class="navi">
		<a href="#">여행지</a>
		<a href="#">블로그</a><!-- 블로그페이지 허브로 이동 -->
		<a href="#">스케쥴</a><!-- 여행계획페이지 일정선택으로 이동 -->
		<a href="#">로그인</a>
		<a href="#">로그아웃</a>

	</div>
	
	<div class="navi">
		<a href="../">Home</a>
		<a href="../dbbutton">DBDownload</a>
		<a href="../plan">plan</a>
	</div>

    <div id="search-container" class="justify-content-center align-items-center">
		<div>
        	<h1>어디로 여행을 떠나시나요?</h1>
		</div>
		<div>
	        <form action="search.jsp" method="GET">
	        		<input type="text" id="search-box" name="keyword" placeholder="도시명을 검색해보세요."
				       class="form-control dropdown-toggle" data-toggle="dropdown" 
				       aria-haspopup="true" aria-expanded="false">
	            
	           	<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				    <a class="dropdown-item" href="#" id="recommand"></a>
				    <a class="dropdown-item" href="#">최근 트렌드 순위 2</a>
				    <a class="dropdown-item" href="#">최근 트렌드 순위 3</a>
				    <a class="dropdown-item" href="#">최근 트렌드 순위 4</a>
				    <a class="dropdown-item" href="#">최근 트렌드 순위 5</a>
				</div>
	            
	            <button type="submit" id="search-button">검색</button>
	        </form>
        </div>
    </div>

<%
    // 이미지 파일이 있는 폴더 경로
    String imgFolderPath = getServletContext().getRealPath("/resources/img");
    
    // 폴더 내의 파일 목록을 가져옴
    File imgFolder = new File(imgFolderPath);
    String[] imgFiles = imgFolder.list();
    
    // 이미지 파일 목록을 JSP 페이지로 전달
    request.setAttribute("imageFiles", imgFiles);
%>



<div id="blog-container">
    <p>블 로 그</p>
	
	<div class="blog-con">

        <c:forEach var="imageFile" items="${imageFiles}">
            
            	<% 
			        for (String imageFile : imgFiles) {
			    %>
			        <a href="#" id="item"><img src="${pageContext.request.contextPath}/resources/img/<%= imageFile %>"></a>
			    <% 
			        }
			    %>
            
        </c:forEach>
       
	</div>
</div>

<div>
    <a href="#" id="Seoul" name="Seoul" class="city" onclick="openPopup('Seoul')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Seoul.png" alt="Seoul Image">
	</a>
	<a href="#" id="Busan" name="Busan" class="city" onclick="openPopup('Busan')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Busan.png" alt="Seoul Image">
	</a>
	<a href="#" id="Daejeon" name="Daejeon" class="city" onclick="openPopup('Daejeon')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Daejeon.png" alt="Seoul Image">
	</a>
	<a href="#" id="Incheon" name="Incheon" class="city" onclick="openPopup('Incheon')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Incheon.png" alt="Seoul Image">
	</a>
	<a href="#" id="Gwangju" name="Gwangju" class="city" onclick="openPopup('Gwangju')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Gwangju.png" alt="Seoul Image">
	</a>
	<a href="#" id="Gangwon" name="Gangwon" class="city" onclick="openPopup('Gangwon')">
    	<img class="citiesImg" src="${pageContext.request.contextPath}/resources/img/cities/Gangwon.png" alt="Seoul Image">
	</a>
</div>

</body>
</html>