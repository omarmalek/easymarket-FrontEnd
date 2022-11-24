// @GetMapping("/downloadimage")
// 	public void downloadimage(@RequestParam("id") int id, HttpServletRequest request,@RequestParam("picname") String picName, HttpServletResponse response) {
// 		byte[] imageBytes = productService.getImageAsBytes(id);

// 		// String imageName = request.getPathInfo().substring(1); // Returns "foo.png".
// 		try {
// 			response.getOutputStream().write(imageBytes);//this line is not required??!!
// 			if (imageBytes != null) {

// 				response.setContentType(servletContext.getMimeType(picName));
// //				response.setContentType("image/jpeg");
// 				response.setContentLength(imageBytes.length);
// 				response.getOutputStream().write(imageBytes);

// 			} else {
// 				response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
// 			}

// 		} catch (Exception e) {
// 			// throw new ServletException("Something failed at SQL/DB level.", e);
// 		}

// 	}
