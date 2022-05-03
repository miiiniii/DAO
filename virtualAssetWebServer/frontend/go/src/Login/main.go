package main

import (
	"Login/handler"
	"Login/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	/*
		r.GET("/", Home)
		r.POST("/insert", Insert)
		r.POST("/search", Search)
		r.Run(":8080")

	*/
	r.GET("/", handler.Home)
	r.POST("/api/signup", handler.SignUp)
	r.POST("/api/login", handler.Login)
	r.POST("/api/logout", middleware.TokenAuthMiddleware(), handler.Logout)
	r.POST("/api/refresh", handler.Refresh)
	r.Run(":8000")

}
