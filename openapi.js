const openapi = {
  openapi: "3.0.3",

  info: {
    title: "Clothing E-Commerce Backend API",
    version: "1.0.0",
    description: "OpenAPI documentation for Clothing E-Commerce Backend"
  },

  servers: [
    {
      url: "https://ecommerce-clothing-backend-1m1z.onrender.com",
      description: "Production"
    }
  ],

  tags: [
    {
      name: "Auth",
      description: "Authentication APIs"
    },
    {
      name: "User",
      description: "User APIs"
    },
    {
      name: "Product",
      description: "Product APIs"
    },
    {
      name: "Order",
      description: "Order APIs"
    },
    {
      name: "Contact",
      description: "Contact APIs"
    },
    {
      name: "Admin",
      description: "Admin APIs"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {
      // =========================
      // AUTH
      // =========================

      RegisterRequest: {
        type: "object",

        required: [
          "name",
          "email",
          "password"
        ],

        properties: {
          name: {
            type: "string",
            example: "Vaibhav"
          },

          email: {
            type: "string",
            format: "email",
            example: "vaibhav@example.com"
          },

          password: {
            type: "string",
            format: "password",
            example: "Password@123"
          }
        }
      },

      LoginRequest: {
        type: "object",

        required: [
          "email",
          "password"
        ],

        properties: {
          email: {
            type: "string",
            format: "email",
            example: "vaibhav@example.com"
          },

          password: {
            type: "string",
            format: "password",
            example: "Password@123"
          }
        }
      },

      GoogleSigninRequest: {
        type: "object",

        required: [
          "name",
          "email"
        ],

        properties: {
          name: {
            type: "string",
            example: "Vaibhav"
          },

          email: {
            type: "string",
            format: "email",
            example: "vaibhav@gmail.com"
          }
        }
      },

      // =========================
      // PRODUCT
      // =========================

      ProductRequest: {
        type: "object",

        required: [
          "name",
          "description",
          "price",
          "category",
          "subCategory"
        ],

        properties: {
          name: {
            type: "string",
            example: "Classic Cotton T-Shirt"
          },

          description: {
            type: "string",
            example: "Comfortable cotton t-shirt"
          },

          price: {
            type: "number",
            example: 999
          },

          category: {
            type: "string",
            example: "CATEGORY_ID"
          },

          subCategory: {
            type: "string",
            example: "SUBCATEGORY_ID"
          },

          sizes: {
            type: "string",
            description: "Send array as JSON string in multipart/form-data",
            example: "[\"S\",\"M\",\"L\",\"XL\"]"
          },

          bestseller: {
            type: "boolean",
            example: true
          },

          image1: {
            type: "string",
            format: "binary"
          },

          image2: {
            type: "string",
            format: "binary"
          },

          image3: {
            type: "string",
            format: "binary"
          },

          image4: {
            type: "string",
            format: "binary"
          }
        }
      },

      // =========================
      // ORDER
      // =========================

      PlaceOrderRequest: {
        type: "object",

        required: [
          "items",
          "amount",
          "address"
        ],

        properties: {
          items: {
            type: "array",
            items: {
              type: "object"
            },

            example: []
          },

          amount: {
            type: "number",
            example: 1499
          },

          address: {
            type: "string",
            example: "Pune, Maharashtra"
          }
        }
      },

      // =========================
      // CONTACT
      // =========================

      ContactRequest: {
        type: "object",

        required: [
          "name",
          "email",
          "subject",
          "message"
        ],

        properties: {
          name: {
            type: "string",
            example: "Vaibhav"
          },

          email: {
            type: "string",
            format: "email",
            example: "vaibhav@example.com"
          },

          subject: {
            type: "string",
            example: "Product Enquiry"
          },

          message: {
            type: "string",
            example: "I want to know more about this product."
          }
        }
      },

      // =========================
      // ADMIN PROFILE
      // =========================

      AdminProfileRequest: {
        type: "object",

        required: [
          "name",
          "email",
          "phone"
        ],

        properties: {
          name: {
            type: "string",
            example: "Vaibhav"
          },

          email: {
            type: "string",
            format: "email",
            example: "vaibhav@example.com"
          },

          phone: {
            type: "string",
            example: "9876543210"
          },

          profilePic: {
            type: "string",
            format: "binary"
          }
        }
      },

      // =========================
      // ADMIN PASSWORD
      // =========================

      ChangePasswordRequest: {
        type: "object",

        properties: {
          oldPassword: {
            type: "string",
            format: "password",
            example: "OldPassword@123"
          },

          newPassword: {
            type: "string",
            format: "password",
            example: "NewPassword@123"
          }
        }
      },

      // =========================
      // ORDER STATUS
      // =========================

      UpdateOrderStatusRequest: {
        type: "object",

        properties: {
          orderId: {
            type: "string",
            example: "64f123456789abcdef012345"
          },

          status: {
            type: "string",
            example: "Delivered"
          }
        }
      }
    }
  },

  paths: {

    // =====================================================
    // AUTH ROUTES
    // =====================================================

    "/api/auth/registeration": {
      post: {
        tags: ["Auth"],

        summary: "Register new user",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "User registered successfully"
          },

          400: {
            description: "Registration failed"
          }
        }
      }
    },

    "/api/auth/login": {
      post: {
        tags: ["Auth"],

        summary: "User login",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Login successful"
          },

          401: {
            description: "Invalid credentials"
          }
        }
      }
    },

    "/api/auth/userLogout": {
      post: {
        tags: ["Auth"],

        summary: "User logout",

        responses: {
          200: {
            description: "User logged out successfully"
          }
        }
      }
    },

    "/api/auth/googleSignin": {
      post: {
        tags: ["Auth"],

        summary: "Google sign in",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GoogleSigninRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Google sign in successful"
          }
        }
      }
    },

    "/api/auth/adminlogin": {
      post: {
        tags: ["Auth"],

        summary: "Admin login",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Admin login successful"
          },

          401: {
            description: "Invalid admin credentials"
          }
        }
      }
    },

    "/api/auth/adminLogout": {
      post: {
        tags: ["Auth"],

        summary: "Admin logout",

        responses: {
          200: {
            description: "Admin logged out successfully"
          }
        }
      }
    },

    // =====================================================
    // USER ROUTES
    // =====================================================

    "/api/user/getcurrentUser": {
      get: {
        tags: ["User"],

        summary: "Get current user",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Current user details"
          },

          401: {
            description: "Unauthorized"
          }
        }
      }
    },

    "/api/user/getadmin": {
      get: {
        tags: ["User"],

        summary: "Get admin",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Admin details"
          },

          401: {
            description: "Unauthorized"
          }
        }
      }
    },

    // =====================================================
    // PRODUCT ROUTES
    // =====================================================

    "/api/product/add": {
      post: {
        tags: ["Product"],

        summary: "Add new product",

        requestBody: {
          required: true,

          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Product created successfully"
          },

          400: {
            description: "Invalid product data"
          }
        }
      }
    },

    "/api/product/getP": {
      get: {
        tags: ["Product"],

        summary: "Get all products",

        responses: {
          200: {
            description: "Products retrieved successfully"
          }
        }
      }
    },

    "/api/product/deleteP/{id}": {
      delete: {
        tags: ["Product"],

        summary: "Delete product",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "64f123456789abcdef012345"
          }
        ],

        responses: {
          200: {
            description: "Product deleted successfully"
          },

          404: {
            description: "Product not found"
          }
        }
      }
    },

    "/api/product/pUpdate/{id}": {
      patch: {
        tags: ["Product"],

        summary: "Update product",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "64f123456789abcdef012345"
          }
        ],

        requestBody: {
          required: true,

          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Product updated successfully"
          },

          404: {
            description: "Product not found"
          }
        }
      }
    },

    // =====================================================
    // ORDER ROUTES
    // =====================================================

    "/api/order/placeOrder": {
      post: {
        tags: ["Order"],

        summary: "Place order",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlaceOrderRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Order placed successfully"
          },

          400: {
            description: "Invalid order data"
          }
        }
      }
    },

    "/api/order/userorder": {
      post: {
        tags: ["Order"],

        summary: "Get user's orders",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "User orders retrieved successfully"
          }
        }
      }
    },

    "/api/order/track/{id}": {
      get: {
        tags: ["Order"],

        summary: "Track order",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "64f123456789abcdef012345"
          }
        ],

        responses: {
          200: {
            description: "Order tracking information"
          },

          404: {
            description: "Order not found"
          }
        }
      }
    },

    "/api/order/status": {
      put: {
        tags: ["Order"],

        summary: "Update order status",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateOrderStatusRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Order status updated successfully"
          }
        }
      }
    },

    "/api/order/all": {
      get: {
        tags: ["Order"],

        summary: "Get all orders",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "All orders retrieved successfully"
          }
        }
      }
    },

    // =====================================================
    // CONTACT ROUTES
    // =====================================================

    "/api/contact/send": {
      post: {
        tags: ["Contact"],

        summary: "Send contact message",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ContactRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Contact message sent successfully"
          }
        }
      }
    },

    "/api/contact/getAllMessages": {
      get: {
        tags: ["Contact"],

        summary: "Get all contact messages",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "All contact messages"
          }
        }
      }
    },

    "/api/contact/getUnreadMessagesCount": {
      get: {
        tags: ["Contact"],

        summary: "Get unread messages count",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Unread messages count"
          }
        }
      }
    },

    "/api/contact/getUnreadMessagesCount/{id}": {
      put: {
        tags: ["Contact"],

        summary: "Update contact message",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "64f123456789abcdef012345"
          }
        ],

        responses: {
          200: {
            description: "Contact message updated"
          }
        }
      }
    },

    // =====================================================
    // ADMIN ROUTES
    // =====================================================

    "/api/dashboard": {
      get: {
        tags: ["Admin"],

        summary: "Get dashboard statistics",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Dashboard statistics"
          },

          401: {
            description: "Unauthorized"
          }
        }
      }
    },

    "/api/dashboard/profile": {
      get: {
        tags: ["Admin"],

        summary: "Get admin profile",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Admin profile"
          }
        }
      },

      put: {
        tags: ["Admin"],

        summary: "Update admin profile",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/AdminProfileRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Admin profile updated successfully"
          }
        }
      }
    },

    "/api/dashboard/password": {
      put: {
        tags: ["Admin"],

        summary: "Change admin password",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChangePasswordRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Admin password changed successfully"
          }
        }
      }
    }
  }
};

export default openapi;