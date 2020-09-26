import {Component, OnInit} from '@angular/core';
import {ShopService} from '../service/shop.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {Warehouse} from '../model/warehouse';
import {CommentRating} from '../model/commentRating';
import {Accounts} from '../model/account';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {Images} from '../model/images';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: string;

  categoryName: string;

  property: string;

  accountId: string;

  quantity: number;

  productToCart: Product = new Product();

  account: Accounts = new Accounts();

  commentR: CommentRating [];

  warehouse: Warehouse = new Warehouse();

  product: Product = new Product();

  listProduct: Product[];

  listCart: [];

  listImage: Images[];

  cart: Cart = new Cart();


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: ShopService, private CartSerice: CartService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params.Id;
      this.detail(this.productId);
      this.warehouseByProductId(this.productId);
      this.commentRating(this.productId);
      this.images(this.productId);
    });
  }

  addToCart(id: string) {
    this.service.detail(id).subscribe((item: any) => {
      this.productToCart = item.data;
      if (this.listCart == null) {
        this.cart.productId = this.productToCart.productId;
        this.cart.image = this.productToCart.imageProduct;
        this.cart.productName = this.productToCart.productName;
        this.cart.property = this.property;
        this.cart.productPrice = this.productToCart.productPrice;
        // @ts-ignore
        this.cart.totalPrice = this.productToCart.productPrice * this.quantity;
        this.cart.quantity = this.quantity;
        this.CartSerice.addToCart(this.cart);
        this.router.navigate(['/shopping-cart']);
      } else {

        // localStorage.setItem('cart', JSON.stringify(this.listCart));
      }
    });


  }

  detail(id: string) {
    this.service.detail(id).subscribe((item: any) => {
      this.product = item.data;
      this.accountId = item.data.accountId;
      this.categoryName = item.data.category.categoryName;
      this.service.getAllProductByAccoutnId(this.accountId).subscribe((item2: any[]) => {
        // @ts-ignore
        this.listProduct = item2;
      });
      this.service.getAccount(this.accountId).subscribe((item3: any) => {
        this.account = item3.data;
      });
    });
  }

  images(id: string) {
    this.service.images(id).subscribe((items: any[]) => {
      // @ts-ignore
      this.listImage = items.imageDTOS;
      console.log(this.listImage);
    });
  }

  warehouseByProductId(id: string) {
    this.service.warehouseByProductId(id).subscribe((item: any) => {
      this.warehouse = item.data;
    });
  }


  commentRating(id: string) {
    this.service.commentRating(id).subscribe((item: any[]) => {
      // @ts-ignore
      this.commentR = item.data.commentRatingDTOList;
      console.log(this.commentR);
    });
  }

  async ngAfterViewInit() {

    await this.loadScript('assets/js/jquery-3.3.1.min.js');
    await this.loadScript('assets/js/bootstrap.min.js');
    await this.loadScript('assets/js/jquery-ui.min.js');
    await this.loadScript('assets/js/jquery.countdown.min.js');
    await this.loadScript('assets/js/jquery.nice-select.min.js');
    await this.loadScript('assets/js/jquery.dd.min.js');
    await this.loadScript('assets/js/jquery.slicknav.js');
    await this.loadScript('assets/js/owl.carousel.min.js');
    await this.loadScript('assets/js/jquery.zoom.min.js');
    await this.loadScript('assets/js/main.js');
    await this.loadScript('assets/js/imagesloaded.pkgd.min.js');

  }

  loadScript(scriptUrl: string) {
    return new Promise(((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    }));
  }

}
