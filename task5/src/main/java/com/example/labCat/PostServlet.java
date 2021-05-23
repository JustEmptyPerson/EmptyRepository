package com.example.labCat;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/check")
public class PostServlet extends HttpServlet {
    String check = "true";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();

        check = "true";
            writer.println("<p>{\"success\" : " + check + " }</p>");
    }
}