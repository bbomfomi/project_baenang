package com.bn.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.bn.model.PostVo;
import com.bn.service.PostService;
import com.google.gson.JsonObject;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/blog/*")
@AllArgsConstructor
public class PostController { 
	
	private PostService service;
	
	@RequestMapping("/posts") 
 	public String listingPosts(Model model) { 
		
		log.info("posts");
		model.addAttribute("posts", service.getList(0));
		
		return "/blog/posts";
	} 
	
	@GetMapping("/addpost")
	public void addPost() {
		
	}
	
	@RequestMapping("/addpost")
	public String addPost(PostVo post, RedirectAttributes rttr) {
		log.info("posting: " + post);
		
		service.register(post);
		
		rttr.addFlashAttribute("results", post.getP_id());
		
		return "redirect:/blog/posts";
	}
	
	@GetMapping({"/get", "/modify"})
	public void get(@RequestParam("p_id") int p_id, Model model) {
		log.info("/get or /modi");
		model.addAttribute("post", service.get(p_id));
	}
	
	@PostMapping("/modify")
	public String modiPost(PostVo post, RedirectAttributes rttr) {
		log.info("modifying: " + post);
		
		if(service.modify(post)) {
			rttr.addFlashAttribute("result", "success");
		}
		return "redirect:/blog/posts";
	}
	
	@RequestMapping("/bloghub") 
 	public String showBloghub(Model model) { 
		
		log.info("posts");
		model.addAttribute("posts", service.getList(0));
		
		return "/blog/bloghub";
	}
	
}