package com.example.labCat;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/get")
public class HelloServlet extends HttpServlet {
    private String name;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        name = request.getParameter("name");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Name is " + name + "</h1>");
        out.println("</body></html>");
    }

    public void destroy() {
    }
}