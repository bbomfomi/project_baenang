package com.bn.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.bn.model.PostVo;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class PostMapperTests {

	
	 @Setter(onMethod_ = @Autowired) private PostMapper mapper;
	  
	 /* @Test public void testGetList() { mapper.getList().forEach(post ->
	 * log.info(post)); }
	 */

	 @Test public void testInsertPost() { // 테스트에 사용할 데이터 생성 
		 PostVo post = new PostVo(); 
		 post.setP_title("제목제목");
		 post.setP_content("내용내용");
	 
		 mapper.postInsert(post);
	  
		 log.info("Inserted Post ID: " + post.getP_id()); 
	 }
	
	 @Test public void testInsertPostSK() { // 테스트에 사용할 데이터 생성 
		 PostVo post = new PostVo(); 
		 post.setP_title("제목제목SK");
		 post.setP_content("내용내용SK");
	 
		 mapper.postInsertSK(post);
	  
		 log.info("Inserted Post ID: " + post.getP_id()); 
	 }
	  
		/*
		 * @Test public void testInsert() {
		 * 
		 * PostVo post = new PostVo();
		 * 
		 * post.setP_id(3); post.setP_title("새로 작성하는 글");
		 * post.setP_content("새로 작성하는 내용");
		 * 
		 * mapper.postInsert(post);
		 * 
		 * log.info(post); }
		 */
	 
	
	 
	 
		/*
		 * @Test public void testRead() { PostVo post = mapper.postRead(1);
		 * log.info(post); }
		 */
	 
		/*
		 * @Test public void testDelete() { log.info("delete count: " +
		 * mapper.postDelete(99)); }
		 */
	 
		/*
		 * @Test public void testModPost() { PostVo post = new PostVo();
		 * post.setP_id(2); post.setP_title("수정된 제목");
		 * post.setP_content("modified contents");
		 * 
		 * int count = mapper.modPost(post); log.info("modi count: " + count); }
		 */
	 
	 	 
}