<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 15/9/8
 * Time: 下午2:59
 */
$title = '木木安妮官网';
$indexJS = 'PC.js';
$indexCSS = 'index.css';
include_once('header.php');
include_once('carousel.php');
include_once('nav.php');
?>
    <article id="article">
        <div class="top">
            <div class="top_two_section" id="new_promotion">
                <div>
                    <a target="_blank" href="https://ff-win.taobao.com/promotion.htm?spm=0.0.0.0.KNvZNi&id=290979649"><img src="promotion.jpg"/></a>
                </div>
            </div>
            <div class="top_two_section" id="main_product">
                <img src="hot.jpg"/>
                <a href="annie.php" target="_blank"><img src="hot2.jpg" id="mainpro" alt="main_product" /></a>
            </div>
        </div>
        <div class="down">
            <div class="down_three_section" id="brand_story">
                <a href="suit.php" target="_blank"><img src="brand.jpg" id="brand_img"/></a>
            </div>
            <div class="down_three_section" id="contact_us">
                <div>
                    <a href="javascript:;"><img src="contact.jpg" id="contact_img"/></a>
                    <div id="alert">
                        <div class="content">
                            <h1>联系我们</h1>
                            <div>
                                <h2>微信</h2>
                                <img src="wx.jpg" style="width:170px;height:170px" alt="微信" />
                                <h2>微博</h2>
                                <img src="wb.jpg" style="width:170px;height:170px" alt="微博" />
                                <h2>淘宝店</h2>
                                <img src="tb.jpg" style="width:170px;height:170px" alt="淘宝" />
                                <h2>400热线</h2>
                                <p>400-9922-157</p>
                                <h2>欢迎加入QQ群</h2>
                                <p>390828471</p>
                            </div>
                            <button class="close">
                                <img src="close.png" alt="close" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="down_three_section" id="FAQ">
                <div>
                    <a href="javascript:;"><img id="faq_img" src="faq.jpg"/></a>
                    <div id="comeout">
                        <h1>FAQ&nbsp;常见问题汇总</h1>
                        <div>
                            <ul id="faqnav">
                                <li class="active"><a href="javascript:;">关于物流</a></li>
                                <li><a href="javascript:;">关于产品</a></li>
                                <li><a href="javascript:;">关于过敏</a></li>
                                <li><a href="javascript:;">关于支付</a></li>
                                <li><a href="javascript:;" style="font-size: 12px">关于DT</a></li>
                            </ul>
                            <article class="faq">
                                <section class="active">
                                    <div class="triangle one"></div>
                                    <div>
                                        <p class="question"><b>Q:默认情况下用什么快递呢?</b></p>
                                        <p class="answer">A:默认情况下用的是申通快递</p>
                                        <p class="question"><b>Q:发货后快递一般几天到?</b></p>
                                        <p class="answer">A:发货后一般同城交易隔天可以收到，基本都是3天，法定节假日或活动期间时间会适当延长。（备注:恶劣天气或天灾会延期）</p>
                                        <p class="question"><b>Q:每天的发货时间?</b></p>
                                        <p class="answer">A:每个订单都将根据付款时间来安排发货。一般17点之前付款的，当天可以发出。</p>
                                    </div>
                                </section>
                                <section>
                                    <div class="triangle two"></div>
                                    <div>
                                        <p class="question"><b>Q:木木控油洁面乳?</b></p>
                                        <p class="answer">A:木木控油洁面乳是一款<b>温和、不刺激、针对偏油性皮肤</b>的洁面乳。偏油性的皮肤的男士女士通用，主要成分是三种茶叶的提取物，</p>
                                        <p class="question"><b>Q:安妮水润洁面乳?</b></p>
                                        <p class="answer">A:安妮水润洁面乳是一款<b>温和、不刺激、针对偏油性皮肤</b>的洁面乳。偏油性的皮肤，男士女士</p>
                                        <p class="question"><b>Q:如何使用洁面乳?</b></p>
                                        <p class="answer">A:1、用温水湿润脸部，挤出洁面乳，量都不宜过多，面积有五分硬币大小即可。在向脸上涂抹之前，一定要先把洁面乳在手心充分打起泡沫。
                                            <br/>2、把泡沫涂在脸上以后要轻轻打圈按摩，不要太用力，以免产生皱纹。最好用中指跟无名指，因为中指跟无名指的力道较小，不会伤害皮肤，大概按摩30秒左右，让泡沫遍及整个面部。鼻尖和鼻翼是重点清洁的地方，清洁时间可以适当加长。<br/>
                                            3、用洁面乳按摩完后，就可以清洗了。</p>
                                    </div>
                                </section>
                                <section>
                                    <div class="triangle three"></div>
                                    <div id="">
                                        <p class="question"><b>Q:默认情况下用什么快递呢</b></p>
                                        <p class="answer">A:默认情况下用的是申通快递</p>
                                        <p class="question"><b>Q:默认情况下用什么快递呢</b></p>
                                        <p class="answer">A:默认情况下用的是申通快递</p>
                                    </div>
                                </section>
                                <section>
                                    <div class="triangle four"></div>
                                    <div id="pay">
                                        <p class="question"><b>Q:关于支付的一些事</b></p>
                                        <p class="answer">A:出于安全的考虑，支付会用到您的<b>淘宝账号</b>，用您熟悉的支付方式去支付，保障了您的支付安全，放心支付消除您的顾虑!</p>
                                    </div>
                                </section>
                                <section>
                                    <div class="triangle five"></div>
                                    <div id="package">
                                        <p class="question"><b>Q:默认情况下用什么快递呢</b></p>
                                        <p class="answer">A:默认情况下用的是申通快递</p>
                                        <p class="question"><b>Q:默认情况下用什么快递呢</b></p>
                                        <p class="answer">A:默认情况下用的是申通快递</p>
                                    </div>

                                </section>
                            </article>
                        </div>
                        <button class="close">
                            <img src="close.png" alt="close" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    <div class="screen"></div>
<?php
include_once('footer.php');
?>