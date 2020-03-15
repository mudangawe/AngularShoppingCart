import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule,FormsModule } from '@angular/forms'
import { FooterComponent } from './BottomContent/footer/footer.component';
import { LandingPageComponent } from './MiddleContent/landing-page/landing-page.component';
import { HeaderComponent } from './TopContent/header/header.component';
import { NavigationBarComponent } from './TopContent/navigation-bar/navigation-bar.component';
import {RouterModule, Routes} from '@angular/router';
import {CarouselComponent} from '../app/MiddleContent/carousel/carousel.component';
import { ProductsComponent } from './shared/products/products.component';
import { ShelfCardsComponent } from './MiddleContent/shelf-cards/shelf-cards.component';
import { CartComponent } from './MiddleContent/cart/cart.component';
import { TopLinkComponent } from './TopContent/top-link/top-link.component';
import { CategoriesComponent } from './MiddleContent/categories/categories.component';
import { BedRoomComponent } from './MiddleContent/pages/bed-room/bed-room.component';
import { LivingRoomComponent } from './MiddleContent/pages/living-room/living-room.component';
import { DiningRoomComponent } from './MiddleContent/pages/dining-room/dining-room.component';
import { KitchenComponent } from './MiddleContent/pages/kitchen/kitchen.component';
import { GardenComponent } from './MiddleContent/pages/garden/garden.component';
import { LoginComponent } from './Forms/login/login.component';
import { RegisterComponent } from './Forms/register/register.component';
import { ContactusComponent } from './Forms/contactus/contactus.component';
import { ContactComponent } from './MiddleContent/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './shared/pagination/pagination.component';
import {AddProductComponent} from '../app/Forms/add-product/add-product.component'
import {HttpClientModule} from '@angular/common/http';
import { MessageComponent } from './shared/dialogs/message/message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog'
import {MatProgressSpinnerModule } from '@angular/material';
import { CheckoutComponent } from './MiddleContent/checkout/checkout.component';
import { CreditCardFormComponent } from './Forms/credit-card-form/credit-card-form.component';
import { PayPalFormComponent } from './Forms/pay-pal-form/pay-pal-form.component';
import { DebitFormComponent } from './Forms/debit-form/debit-form.component';
import { ProfileComponent } from './shared/profile/profile.component'
import {CookieService} from 'ngx-cookie-service'
import {StorageServiceModule} from 'ngx-webstorage-service'
const appRoutes: Routes =[
  {path:"", component: LandingPageComponent},
  {path:"Cart", component: CartComponent},
  {path:"Bedroom", component: BedRoomComponent},
  {path:"Kitchen", component: KitchenComponent},
  {path:"LivingRoom", component: LivingRoomComponent},
  {path:"DiningRoom", component: DiningRoomComponent},
  {path:"Garden", component: GardenComponent},
  {path:"Contact", component: ContactComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"AddProduct", component: AddProductComponent},
  {path:"Checkout", component: CheckoutComponent}
] 
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingPageComponent,
    HeaderComponent,
    NavigationBarComponent,
    CarouselComponent,
    ProductsComponent,
    ShelfCardsComponent,
    CartComponent,
    TopLinkComponent,
    CategoriesComponent,
    BedRoomComponent,
    LivingRoomComponent,
    DiningRoomComponent,
    KitchenComponent,
    GardenComponent,
    LoginComponent,
    RegisterComponent,
    ContactusComponent,
    ContactComponent,
    PaginationComponent,
    AddProductComponent,
    MessageComponent,
    CheckoutComponent,
    CreditCardFormComponent,
    PayPalFormComponent,
    DebitFormComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{enableTracing:true}),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StorageServiceModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent,MessageComponent]
})
export class AppModule { }
