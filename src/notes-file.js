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

// ==============================================================================================
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
