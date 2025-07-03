import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

import Banner from "@/components/Banner"


import Products from "./products/page"
import BannerStatic from "@/components/BannerStatic"
import CategoryPage from "./categories/page"
import CategoryListPage from "@/components/CategoryListPage"
import CategoryNavbar from "@/components/CategoryNavbar"
//import CategoryNavbarScroll from "@/components/CategoryNavbarScroll"

export default function Home(){
    return (
        <div>
           
              <CategoryNavbar/> 
             {/* <CategoryNavbarScroll /> */}
             <BannerStatic/>
             <Banner/>
             <Products/>
             <CategoryListPage/> 

        </div>
    )
}
