import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import Controller from '../../utils/interfaces/controller.interface'
import HttpException from '../../utils/exceptions/http.exception';
// import validationMiddleware from '../../middleware/validation.middleware';
// import validate from '../../resources/post/post.validation';
// import PostService from '../../resources/post/post.service';


class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    //private PostService = new PostService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes() {}

}

export default PostController;