/**
 * @license
 * swf2js:
 *   licenses: MIT
 *   version: 0.7.8
 *   author: Toshiyuki Ienaga <ienaga@tvon.jp>
 *   homepage: https://swf2js.wordpress.com/
 *   copyright: Copyright (c) 2013 - 2017 Toshiyuki Ienaga.
 */
if (!("swf2js" in window)) {
    (function(window) {

if (typeof Object.defineProperty !== "function") {
    Object.defineProperty = function (obj, prop, desc)
    {
        if ("value" in desc) {
            obj[prop] = desc.value;
        }

        if ("get" in desc) {
            obj.__defineGetter__(prop, desc.get);
        }

        if ("set" in desc) {
            obj.__defineSetter__(prop, desc.set);
        }

        return obj;
    };
}

if (typeof Object.defineProperties !== "function") {
    Object.defineProperties = function (obj, descs)
    {
        for (var prop in descs) {
            if (descs.hasOwnProperty(prop)) {
                Object.defineProperty(obj, prop, descs[prop]);
            }
        }
        return obj;
    };
}

if (typeof Object.getPrototypeOf !== "function") {
    Object.getPrototypeOf = function (obj)
    {
        return obj.__proto__;
    };
}

if (typeof Object.setPrototypeOf !== "function") {
    Object.setPrototypeOf = function (obj, proto)
    {
        obj.__proto__ = proto;
        return obj;
    };
}
/**
 * @constructor
 */
var CanvasToWebGL = function ()
{

};

/**
 * enable
 */
CanvasToWebGL.prototype.enable = function ()
{
    /**
     * properties
     */
    Object.defineProperties(WebGLRenderingContext.prototype, {
        fillStyle: {
            get: function () {
                return this.getFillStyle();
            },
            set: function (fillStyle) {
                this.setFillStyle(fillStyle);
            }
        },
        strokeStyle: {
            get: function () {
                return this.getStrokeStyle();
            },
            set: function (strokeStyle) {
                this.setStrokeStyle(strokeStyle);
            }
        },
        lineWidth: {
            get: function () {
                return this.getLineWidth();
            },
            set: function (getLineWidth) {
                this.setLineWidth(getLineWidth);
            }
        },
        lineCap: {
            get: function () {
                return this.getLineCap();
            },
            set: function (lineCap) {
                this.setLineCap(lineCap);
            }
        },
        lineJoin: {
            get: function () {
                return this.getLineJoin();
            },
            set: function (lineJoin) {
                this.setLineJoin(lineJoin);
            }
        },
        miterLimit: {
            get: function () {
                return this.getMiterLimit();
            },
            set: function (miterLimit) {
                this.setMiterLimit(miterLimit);
            }
        }
    });

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getFillStyle = function ()
    {
        return null;
    };

    /**
     * @param fillStyle
     */
    WebGLRenderingContext.prototype.setFillStyle = function (fillStyle)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getStrokeStyle = function ()
    {
        return null;
    };

    /**
     * @param strokeStyle
     */
    WebGLRenderingContext.prototype.setStrokeStyle = function (strokeStyle)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineWidth = function ()
    {
        return null;
    };

    /**
     * @param lineWidth
     */
    WebGLRenderingContext.prototype.setLineWidth = function (lineWidth)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineCap = function ()
    {
        return null;
    };

    /**
     * @param lineCap
     */
    WebGLRenderingContext.prototype.setLineCap = function (lineCap)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getLineJoin = function ()
    {
        return null;
    };

    /**
     * @param lineJoin
     */
    WebGLRenderingContext.prototype.setLineJoin = function (lineJoin)
    {

    };

    /**
     * @returns {*}
     */
    WebGLRenderingContext.prototype.getMiterLimit = function ()
    {
        return null;
    };

    /**
     * @param miterLimit
     */
    WebGLRenderingContext.prototype.setMiterLimit = function (miterLimit)
    {

    };

    /**
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.moveTo = function (x, y)
    {

    };

    /**
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.lineTo = function (x, y)
    {

    };

    /**
     * @param cpx
     * @param cpy
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.quadraticCurveTo = function (cpx, cpy, x, y)
    {

    };

    /**
     * @param cpx1
     * @param cpy1
     * @param cpx2
     * @param cpy2
     * @param x
     * @param y
     */
    WebGLRenderingContext.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y)
    {

    };

    /**
     * @param x
     * @param y
     * @param radius
     * @param startAngle
     * @param endAngle
     * @param anticlockwise
     */
    WebGLRenderingContext.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise)
    {

    };

    /**
     * beginPath
     */
    WebGLRenderingContext.prototype.beginPath = function()
    {

    };


    /**
     * fill
     */
    WebGLRenderingContext.prototype.fill = function()
    {

    };

    /**
     * stroke
     */
    WebGLRenderingContext.prototype.stroke = function()
    {

    };

    /**
     * clip
     */
    WebGLRenderingContext.prototype.clip = function()
    {

    };

};
var Util;
var stageId    = 0;
var instanceId = 0;

(function (w) {
    "use strict";

    var m   = w.Math;
    var doc = w.document;

    /**
     * @constructor
     */
    var Utility = function () {};

    // set global parameter
    Util  = Utility;

    // global parameters
    Utility.prototype.$resizeId   = 0;
    Utility.prototype.$stages     = [];
    Utility.prototype.$loadStages = [];
    Utility.prototype.$event      = null;
    Utility.prototype.$keyEvent   = null;

    // OS
    Utility.prototype.$navigator   = w.navigator;
    var ua                         = w.navigator.userAgent;
    var isAndroid                  = (ua.indexOf("Android") > 0);
    var isiOS                      = (ua.indexOf("iPhone") > 0 || ua.indexOf("iPod") > 0);
    var isTouch                    = (isAndroid || isiOS) ? true : false;
    Utility.prototype.$isTouch     = isTouch;
    Utility.prototype.$isAndroid   = isAndroid;
    Utility.prototype.$isAndroid4x = (ua.indexOf("Android 4.") > 0);
    Utility.prototype.$isChrome    = (ua.indexOf("Chrome") > 0);

    // event
    Utility.prototype.$startEvent = (isTouch) ? "touchstart" : "mousedown";
    Utility.prototype.$moveEvent  = (isTouch) ? "touchmove"  : "mousemove";
    Utility.prototype.$endEvent   = (isTouch) ? "touchend"   : "mouseup";

    // Alpha Bug
    var isAlphaBug   = isAndroid;
    var chkCanvas    = doc.createElement("canvas");
    chkCanvas.width  = 1;
    chkCanvas.height = 1;
    var tmpContext   = chkCanvas.getContext("2d");
    if (isAndroid) {
        var imageData  = tmpContext.createImageData(1, 1);
        var pixelArray = imageData.data;
        pixelArray[0]  = 128;
        pixelArray[3]  = 128;
        tmpContext.putImageData(imageData, 0, 0);

        imageData  = tmpContext.getImageData(0, 0, 1, 1);
        pixelArray = imageData.data;
        isAlphaBug = (pixelArray[0] === 255);
    }
    Utility.prototype.$tmpContext = tmpContext;
    Utility.prototype.$isAlphaBug = isAlphaBug;

    // shortcut
    Utility.prototype.$document       = doc;
    Utility.prototype.$min            = m.min;
    Utility.prototype.$max            = m.max;
    Utility.prototype.$floor          = m.floor;
    Utility.prototype.$ceil           = m.ceil;
    Utility.prototype.$pow            = m.pow;
    Utility.prototype.$random         = m.random;
    Utility.prototype.$atan2          = m.atan2;
    Utility.prototype.$sqrt           = m.sqrt;
    Utility.prototype.$cos            = m.cos;
    Utility.prototype.$sin            = m.sin;
    Utility.prototype.$log            = m.log;
    Utility.prototype.$abs            = m.abs;
    Utility.prototype.$SQRT2          = m.SQRT2;
    Utility.prototype.$LN2_2          = m.LN2 / 2;
    Utility.prototype.$LOG1P          = 0.29756328478758615;
    Utility.prototype.$PI             = m.PI;
    Utility.prototype.$Number         = w.Number;
    Utility.prototype.$fromCharCode   = w.String.fromCharCode;
    Utility.prototype.$isNaN          = w.isNaN;
    Utility.prototype.$setTimeout     = w.setTimeout;
    Utility.prototype.$clearTimeout   = w.clearTimeout;
    Utility.prototype.$setInterval    = w.setInterval;
    Utility.prototype.$clearInterval  = w.clearInterval;
    Utility.prototype.$parseInt       = w.parseInt;
    Utility.prototype.$Function       = w.Function;
    Utility.prototype.$Date           = new Date();
    Utility.prototype.$canBtoa        = (typeof w.btoa !== "undefined");
    Utility.prototype.$canArrayBuffer = (typeof w.ArrayBuffer !== "undefined");
    Utility.prototype.$devicePixelRatio  = w.devicePixelRatio || 1;

    // check XMLHttpRequest2
    Utility.prototype.$canXHR2 = (function(){
        var xhr = new XMLHttpRequest();
        return (typeof xhr.responseType !== "undefined");
    })();

    // check WebGL
    var canvas                  = doc.createElement("canvas");
    var ctx                     = canvas.getContext("webgl");
    var canWebGL                = (typeof w.WebGLRenderingContext !== "undefined" && ctx !== null);
    Utility.prototype.$canWebGL = false; // TODO canWebGL

    if (canWebGL) {
        var ctw = new CanvasToWebGL();
        ctw.enable();
    }

    // check requestAnimationFrame
    Utility.prototype.$requestAnimationFrame =
        w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.setTimeout;

    // JCT
    Utility.prototype.$JCT11280 = new w.Function('var a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s="",u=String.fromCharCode,t=u(12539);for(;++c<127;)C[u(c)]=c^39&&c^92?i++:0;i=0;for(;0<=(c=C[a.charAt(i++)]);)if(16===c)if((c=C[a.charAt(i++)])<87){if(86===c)c=1879;for(;c--;)s+=u(++p)}else s+=s.substr(8272,360);else if(c<86)s+=u(p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]);else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152)s+=u(p=c<40960?c:c|57344);else{c&=511;for(;c--;)s+=t;p=12539}return s')();

    /**
     * @param audio
     * @param soundInfo
     */
    Utility.prototype.$startSound = function (audio, soundInfo)
    {
        if (soundInfo.SyncStop) {
            audio.pause();
        } else {
            if (soundInfo.HasLoops) {
                audio.loopCount = soundInfo.LoopCount;
                var loopSound = function ()
                {
                    audio.loopCount--;
                    if (!this.loopCount) {
                        audio.removeEventListener("ended", loopSound);
                    } else {
                        audio.currentTime = 0;
                        if (soundInfo.HasInPoint) {
                            audio.currentTime = soundInfo.InPoint;
                        }
                        audio.play();
                    }
                };
                audio.addEventListener("ended", loopSound);
            }

            if (soundInfo.HasInPoint) {
                audio.addEventListener("canplay", function ()
                {
                    this.currentTime = soundInfo.InPoint;
                });
            }

            audio.play();
        }
    }

    /**
     * resize
     */
    Utility.prototype.$resize = function ()
    {
        this.$clearTimeout.call(null, this.$resizeId);
        this.$resizeId = this.$setTimeout.call(null, this.$resizeExecute, 300);
    };


    /**
     * resize execute
     */
    Utility.prototype.$resizeExecute = function ()
    {
        var stages = Util.prototype.$stages;
        for (var idx in stages) {
            if (!stages.hasOwnProperty(idx)) {
                continue;
            }

            var stage = stages[idx];
            if (!stage.isLoad) {
                continue;
            }

            stage.resize();
        }
    };

    /**
     * @param a
     * @param b
     * @returns {[]}
     */
    Utility.prototype.$multiplicationColor = function(a, b)
    {
        return [
            +(a[0] * b[0]),
            +(a[1] * b[1]),
            +(a[2] * b[2]),
            +(a[3] * b[3]),
            +(a[0] * b[4] + a[4]),
            +(a[1] * b[5] + a[5]),
            +(a[2] * b[6] + a[6]),
            +(a[3] * b[7] + a[7])
        ];
    };

    /**
     * @param a
     * @param b
     * @returns []
     */
    Utility.prototype.$multiplicationMatrix = function(a, b)
    {
        return [
            +(a[0] * b[0] + a[2] * b[1]),
            +(a[1] * b[0] + a[3] * b[1]),
            +(a[0] * b[2] + a[2] * b[3]),
            +(a[1] * b[2] + a[3] * b[3]),
            +(a[0] * b[4] + a[2] * b[5] + a[4]),
            +(a[1] * b[4] + a[3] * b[5] + a[5])
        ];
    };

    /**
     * @param color
     * @param data
     * @returns {{R: number, G: number, B: number, A: number}}
     */
    Utility.prototype.$generateColorTransform = function (color, data)
    {
        return {
            R: this.$max(0, this.$min((color.R * data[0]) + data[4], 255))|0,
            G: this.$max(0, this.$min((color.G * data[1]) + data[5], 255))|0,
            B: this.$max(0, this.$min((color.B * data[2]) + data[6], 255))|0,
            A: +(this.$max(0, this.$min((color.A * 255 * data[3]) + data[7], 255)) / 255)
        };
    };

    /**
     * @param int
     * @param alpha
     * @returns {{R: number, G: number, B: number, A: number}}
     */
    Utility.prototype.$intToRGBA = function (int, alpha)
    {
        alpha = alpha || 100;
        return {
            R: (int & 0xff0000) >> 16,
            G: (int & 0x00ff00) >> 8,
            B: (int & 0x0000ff),
            A: (alpha / 100)
        };
    };

    /**
     * @param rgb
     * @returns {Number}
     */
    Utility.prototype.$toColorInt = function (rgb)
    {
        return (typeof rgb === "number") ? rgb : this.$colorStringToInt(rgb);
    };

    /**
     * @param str
     * @returns {string}
     */
    Utility.prototype.$colorStringToInt = function(str)
    {
        var canvas    = this.$cacheStore.getCanvas();
        var ctx       = canvas.getContext("2d");
        ctx.fillStyle = str;

        var color = "0x" + ctx.fillStyle.substr(1);

        // destroy
        this.$cacheStore.destroy(ctx);

        return color;
    };

    /**
     * @param event
     */
    Utility.prototype.$keyUpAction = function (event)
    {
        // cache
        Util.prototype.$keyEvent = event;

        // execute
        var keyClass = Util.prototype.$keyClass;
        var onKeyUp  = keyClass.onKeyUp;
        if (typeof onKeyUp === "function") {
            onKeyUp.apply(keyClass, [event]);
        }
    };

    /**
     * @param event
     */
    Utility.prototype.$keyDownAction = function (event)
    {
        var i, length, hIdx;

        Util.prototype.$keyEvent = event;

        var keyClass = Util.prototype.$keyClass;
        var keyCode  = keyClass.getCode()|0;

        var onKeyDown = keyClass.onKeyDown;
        if (typeof onKeyDown === "function") {
            onKeyDown.apply(keyClass, [event]);
        }

        var stages = Util.prototype.$stages;
        for (var idx in stages) {
            if (!stages.hasOwnProperty(idx)) {
                continue;
            }

            var stage = stages[idx];

            // keyDownEvent
            var keyDownEventHits = stage.keyDownEventHits;

            length = keyDownEventHits.length|0;
            if (length) {
                i = 0;
                while (i < length) {
                    var obj = keyDownEventHits[i];
                    i = (i + 1)|0;

                    stage.executeEventAction(obj.as, obj.mc);
                }
            }

            var buttonHits = stage.buttonHits;
            length = buttonHits.length;
            if (!length) {
                continue;
            }

            var isEnd = false;
            i = length;
            while (i) {
                hIdx = i - 1;
                if (!(hIdx in buttonHits)) {
                    i = (i - 1)|0;
                    continue;
                }

                var hitObj = buttonHits[hIdx];
                i = (i - 1)|0;

                if (!hitObj) {
                    continue;
                }

                var button = hitObj.button;
                if (!button) {
                    continue;
                }

                var actions = button.getActions();
                if (!actions) {
                    continue;
                }

                var aLen = actions.length|0;
                if (!aLen) {
                    continue;
                }

                for (var aIdx in actions) {
                    if (!actions.hasOwnProperty(aIdx)) {
                        continue;
                    }

                    var cond         = actions[aIdx];
                    var CondKeyPress = cond.CondKeyPress|0;
                    switch (CondKeyPress) {
                        case 1: // left arrow
                            CondKeyPress = 37;
                            break;
                        case 2: // right arrow
                            CondKeyPress = 39;
                            break;
                        case 3: // home
                            CondKeyPress = 36;
                            break;
                        case 4: // end
                            CondKeyPress = 35;
                            break;
                        case 5: // insert
                            CondKeyPress = 45;
                            break;
                        case 6: // delete
                            CondKeyPress = 46;
                            break;
                        case 14: // up arrow
                            CondKeyPress = 38;
                            break;
                        case 15: // down arrow
                            CondKeyPress = 40;
                            break;
                        case 16: // page up
                            CondKeyPress = 33;
                            break;
                        case 17: // page down
                            CondKeyPress = 34;
                            break;
                        case 18: // tab
                            CondKeyPress = 9;
                            break;
                        case 19: // escape
                            CondKeyPress = 27;
                            break;
                    }

                    if (CondKeyPress !== keyCode) {
                        continue;
                    }

                    stage.buttonAction(hitObj.parent, cond.ActionScript);
                    stage.touchRender();
                    isEnd = true;
                    break;
                }

                if (isEnd) {
                    break;
                }
            }
        }
    };

    /**
     * resize event
     */
    w.addEventListener("resize", function () { Util.prototype.$resize(); });

    /**
     * unload event
     */
    w.addEventListener("unload", function ()
    {
        Util.prototype.$stages     = void 0;
        Util.prototype.$loadStages = void 0;
    });

})(window);
/**
 * @param mc
 * @constructor
 */
var Color = function (mc)
{
    this.movieClip = mc;
    this.variables = {};
};

/**
 *
 * @param name
 * @returns {*}
 */
Color.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Color.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 * @param int
 * @param alpha
 * @returns {{R: number, G: number, B: number, A: number}}
 */
Color.prototype.intToRGBA = function (int, alpha)
{
    alpha = alpha || 100;
    return {
        R: (int & 0xff0000) >> 16,
        G: (int & 0x00ff00) >> 8,
        B: (int & 0x0000ff),
        A: (alpha / 100)
    };
};

/**
 * @param offset
 */
Color.prototype.setRGB = function (offset)
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        offset |= 0;
        var obj = _this.intToRGBA(offset);
        var colorTransform = mc.getOriginColorTransform();
        if (colorTransform) {
            var transform = [obj.R, obj.G, obj.B, obj.A * 255, 0, 0, 0, 0];
            var multiColor = mc.cloneArray(transform);
            var color = mc.multiplicationColor(colorTransform, multiColor);
            mc.setColorTransform(color);
        }
    }
};

/**
 * @returns {*[]|*}
 */
Color.prototype.getTransform = function ()
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        return mc.getColorTransform();
    }
    return undefined;
};

/**
 * @param obj
 */
Color.prototype.setTransform = function (obj)
{
    var _this = this;
    var mc = _this.movieClip;
    if (mc instanceof MovieClip) {
        var colorTransform = mc.getOriginColorTransform();
        var transform = [
            obj.rb, obj.gb, obj.bb, obj.ab,
            obj.ra, obj.ga, obj.ba, obj.aa
        ];
        var multiColor = mc.cloneArray(transform);
        var color = mc.multiplicationColor(colorTransform, multiColor);
        mc.setColorTransform(color);
    }
};
/**
 * @constructor
 */
var Global = function ()
{
    this.variables = {};
};

/**
 *
 * @param name
 * @returns {*}
 */
Global.prototype.getVariable = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 * @returns {*}
 */
Global.prototype.setVariable = function (name, value)
{
    this.variables[name] = value;
};

/**
 * @param name
 * @returns {*}
 */
Global.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Global.prototype.setProperty = function (name, value)
{
    this.variables[name] = value;
};
/**
 * @constructor
 */
var Key = function ()
{
    this.variables  = {};
    this._listeners = [];
};

/**
 * util
 */
Key.prototype = Object.create(Util.prototype);
Key.prototype.constructor = Key;

/**
 * properties
 */
Object.defineProperties(Key.prototype, {
    onKeyDown: {
        get: function () {
            return this.getProperty("onKeyDown");
        },
        set: function (onKeyDown) {
            this.setProperty("onKeyDown", onKeyDown);
        }
    },
    onKeyUp: {
        get: function () {
            return this.getProperty("onKeyUp");
        },
        set: function (onKeyUp) {
            this.setProperty("onKeyUp", onKeyUp);
        }
    }
});

/**
 * @type {number}
 */
Key.prototype.BACKSPACE = 8;
Key.prototype.CAPSLOCK  = 20;
Key.prototype.CONTROL   = 17;
Key.prototype.DELETEKEY = 46;
Key.prototype.DOWN      = 40;
Key.prototype.END       = 35;
Key.prototype.ENTER     = 13;
Key.prototype.ESCAPE    = 27;
Key.prototype.HOME      = 36;
Key.prototype.INSERT    = 45;
Key.prototype.LEFT      = 37;
Key.prototype.PGDN      = 34;
Key.prototype.PGDN      = 34;
Key.prototype.PGUP      = 33;
Key.prototype.RIGHT     = 39;
Key.prototype.SHIFT     = 16;
Key.prototype.SPACE     = 32;
Key.prototype.TAB       = 9;
Key.prototype.UP        = 38;

/**
 * @param name
 * @returns {*}
 */
Key.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Key.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 *
 * @param listener
 * @returns {boolean}
 */
Key.prototype.addListener = function (listener)
{
    var onKeyDown = listener.onKeyDown;
    if (onKeyDown) {
        this.onKeyDown = onKeyDown;
    }

    var onKeyUp = listener.onKeyUp;
    if (onKeyUp) {
        this.onKeyUp = onKeyUp;
    }

    return true;
};

/**
 * @param code
 * @returns {boolean}
 */
Key.prototype.isDown = function (code)
{
    return (this.getCode() === code);
};

/**
 * @returns {*}
 */
Key.prototype.getCode = function ()
{
    if (!this.$keyEvent) {
        return null;
    }

    var keyCode = 0 | this.$keyEvent.keyCode;
    if (96 <= keyCode && keyCode <= 105) {
        var n = 0 | keyCode - 96;
        switch (n) {
            case 0:
                keyCode = 48;
                break;
            case 1:
                keyCode = 49;
                break;
            case 2:
                keyCode = 50;
                break;
            case 3:
                keyCode = 51;
                break;
            case 4:
                keyCode = 52;
                break;
            case 5:
                keyCode = 53;
                break;
            case 6:
                keyCode = 54;
                break;
            case 7:
                keyCode = 55;
                break;
            case 8:
                keyCode = 56;
                break;
            case 9:
                keyCode = 57;
                break;
        }
    }
    return keyCode;
};

Util.prototype.$keyClass = new Key();
/**
 * @constructor
 */
var LoadVars = function ()
{
    var _this = this;
    _this.xmlHttpRequest = new XMLHttpRequest();
    _this.variables = {};
    _this.target = _this;
    _this.events = {
        onData: undefined,
        onLoad: undefined
    };
};

/**
 * properties
 */
Object.defineProperties(LoadVars.prototype,
    {
        onData: {
            get: function () {
                return this.getProperty("onData");
            },
            set: function (onData) {
                this.setProperty("onData", onData);
            }
        },
        onLoad: {
            get: function () {
                return this.getProperty("onLoad");
            },
            set: function (onLoad) {
                this.setProperty("onLoad", onLoad);
            }
        }
    });

/**
 * @param name
 * @returns {*}
 */
LoadVars.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
LoadVars.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 * @param url
 * @returns {boolean}
 */
LoadVars.prototype.load = function (url)
{
    var _this = this;
    var xmlHttpRequest = _this.xmlHttpRequest;
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = xmlHttpRequest.readyState;
        if (readyState === 4) {
            var src = decodeURIComponent(xmlHttpRequest.responseText);
            _this.decode(src);
            var onData = _this.onData;
            if (typeof onData === "function") {
                onData.apply(src, [src]);
            }

            var onLoad;
            var status = xmlHttpRequest.status;
            switch (status) {
                case 200:
                case 304:
                    onLoad = _this.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [true]);
                    }
                    return true;
                default:
                    onLoad = _this.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [false]);
                    }
                    return false;
            }
        }
    };
    xmlHttpRequest.send(null);
};

/**
 * @param url
 * @param target
 * @param method
 * @returns {boolean}
 */
LoadVars.prototype.send = function (url, target, method)
{
    var _this = this;
    var xmlHttpRequest = _this.xmlHttpRequest;
    var sendMethod = method ? method.toUpperCase() : "GET";
    xmlHttpRequest.open(sendMethod, url, true);
    if (sendMethod === "POST") {
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    if (target instanceof LoadVars) {
        _this.target = target;
    }
    xmlHttpRequest.send(_this.toString());
    return true;
};

/**
 * @param url
 * @param target
 * @param method
 * @returns {boolean}
 */
LoadVars.prototype.sendAndLoad = function (url, target, method)
{
    var _this = this;
    _this.send(url, target, method);
    return _this.load(url);
};

/**
 * @param header
 * @param headerValue
 */
LoadVars.prototype.addRequestHeader = function (header, headerValue)
{
    var xmlHttpRequest = this.xmlHttpRequest;
    if (header instanceof Array) {
        var length = header.length;
        for (var i = 0; i < length;) {
            xmlHttpRequest.setRequestHeader(header[i++], headerValue[i++]);
        }
    } else {
        xmlHttpRequest.setRequestHeader(header, headerValue);
    }
};

/**
 * @param queryString
 */
LoadVars.prototype.decode = function (queryString)
{
    var variables = this.variables;
    var array = queryString.split("&");
    var length = array.length;
    for (var i = 0; i < length; i++) {
        var values = array[i];
        var splitData = values.split("=");
        if (splitData.length < 1) {
            continue;
        }
        variables[String(splitData[0])] = splitData[1];
    }
};

/**
 * @returns {number}
 */
LoadVars.prototype.getBytesLoaded = function ()
{
    return 1;
};

/**
 * @returns {number}
 */
LoadVars.prototype.getBytesTotal = function ()
{
    return 1;
};

/**
 * @returns {string}
 */
LoadVars.prototype.toString = function ()
{
    var variables = this.variables;
    var array = [];
    for (var prop in variables) {
        if (!variables.hasOwnProperty(prop)) {
            continue;
        }
        array[array.length] = prop + "=" + variables[prop];
    }
    return array.join("&");
};
/**
 * @constructor
 */
var Mouse = function ()
{
    this.events = {};
};

/**
 * @returns {undefined}
 */
Mouse.prototype.show = function ()
{
    return undefined;
};

/**
 * @returns {undefined}
 */
Mouse.prototype.hide = function ()
{
    return undefined;
};

/**
 * @param listener
 */
Mouse.prototype.addListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onMouseDown", "onMouseMove", "onMouseUp"];
        var variables = listener.variables;
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            if (typeof listener[event] === "function") {
                _this.events[event] = listener[event];
            } else if (variables && typeof variables[event] === "function") {
                _this.events[event] = variables[event];
            }
        }
    }
    return true;
};

/**
 * @param listener
 */
Mouse.prototype.removeListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onMouseDown", "onMouseMove", "onMouseUp"];
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            var variables = listener.variables;
            if (typeof listener[event] === "function" ||
                (variables && typeof variables[event] === "function")
            ) {
                _this.events[event] = undefined;
            }
        }
    }
    return true;
};
/**
 * @constructor
 */
var MovieClipLoader = function ()
{
    this.events = {
        onLoadStart:    undefined,
        onLoadProgress: undefined,
        onLoadComplete: undefined,
        onLoadInit:     undefined,
        onLoadError:    undefined
    };
};

/**
 * @param url
 * @param target
 * @returns {boolean}
 */
MovieClipLoader.prototype.loadClip = function (url, target)
{
    if (!url || !target) {
        return false;
    }

    var _this = this;
    var events = _this.events;

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);

    if (isXHR2) {
        xmlHttpRequest.responseType = "arraybuffer";
    } else {
        xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
    }

    var onLoadProgress = events.onLoadProgress;
    if (!onLoadProgress) {
        onLoadProgress = _this.onLoadProgress;
    }
    if (typeof onLoadProgress === "function") {
        xmlHttpRequest.onprogress = function (e) {
            onLoadProgress.apply(_this, [target, e.loaded, e.total]);
        };
    }

    var onLoadComplete = events.onLoadComplete;
    if (!onLoadComplete) {
        onLoadComplete = _this.onLoadComplete;
    }
    if (typeof onLoadComplete === "function") {
        xmlHttpRequest.onloadend = function (e) {
            var eventStatus = e.currentTarget.status;
            if (eventStatus === 200) {
                onLoadComplete.apply(_this, [target, eventStatus]);
            }
        };
    }

    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = xmlHttpRequest.readyState;
        if (readyState === 4) {
            var status = xmlHttpRequest.status;

            var onLoadStart = events.onLoadStart;
            if (!onLoadStart) {
                onLoadStart = _this.onLoadStart;
            }
            if (typeof onLoadStart === "function") {
                xmlHttpRequest.onloadstart = function ()
                {
                    onLoadStart.apply(_this, [target]);
                };
            }

            switch (status) {
                case 200:
                case 304:
                    var _root = target.getDisplayObject("_root");
                    var rootStage = _root.getStage();
                    var data = isXHR2 ? xmlHttpRequest.response : xmlHttpRequest.responseText;

                    var loadStage = new Stage();
                    loadStages[loadStage.getId()] = loadStage;
                    target._url = url;
                    target.reset();
                    target.setLoadStage(loadStage);

                    loadStage.setParent(target);
                    loadStage.parse(data, url);
                    loadStage.stop();

                    // onLoadInit
                    var onLoadInit = events.onLoadInit;
                    if (!onLoadInit) {
                        onLoadInit = _this.onLoadInit;
                    }
                    if (typeof onLoadInit === "function") {
                        var queue = (function (as, loader, mc) {
                            return function () {
                                return as.apply(loader, [mc]);
                            };
                        })(onLoadInit, _this, target);
                        target.events.load = [queue];
                    }

                    target.addActions(rootStage);

                    break;
                default:
                    var onLoadError = events.onLoadError;
                    if (!onLoadError) {
                        onLoadError = _this.onLoadError;
                    }
                    if (typeof onLoadError === "function") {
                        onLoadError.apply(_this, [target, "error", status]);
                    }
                    break;
            }
        }
    };
    xmlHttpRequest.send(null);

    return true;
};

/**
 * @param listener
 * @returns {boolean}
 */
MovieClipLoader.prototype.addListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
        var variables = listener.variables;
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            if (typeof listener[event] === "function") {
                _this.events[event] = listener[event];
            } else if (variables && typeof variables[event] === "function") {
                _this.events[event] = variables[event];
            }
        }
    }
    return true;
};

/**
 * @param listener
 * @returns {boolean}
 */
MovieClipLoader.prototype.removeListener = function (listener)
{
    var _this = this;
    if (listener && typeof listener === "object") {
        var events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
        for (var i = 0; i < 5; i++) {
            var event = events[i];
            var variables = listener.variables;
            if (typeof listener[event] === "function" ||
                (variables && typeof variables[event] === "function")
            ) {
                _this.events[event] = undefined;
            }
        }
    }
    return true;
};

/**
 * @param target
 * @returns {{bytesLoaded: number, bytesTotal: number}}
 */
MovieClipLoader.prototype.getProgress = function (target)
{
    return {
        bytesLoaded: 0,
        bytesTotal: 0
    };
};
var OriginalObject = function () {};

/**
 * util
 */
OriginalObject.prototype = Object.create(Util.prototype);
OriginalObject.prototype.constructor = OriginalObject;




/**
 * @constructor
 */
var PlaceObject = function ()
{
    this.matrix         = [1, 0, 0, 1, 0, 0];
    this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
    this.filters        = null;
    this.blendMode      = "normal";
};

/**
 * @param src
 * @returns {Array}
 */
PlaceObject.prototype.cloneArray = function(src)
{
    var arr    = [];
    var length = 0 | src.length;

    var i = 0;
    while (i < length) {
        arr[i] = src[i];
        i = 0 | i + 1;
    }

    return arr;
};

/**
 * @param blendMode
 * @returns {String}
 */
PlaceObject.prototype.getBlendName = function (blendMode)
{
    var mode = null;
    switch (blendMode) {
        case 1:
        case "normal":
            mode = "normal";
            break;
        case 2:
        case "layer":
            mode = "layer";
            break;
        case 3:
        case "multiply":
            mode = "multiply";
            break;
        case 4:
        case "screen":
            mode = "screen";
            break;
        case 5:
        case "lighten":
            mode = "lighten";
            break;
        case 6:
        case "darken":
            mode = "darken";
            break;
        case 7:
        case "difference":
            mode = "difference";
            break;
        case 8:
        case "add":
            mode = "add";
            break;
        case 9:
        case "subtract":
            mode = "subtract";
            break;
        case 10:
        case "invert":
            mode = "invert";
            break;
        case 11:
        case "alpha":
            mode = "alpha";
            break;
        case 12:
        case "erase":
            mode = "erase";
            break;
        case 13:
        case "overlay":
            mode = "overlay";
            break;
        case 14:
        case "hardlight":
            mode = "hardlight";
            break;
    }
    return mode;
};

/**
 * @returns {PlaceObject}
 */
PlaceObject.prototype.clone = function ()
{
    var placeObject = new PlaceObject();
    placeObject.setMatrix(this.getMatrix());
    placeObject.setColorTransform(this.getColorTransform());
    placeObject.setFilters(this.getFilters());
    placeObject.setBlendMode(this.getBlendMode());
    return placeObject;
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
PlaceObject.prototype.setMatrix = function (matrix)
{
    this.matrix = this.cloneArray(matrix);
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getColorTransform = function ()
{
    return this.colorTransform;
};

/**
 * @param colorTransform
 */
PlaceObject.prototype.setColorTransform = function (colorTransform)
{
    this.colorTransform = this.cloneArray(colorTransform);
};

/**
 * @returns {*}
 */
PlaceObject.prototype.getFilters = function ()
{
    return this.filters;
};

/**
 * @param filters
 */
PlaceObject.prototype.setFilters = function (filters)
{
    this.filters = filters;
};

/**
 * @returns {string}
 */
PlaceObject.prototype.getBlendMode = function ()
{
    return this.blendMode;
};

/**
 * @param blendMode
 */
PlaceObject.prototype.setBlendMode = function (blendMode)
{
    this.blendMode = this.getBlendName(blendMode);
};
/**
 * @constructor
 */
var SharedObject = function ()
{
    this.data = null;
    this.name = null;
};

/**
 * @param name
 * @returns {SharedObject}
 */
SharedObject.prototype.getLocal = function (name)
{
    this.name = name;
    var data  = window.localStorage.getItem(name);
    if (!data) {
        data = {};
    } else {
        data = JSON.parse(data);
    }
    this.data = data;
    return this;
};

/**
 * flush
 */
SharedObject.prototype.flush = function ()
{
    window.localStorage.setItem(this.name, JSON.stringify(this.data));
    return true;
};
/**
 * @constructor
 */
var Xml = function ()
{
    this.ignoreWhite = false;
    this.loaded      = false;
    this.status      = 0;
    this.variables   = {};
};

/**
 * properties
 */
Object.defineProperties(Xml.prototype, {
    onData: {
        get: function () {
            return this.getProperty("onData");
        },
        set: function (onData) {
            this.setProperty("onData", onData);
        }
    },
    onLoad: {
        get: function () {
            return this.getProperty("onLoad");
        },
        set: function (onLoad) {
            this.setProperty("onLoad", onLoad);
        }
    }
});

/**
 * @param name
 * @returns {*}
 */
Xml.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Xml.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};


/**
 * @param url
 */
Xml.prototype.load = function (url)
{
    var self = this;
    url = "" + url;

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);

    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = 0 | xmlHttpRequest.readyState;
        if (readyState === 4) {
            var src = xmlHttpRequest.responseXML;
            var onData = self.onData;
            if (typeof onData === "function") {
                onData.apply(src, [src]);
            }

            var onLoad;
            var status = 0 | xmlHttpRequest.status;
            switch (status) {
                case 200:
                case 304:
                    onLoad = self.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [true]);
                    }
                    return true;
                default:
                    onLoad = self.onLoad;
                    if (typeof onLoad === "function") {
                        onLoad.apply(src, [false]);
                    }
                    return false;
            }
        }
    };

    xmlHttpRequest.send(null);
};

/**
 * @param url
 * @param target
 * @param method
 */
Xml.prototype.send = function (url, target, method)
{
    var sendMethod = method ? method.toUpperCase() : "GET";
    if (target) {
        console.log(target);
    }

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(sendMethod, url, true);
    xmlHttpRequest.send(null);

    return true;
};

/**
 * @param url
 * @param resultXML
 */
Xml.prototype.sendAndLoad = function (url, resultXML)
{
    this.send(url);
    return this.load(resultXML);
};
/**
 * @constructor
 */
var Swf2jsEvent = function ()
{
    this.target        = {};
    this.bubbles       = true;
    this.cancelable    = true;
    this.currentTarget = {};
    this.eventPhase    = 0;
};

/**
 * @type {string}
 */
Swf2jsEvent.prototype.ACTIVATE          = "activate";
Swf2jsEvent.prototype.CLICK             = "press";
Swf2jsEvent.prototype.CONTEXT_MENU      = "contextMenu";
Swf2jsEvent.prototype.DOUBLE_CLICK      = "doubleClick";
Swf2jsEvent.prototype.MIDDLE_CLICK      = "middleClick";
Swf2jsEvent.prototype.MIDDLE_MOUSE_DOWN = "middleMouseDown";
Swf2jsEvent.prototype.MIDDLE_MOUSE_UP   = "middleMouseUp";
Swf2jsEvent.prototype.MOUSE_DOWN        = "mouseDown";
Swf2jsEvent.prototype.MOUSE_MOVE        = "mouseMove";
Swf2jsEvent.prototype.MOUSE_OUT         = "rollOut"; // mouseOut TODO
Swf2jsEvent.prototype.MOUSE_OVER        = "rollOver"; // mouseOver TODO
Swf2jsEvent.prototype.MOUSE_UP          = "mouseUp";
Swf2jsEvent.prototype.MOUSE_WHEEL       = "mouseWheel";
Swf2jsEvent.prototype.RIGHT_CLICK       = "rightClick";
Swf2jsEvent.prototype.RIGHT_MOUSE_DOWN  = "rightMouseDown";
Swf2jsEvent.prototype.RIGHT_MOUSE_UP    = "rightMouseUp";
Swf2jsEvent.prototype.ROLL_OUT          = "rollOut";
Swf2jsEvent.prototype.ROLL_OVER         = "rollOver";
/**
 * @param type
 * @constructor
 */
var ClipEvent = function (type)
{
    this.type   = type;
    this.target = null;
    Swf2jsEvent.call(this);
};

/**
 * extends
 * @type {EventDispatcher}
 */
ClipEvent.prototype = Object.create(Swf2jsEvent.prototype);
ClipEvent.prototype.constructor = ClipEvent;

// set
Util.prototype.$clipEvent = new ClipEvent();
var Event = function () {};
/**
 * @constructor
 */
var EventDispatcher = function ()
{
    this.events = {};
    this.isLoad = false;
    this.active = false;
};

/**
 * util
 */
EventDispatcher.prototype = Object.create(OriginalObject.prototype);
EventDispatcher.prototype.constructor = EventDispatcher;

/**
 * properties
 */
Object.defineProperties(EventDispatcher.prototype, {
    onEnterFrame: {
        get: function () {
            return this.getOnEvent("onEnterFrame");
        },
        set: function (onEnterFrame) {
            this.setOnEvent("onEnterFrame", onEnterFrame);
        }
    },
    onPress: {
        get: function () {
            return this.getOnEvent("onPress");
        },
        set: function (onPress) {
            this.setOnEvent("onPress", onPress);
        }
    },
    onRelease: {
        get: function () {
            return this.getOnEvent("onRelease");
        },
        set: function (onRelease) {
            this.setOnEvent("onRelease", onRelease);
        }
    },
    onReleaseOutside: {
        get: function () {
            return this.getOnEvent("onReleaseOutside");
        },
        set: function (onReleaseOutside) {
            this.setOnEvent("onReleaseOutside", onReleaseOutside);
        }
    },
    onRollOver: {
        get: function () {
            return this.getOnEvent("onRollOver");
        },
        set: function (onRollOver) {
            this.setOnEvent("onRollOver", onRollOver);
        }
    },
    onRollOut: {
        get: function () {
            return this.getOnEvent("onRollOut");
        },
        set: function (onRollOut) {
            this.setOnEvent("onRollOut", onRollOut);
        }
    },
    onData: {
        get: function () {
            return this.getOnEvent("onData");
        },
        set: function (onData) {
            this.setOnEvent("onData", onData);
        }
    },
    onMouseDown: {
        get: function () {
            return this.getOnEvent("onMouseDown");
        },
        set: function (onMouseDown) {
            this.setOnEvent("onMouseDown", onMouseDown);
        }
    },
    onMouseUp: {
        get: function () {
            return this.getOnEvent("onMouseUp");
        },
        set: function (onMouseUp) {
            this.setOnEvent("onMouseUp", onMouseUp);
        }
    },
    onMouseMove: {
        get: function () {
            return this.getOnEvent("onMouseMove");
        },
        set: function (onMouseMove) {
            this.setOnEvent("onMouseMove", onMouseMove);
        }
    },
    onDragOut: {
        get: function () {
            return this.getOnEvent("onDragOut");
        },
        set: function (onDragOut) {
            this.setOnEvent("onDragOut", onDragOut);
        }
    },
    onDragOver: {
        get: function () {
            return this.getOnEvent("onDragOver");
        },
        set: function (onDragOver) {
            this.setOnEvent("onDragOver", onDragOver);
        }
    },
    onKeyDown: {
        get: function () {
            return this.getOnEvent("onKeyDown");
        },
        set: function (onKeyDown) {
            this.setOnEvent("onKeyDown", onKeyDown);
        }
    },
    onKeyUp: {
        get: function () {
            return this.getOnEvent("onKeyUp");
        },
        set: function (onKeyUp) {
            this.setOnEvent("onKeyUp", onKeyUp);
        }
    },
    onLoad: {
        get: function () {
            return this.getOnEvent("onLoad");
        },
        set: function (onLoad) {
            this.setOnEvent("onLoad", onLoad);
        }
    },
    onUnLoad: {
        get: function () {
            return this.getOnEvent("onUnLoad");
        },
        set: function (onUnLoad) {
            this.setOnEvent("onUnLoad", onUnLoad);
        }
    }
});

/**
 * @param type
 * @returns {*}
 */
EventDispatcher.prototype.getOnEvent = function (type)
{
    return this.variables[type];
};

/**
 * @param type
 * @param as
 */
EventDispatcher.prototype.setOnEvent = function (type, as)
{
    this.variables[type] = as;
};

/**
 * @param type
 * @param listener
 * @param useCapture
 * @param priority
 * @param useWeakReference
 */
EventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference)
{
    var events = this.events;
    if (!(type in events)) {
        events[type] = [];
    }

    var event = events[type];
    event[event.length] = listener;
};

/**
 * @param event
 * @param stage
 */
EventDispatcher.prototype.dispatchEvent = function (event, stage)
{
    var type = event.type;
    if (this.hasEventListener(type)) {
        var events   = this.events[type];
        event.target = this;
        this.setActionQueue(events, stage, [event]);
    }
};

/**
 * @param type
 * @returns {boolean}
 */
EventDispatcher.prototype.hasEventListener = function (type)
{
    return (type in this.events);
};

/**
 * @param type
 * @param listener
 * @param useCapture
 */
EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture)
{
    if (this.hasEventListener(type)) {
        var events    = this.events;
        var listeners = events[type];
        var length    = 0 | listeners.length;

        var i = 0;
        while (i < length) {
            if (listeners[i] !== listener) {
                i = 0 | i + 1;
                continue;
            }

            listeners.slice(i, 0);
            break;
        }
    }
};

/**
 * @param type
 */
EventDispatcher.prototype.willTrigger = function (type)
{
    return this.hasEventListener(type);
};

/**
 * @param as
 * @param stage
 * @param args
 */
EventDispatcher.prototype.setActionQueue = function (as, stage, args)
{
    var actions = stage.actions;
    actions[actions.length] = {as: as, mc: this, args: args};
};

/**
 *
 * @constructor
 */
var BitmapFilter = function () {};

/**
 * util
 */
BitmapFilter.prototype = Object.create(OriginalObject.prototype);
BitmapFilter.prototype.constructor = BitmapFilter;

/**
 * @param inner
 * @param knockout
 * @param hideObject
 * @returns {*}
 */
BitmapFilter.prototype.filterOperation = function (inner, knockout, hideObject)
{
    var operation = "source-over";
    if (knockout) {
        operation = (inner) ? "source-in": "source-out";
    } else {
        if (hideObject) {
            operation = (inner) ? "source-in" : "copy";
        } else {
            operation = (inner) ? "source-atop" : "destination-over";
        }
    }
    return operation;
};

/**
 * @param ctx
 * @param color
 * @param inner
 * @param strength
 * @returns {*}
 */
BitmapFilter.prototype.coatOfColor = function (ctx, color, inner, strength)
{
    var canvas  = ctx.canvas;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var i = 0;
    var R = color.R|0;
    var G = color.G|0;
    var B = color.B|0;

    var pxData = imgData.data;
    var length = pxData.length|0;

    var aKey, alpha;
    if (!inner) {
        while (i < length) {
            aKey  = (i + 3)|0;
            alpha = pxData[aKey]|0;
            if (alpha !== 0) {
                pxData[i    ] = R|0;
                pxData[i + 1] = G|0;
                pxData[i + 2] = B|0;
                pxData[aKey]  = alpha|0;
            }

            i = (i + 4)|0;
        }
    } else {
        while (i < length) {
            aKey  = (i + 3)|0;
            alpha = pxData[aKey]|0;

            if (alpha !== 255) {
                pxData[i    ] = R | 0;
                pxData[i + 1] = G | 0;
                pxData[i + 2] = B | 0;
                pxData[aKey] = (255 - alpha) | 0;
            } else {
                pxData[aKey] = 0;
            }

            i = (i + 4)|0;
        }
    }

    ctx.putImageData(imgData, 0, 0);
    if (strength > 0) {
        i = 1;
        while (i < strength) {
            i = (i + 1)|0;
            ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    return ctx;
};

/**
 * clone
 */
BitmapFilter.prototype.clone = function ()
{
    var args = [];
    for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
            continue;
        }

        args[args.length] = this[prop];
    }

    var type   = this.filterId|0;
    var filter = this;
    switch (type) {
        case 0: // DropShadowFilter
            filter = new (Function.prototype.bind.apply(DropShadowFilter, args))();
            break;
        case 1: // BlurFilter
            filter = new (Function.prototype.bind.apply(BlurFilter, args))();
            break;
        case 2: // GlowFilter
            filter = new (Function.prototype.bind.apply(GlowFilter, args))();
            break;
        case 3: // BevelFilter
            filter = new (Function.prototype.bind.apply(BevelFilter, args))();
            break;
        case 4: // GradientGlowFilter
            filter = new (Function.prototype.bind.apply(GradientGlowFilter, args))();
            break;
        case 5: // ConvolutionFilter
            filter = new (Function.prototype.bind.apply(ConvolutionFilter, args))();
            break;
        case 6: // ColorMatrixFilter
            filter = new (Function.prototype.bind.apply(ColorMatrixFilter, args))();
            break;
        case 7: // GradientBevelFilter
            filter = new (Function.prototype.bind.apply(GradientBevelFilter, args))();
            break;
    }

    return filter;
};
/**
 * @constructor
 */
var BevelFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId       = 3;

    // default
    this._distance       = 4;
    this._angle          = 45;
    this._highlightColor = 0xffffff;
    this._highlightAlpha = 1;
    this._shadowColor    = 0x000000;
    this._shadowAlpha    = 1;
    this._blurX          = 4;
    this._blurY          = 4;
    this._strength       = 1;
    this._quality        = 1;
    this._type           = "inner";
    this._knockout       = false;

    var arg = arguments;
    this.distance       = arg[0];
    this.angle          = arg[1];
    this.highlightColor = arg[2];
    this.highlightAlpha = arg[3];
    this.shadowColor    = arg[4];
    this.shadowAlpha    = arg[5];
    this.blurX          = arg[6];
    this.blurY          = arg[7];
    this.strength       = arg[8];
    this.quality        = arg[9];
    this.type           = arg[10];
    this.knockout       = arg[11];
};

/**
 * extends
 * @type {BitmapFilter}
 */
BevelFilter.prototype = Object.create(BitmapFilter.prototype);
BevelFilter.prototype.constructor = BevelFilter;

/**
 * properties
 */
Object.defineProperties(BevelFilter.prototype, {
    distance: {
        get: function () {
            return this._distance;
        },
        set: function (distance) {
            if (!this.$isNaN(distance)) {
                this._distance = distance;
            }
        }
    },
    angle: {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
                this._angle = angle % 360;
            }

        }
    },
    highlightColor: {
        get: function () {
            return this._highlightColor;
        },
        set: function (highlightColor) {
            if (highlightColor) {
                this._highlightColor = this.$toColorInt(highlightColor);
            }
        }
    },
    highlightAlpha: {
        get: function () {
            return this._highlightAlpha;
        },
        set: function (highlightAlpha) {
            if (!this.$isNaN(highlightAlpha) && 0 <= highlightAlpha && 1 >= highlightAlpha) {
                this._highlightAlpha = highlightAlpha;
            }
        }
    },
    shadowColor: {
        get: function () {
            return this._shadowColor;
        },
        set: function (shadowColor) {
            if (!shadowColor) {
                this._shadowColor = this.$toColorInt(shadowColor);
            }
        }
    },
    shadowAlpha: {
        get: function () {
            return this._shadowAlpha;
        },
        set: function (shadowAlpha) {
            if (!this.$isNaN(shadowAlpha) && 0 <= shadowAlpha && 1 >= shadowAlpha) {
                this._shadowAlpha = shadowAlpha;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 >= strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (!this.$isNaN(quality) && 0 < quality && 16 > quality) {
                this._quality = quality;
            }
        }
    },
    type: {
        get: function () {
            return this._type;
        },
        set: function (type) {
            if (typeof type === "string") {
                switch (type) {
                    case "inner":
                    case "outer":
                    case "full":
                        this._type = type;
                        break;
                    default:
                        break;
                }
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
BevelFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var filterColor, color;

    var angle          = this.angle;
    var shadowColor    = this.shadowColor;
    var shadowAlpha    = this.shadowAlpha;
    var highlightColor = this.highlightColor;
    var highlightAlpha = this.highlightAlpha;
    var blurX          = this.blurX;
    var blurY          = this.blurY;
    var strength       = this.strength;
    var quality        = this.quality;
    var knockout       = this.knockout;
    var type           = this.type;

    var r = +(angle * this.$PI / 180);

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);
    var canvas     = ctx.canvas;
    var _offsetX   = ctx._offsetX;
    var _offsetY   = ctx._offsetY;

    // shadow
    var shadowCanvas    = this.$cacheStore.getCanvas();
    shadowCanvas.width  = canvas.width|0;
    shadowCanvas.height = canvas.height|0;
    var shadowCtx       = shadowCanvas.getContext("2d");
    shadowCtx.drawImage(canvas, 0, 0);

    filterColor        = this.$intToRGBA(shadowColor);
    color              = this.$generateColorTransform(filterColor, colorTransform);
    shadowCtx          = this.coatOfColor(shadowCtx, color, false, strength);

    // highlight
    var highlightCanvas    = this.$cacheStore.getCanvas();
    highlightCanvas.width  = canvas.width;
    highlightCanvas.height = canvas.height;
    var highlightCtx       = highlightCanvas.getContext("2d");
    highlightCtx.drawImage(canvas, 0, 0);

    filterColor           = this.$intToRGBA(highlightColor);
    color                 = this.$generateColorTransform(filterColor, colorTransform);
    highlightCtx          = this.coatOfColor(highlightCtx, color, false, strength);

    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;

    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    var ox = _offsetX + this.$abs(x);
    var oy = _offsetY + this.$abs(y);

    width  = (width  + this.$abs(x) * 2)|0;
    height = (height + this.$abs(y) * 2)|0;

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;
    var synCtx       = synCanvas.getContext("2d");

    if (!knockout) {
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var xorCanvas = this.$cacheStore.getCanvas();
    xorCanvas.width  = width|0;
    xorCanvas.height = height|0;

    var xorCtx = xorCanvas.getContext("2d");
    xorCtx.setTransform(1,0,0,1,this.$abs(x),this.$abs(y));
    xorCtx.globalCompositeOperation = "xor";

    // highlight
    xorCtx.globalAlpha = highlightAlpha;
    xorCtx.drawImage(highlightCtx.canvas, cacheOffsetX - x, cacheOffsetY - y);

    // shadow
    xorCtx.globalAlpha = shadowAlpha;
    xorCtx.drawImage(shadowCtx.canvas, cacheOffsetX + x, cacheOffsetY + y);

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, ox, oy);
        operation = this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(xorCtx.canvas, 0, 0);
    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    synCtx._offsetX = +(cacheOffsetX + ox);
    synCtx._offsetY = +(cacheOffsetY + oy);

    this.$cacheStore.destroy(ctx);
    this.$cacheStore.destroy(highlightCtx);
    this.$cacheStore.destroy(shadowCtx);
    this.$cacheStore.destroy(xorCtx);

    return synCtx;
};
var BitmapFilterQuality = function () {};
BitmapFilterQuality.prototype.LOW    = 1;
BitmapFilterQuality.prototype.MEDIUM = 2;
BitmapFilterQuality.prototype.HIGH   = 3;

var BitmapFilterType = function () {};
BitmapFilterType.prototype.FULL  = "full";
BitmapFilterType.prototype.INNER = "inner";
BitmapFilterType.prototype.OUTER = "outer";
/**
 * @constructor
 */
var BlurFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 1;

    // default
    this._blurX    = 4;
    this._blurY    = 4;
    this._quality  = 1;

    var arg      = arguments;
    this.blurX   = arg[0];
    this.blurY   = arg[1];
    this.quality = arg[2];
};

/**
 * extends
 * @type {BitmapFilter}
 */
BlurFilter.prototype = Object.create(BitmapFilter.prototype);
BlurFilter.prototype.constructor = BlurFilter;

/**
 * properties
 */
Object.defineProperties(BlurFilter.prototype, {
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = +blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = +blurY;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (0 < quality && 16 > quality) {
                this._quality = quality|0;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
BlurFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var _blurX = this.blurX;
    var _blurY = this.blurY;
    if (!_blurX && !_blurY) {
        return cache;
    }

    var cacheCanvas = cache.canvas;
    var copyCanvas      = this.$cacheStore.getCanvas();
    copyCanvas.width    = cacheCanvas.width|0;
    copyCanvas.height   = cacheCanvas.height|0;

    var ctx = copyCanvas.getContext("2d");
    ctx.drawImage(cacheCanvas, 0, 0);

    ctx._offsetX = +cache._offsetX;
    ctx._offsetY = +cache._offsetY;

    var scale = stage.getScale();

    var _quality = this.quality|0;
    var STEP     = [0.5, 1.05, 1.35, 1.55, 1.75, 1.9, 2, 2.1, 2.2, 2.3, 2.5, 3, 3, 3.5, 3.5];
    var stepNo   = STEP[_quality - 1] * 2;

    var blurX = this.$ceil(_blurX * stepNo * scale * stage.ratio)|0;
    var blurY = this.$ceil(_blurY * stepNo * scale * stage.ratio)|0;

    var canvas = ctx.canvas;
    var width  = this.$ceil(canvas.width  + (blurX * 2) + 1)|0;
    var height = this.$ceil(canvas.height + (blurY * 2) + 1)|0;

    var blurCanvas    = this.$cacheStore.getCanvas();
    blurCanvas.width  = width;
    blurCanvas.height = height;

    var blurCtx = blurCanvas.getContext("2d");
    var offsetX = blurX;
    var offsetY = blurY;

    blurCtx._offsetX = +(blurX + ctx._offsetX);
    blurCtx._offsetY = +(blurY + ctx._offsetY);
    blurCtx.drawImage(canvas, offsetX, offsetY);

    var imgData = blurCtx.getImageData(0, 0, width, height);
    var px      = imgData.data;

    var radiusX = (offsetX) >> 1;
    var radiusY = (offsetY) >> 1;

    var MUL = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];
    var SHG = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];

    var mtx = MUL[radiusX]|0;
    var stx = SHG[radiusX]|0;
    var mty = MUL[radiusY]|0;
    var sty = SHG[radiusY]|0;

    var x  = 0;
    var y  = 0;
    var p  = 0;
    var yp = 0;
    var yi = 0;
    var yw = 0;
    var r  = 0;
    var g  = 0;
    var b  = 0;
    var a  = 0;
    var pr = 0;
    var pg = 0;
    var pb = 0;
    var pa = 0;

    var divx = (radiusX + radiusX + 1)|0;
    var divy = (radiusY + radiusY + 1)|0;

    var w = imgData.width|0;
    var h = imgData.height|0;

    var w1   = (w - 1)|0;
    var h1   = (h - 1)|0;
    var rxp1 = (radiusX + 1)|0;
    var ryp1 = (radiusY + 1)|0;

    var ssx = {r: 0, b: 0, g: 0, a: 0};
    var ssy = {r: 0, b: 0, g: 0, a: 0};

    var sx = ssx;
    var i = 1;
    while (i < divx) {
        i = (i + 1)|0;
        sx = sx.n = {r: 0, b: 0, g: 0, a: 0};
    }
    sx.n = ssx;

    var sy = ssy;
    i = 1;
    while (i < divy) {
        i = (i + 1)|0;
        sy = sy.n = {r: 0, b: 0, g: 0, a: 0};
    }
    sy.n = ssy;

    var si = null;
    while (_quality > 0) {
        _quality = (_quality - 1)|0;

        yw = 0;
        yi = 0;
        var ms = mtx|0;
        var ss = stx|0;

        y = (h + 1)|0;
        while (y > -1) {
            y = (y - 1)|0;

            pr = px[yi    ]|0;
            pg = px[yi + 1]|0;
            pb = px[yi + 2]|0;
            pa = px[yi + 3]|0;

            r = (rxp1 * pr)|0;
            g = (rxp1 * pg)|0;
            b = (rxp1 * pb)|0;
            a = (rxp1 * pa)|0;

            sx = ssx;
            i  = rxp1;
            while (i > -1) {
                i = (i - 1)|0;

                sx.r = pr|0;
                sx.g = pg|0;
                sx.b = pb|0;
                sx.a = pa|0;

                sx = sx.n;
            }

            i = 1;
            while (i < rxp1) {
                p = (yi + ((w1 < i ? w1 : i) << 2))|0;
                i = (i + 1)|0;

                r = (r + (sx.r = px[p    ]))|0;
                g = (g + (sx.g = px[p + 1]))|0;
                b = (b + (sx.b = px[p + 2]))|0;
                a = (a + (sx.a = px[p + 3]))|0;

                sx = sx.n;
            }

            si = ssx;
            x  = 0;
            while (x < w) {
                px[yi] = (r * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (g * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (b * ms) >>> ss;
                yi = (yi + 1)|0;

                px[yi] = (a * ms) >>> ss;
                yi = (yi + 1)|0;

                p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);

                r = (r - (si.r - (si.r = px[p    ])))|0;
                g = (g - (si.g - (si.g = px[p + 1])))|0;
                b = (b - (si.b - (si.b = px[p + 2])))|0;
                a = (a - (si.a - (si.a = px[p + 3])))|0;

                si = si.n;

                x = (x + 1)|0;
            }
            yw = (yw + w)|0;
        }

        ms = mty;
        ss = sty;
        x  = 0;
        while (x < w) {
            yi = (x << 2)|0;

            r = (ryp1 * (pr = px[yi]))|0;
            g = (ryp1 * (pg = px[(yi + 1)]))|0;
            b = (ryp1 * (pb = px[(yi + 2)]))|0;
            a = (ryp1 * (pa = px[(yi + 3)]))|0;

            sy = ssy;
            i  = 0;
            while (i < ryp1) {
                sy.r = pr|0;
                sy.g = pg|0;
                sy.b = pb|0;
                sy.a = pa|0;
                sy   = sy.n;

                i = (i + 1)|0
            }

            yp = w;
            i  = 1;
            while (i <= radiusY) {
                yi = (yp + x) << 2;

                r = (r + (sy.r = px[yi    ]))|0;
                g = (g + (sy.g = px[yi + 1]))|0;
                b = (b + (sy.b = px[yi + 2]))|0;
                a = (a + (sy.a = px[yi + 3]))|0;

                sy = sy.n;
                if (i < h1) {
                    yp = (yp + w)|0;
                }

                i = (i + 1)|0;
            }

            yi = x;
            si = ssy;
            if (_quality > 0) {
                y = 0;
                while (y < h) {
                    p = yi << 2;
                    px[p + 3] = pa = (a * ms) >>> ss;
                    if (pa > 0) {
                        px[p    ] = ((r * ms) >>> ss)|0;
                        px[p + 1] = ((g * ms) >>> ss)|0;
                        px[p + 2] = ((b * ms) >>> ss)|0;
                    } else {
                        px[p    ] = 0;
                        px[p + 1] = 0;
                        px[p + 2] = 0;
                    }

                    p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

                    r = (r - (si.r - (si.r = px[p    ])))|0;
                    g = (g - (si.g - (si.g = px[p + 1])))|0;
                    b = (b - (si.b - (si.b = px[p + 2])))|0;
                    a = (a - (si.a - (si.a = px[p + 3])))|0;

                    si = si.n;

                    yi = (yi + w)|0;
                    y  = (y + 1)|0;
                }
            } else {
                y = 0;
                while (y < h) {
                    p = yi << 2;
                    px[p + 3] = pa = (a * ms) >>> ss;
                    if (pa > 0) {
                        pa = +(255 / pa);
                        px[p    ] = (((r * ms) >>> ss) * pa)|0;
                        px[p + 1] = (((g * ms) >>> ss) * pa)|0;
                        px[p + 2] = (((b * ms) >>> ss) * pa)|0;
                    } else {
                        px[p    ] = 0;
                        px[p + 1] = 0;
                        px[p + 2] = 0;
                    }

                    p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

                    r = (r - (si.r - (si.r = px[p    ])))|0;
                    g = (g - (si.g - (si.g = px[p + 1])))|0;
                    b = (b - (si.b - (si.b = px[p + 2])))|0;
                    a = (a - (si.a - (si.a = px[p + 3])))|0;

                    si = si.n;

                    yi = (yi + w)|0;
                    y  = (y + 1)|0;
                }
            }

            x = (x + 1)|0;
        }
    }

    blurCtx.putImageData(imgData, 0, 0);
    this.$cacheStore.destroy(ctx);

    return blurCtx;
};
/**
 * @constructor
 */
var ColorMatrixFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 6;

    // default
    this._matrix = null;

    this.matrix = arguments[0];
};

/**
 * extends
 * @type {BitmapFilter}
 */
ColorMatrixFilter.prototype = Object.create(BitmapFilter.prototype);
ColorMatrixFilter.prototype.constructor = ColorMatrixFilter;

/**
 * properties
 */
Object.defineProperties(ColorMatrixFilter.prototype, {
    matrix: {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            if (matrix instanceof Array && matrix.length === 20) {
                this._matrix = matrix;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ColorMatrixFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var mtx = this.matrix;
    if (!mtx) {
        return cache;
    }

    var cacheCanvas = cache.canvas;
    var width       = cacheCanvas.width|0;
    var height      = cacheCanvas.height|0;

    var matrixCanvas    = this.$cacheStore.getCanvas();
    matrixCanvas.width  = width;
    matrixCanvas.height = height;
    var matrixCtx       = matrixCanvas.getContext("2d");
    matrixCtx.drawImage(cacheCanvas, 0, 0);

    var imageData = matrixCtx.getImageData(0, 0, width, height);
    var pxData    = imageData.data;
    var length    = pxData.length;

    // red
    var m0 =  mtx[0],  m1  = mtx[1],  m2  = mtx[2],  m3  = mtx[3],  m4  = mtx[4];

    // green
    var m5 =  mtx[5],  m6  = mtx[6],  m7  = mtx[7],  m8  = mtx[8],  m9  = mtx[9];

    // blue
    var m10 = mtx[10], m11 = mtx[11], m12 = mtx[12], m13 = mtx[13], m14 = mtx[14];

    // alpha
    var m15 = mtx[15], m16 = mtx[16], m17 = mtx[17], m18 = mtx[18], m19 = mtx[19];

    var R, G, B, A;
    var i = 0;
    while (i < length) {
        R = pxData[i    ]|0;
        G = pxData[i + 1]|0;
        B = pxData[i + 2]|0;
        A = pxData[i + 3]|0;

        pxData[i    ] = ((R * m0)  + (G * m1)  + (B * m2)  + (A * m3)  + m4 )|0;
        pxData[i + 1] = ((R * m5)  + (G * m6)  + (B * m7)  + (A * m8)  + m9 )|0;
        pxData[i + 2] = ((R * m10) + (G * m11) + (B * m12) + (A * m13) + m14)|0;
        pxData[i + 3] = ((R * m15) + (G * m16) + (B * m17) + (A * m18) + m19)|0;

        i = (i + 4)|0;
    }

    matrixCtx.putImageData(imageData, 0, 0);
    matrixCtx._offsetX = +cache._offsetX;
    matrixCtx._offsetY = +cache._offsetY;

    this.$cacheStore.destroy(cache);

    return matrixCtx;
};
/**
 * @constructor
 */
var ConvolutionFilter = function ()
{
    BitmapFilter.call(this);
    this.filterId = 5;

    // default
    this._matrixX       = 0;
    this._matrixY       = 0;
    this._matrix        = null;
    this._divisor       = 0;
    this._bias          = 0;
    this._preserveAlpha = true;
    this._clamp         = true;
    this._color         = 0;
    this._alpha         = 0;

    var arg = arguments;
    this.matrixX       = arg[0];
    this.matrixY       = arg[1];
    this.matrix        = arg[2];
    this.divisor       = arg[3];
    this.bias          = arg[4];
    this.preserveAlpha = arg[5];
    this.clamp         = arg[6];
    this.color         = arg[7];
    this.alpha         = arg[8];
};

/**
 * extends
 * @type {BitmapFilter}
 */
ConvolutionFilter.prototype = Object.create(BitmapFilter.prototype);
ConvolutionFilter.prototype.constructor = ConvolutionFilter;

/**
 * properties
 */
Object.defineProperties(BevelFilter.prototype, {
    matrixX: {
        get: function () {
            return this._matrixX;
        },
        set: function (matrixX) {
            if (!this.$isNaN(matrixX)) {
                this._matrixX = matrixX;
            }
        }
    },
    matrixY: {
        get: function () {
            return this._matrixY;
        },
        set: function (matrixY) {
            if (!this.$isNaN(matrixY)) {
                this._matrixY = matrixY;
            }
        }
    },
    matrix: {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            if (matrix instanceof Array) {
                this._matrix = matrix;
            }
        }
    },
    divisor: {
        get: function () {
            return this._divisor;
        },
        set: function (divisor) {
            if (!this.$isNaN(divisor)) {
                this._divisor = divisor;
            }
        }
    },
    bias: {
        get: function () {
            return this._bias;
        },
        set: function (bias) {
            if (!this.$isNaN(bias)) {
                this._bias = bias;
            }
        }
    },
    preserveAlpha: {
        get: function () {
            return this._preserveAlpha;
        },
        set: function (preserveAlpha) {
            if (typeof preserveAlpha === "boolean") {
                this._preserveAlpha = preserveAlpha;
            }
        }
    },
    clamp: {
        get: function () {
            return this._clamp;
        },
        set: function (clamp) {
            if (typeof clamp === "boolean") {
                this._clamp = clamp;
            }
        }
    },
    color: {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (color) {
                this._color = this.$toColorInt(color);
            }
        }
    },
    alpha: {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
                this._alpha = alpha;
            }
        }
    }
});


/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ConvolutionFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{


    return cache;
};
var DisplacementMapFilter = function () {};
var DisplacementMapFilterMode = function () {};
DisplacementMapFilterMode.prototype.CLAMP  = "clamp";
DisplacementMapFilterMode.prototype.COLOR  = "color";
DisplacementMapFilterMode.prototype.IGNORE = "ignore";
DisplacementMapFilterMode.prototype.WRAP   = "wrap";
/**
 * @constructor
 */
var DropShadowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 0;

    // default
    this._distance   = 4;
    this._angle      = 45;
    this._color      = 0;
    this._alpha      = 1;
    this._blurX      = 4;
    this._blurY      = 4;
    this._strength   = 1;
    this._quality    = 1;
    this._inner      = false;
    this._knockout   = false;
    this._hideObject = false;

    var arg = arguments;
    this.distance   = arg[0];
    this.angle      = arg[1];
    this.color      = arg[2];
    this.alpha      = arg[3];
    this.blurX      = arg[4];
    this.blurY      = arg[5];
    this.strength   = arg[6];
    this.quality    = arg[7];
    this.inner      = arg[8];
    this.knockout   = arg[9];
    this.hideObject = arg[10];
};

/**
 * extends
 * @type {BitmapFilter}
 */
DropShadowFilter.prototype = Object.create(BitmapFilter.prototype);
DropShadowFilter.prototype.constructor = DropShadowFilter;

/**
 * properties
 */
Object.defineProperties(DropShadowFilter.prototype, {
    distance: {
        get: function () {
            return this._distance;
        },
        set: function (distance) {
            if (!this.$isNaN(distance)) {
                this._distance = distance;
            }
        }
    },
    angle: {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
                this._angle = angle % 360;
            }
        }
    },
    color: {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (color) {
                this._color = this.$toColorInt(color);
            }
        }
    },
    alpha: {
        get: function () {
            return this._alphae;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
                this._alphae = alpha;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 > strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (0 < quality && 16 > quality) {
                this._quality = quality;
            }
        }
    },
    inner: {
        get: function () {
            return this._inner;
        },
        set: function (inner) {
            if (typeof inner === "boolean") {
                this._inner = inner;
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
            }
        }
    },
    hideObject: {
        get: function () {
            return this._hideObject;
        },
        set: function (hideObject) {
            if (typeof hideObject === "boolean") {
                this._hideObject = hideObject;
            }
        }
    }
});


/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 */
DropShadowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (strength <= 0) {
        return cache;
    }

    var quality = this.quality;
    var inner   = this.inner;

    var r = +(this.angle * this.$PI / 180);
    var blurX = this.blurX;
    var blurY = this.blurY;

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);

    // dropShadow
    var filterColor = this.$intToRGBA(this.color);
    var color       = this.$generateColorTransform(filterColor, colorTransform);
    ctx             = this.coatOfColor(ctx, color, inner, strength);

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX     = ctx._offsetX;
    var _offsetY     = ctx._offsetY;

    var canvas = ctx.canvas;
    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    width  = (width  + this.$abs(x))|0;
    height = (height + this.$abs(y))|0;

    var cx = _offsetX;
    var cy = _offsetY;
    var dx = 0;
    var dy = 0;
    if (x < 0) {
        cx = (cx - x)|0;
    } else if (x > 0) {
        dx = x|0;
    }

    if (y < 0) {
        cy = (cy - y)|0;
    } else if (y > 0) {
        dy = y|0;
    }

    var synCanvas = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, cx, cy);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var knockout   = this.knockout;
    var hideObject = this.hideObject;
    synCtx.globalCompositeOperation = this.filterOperation(inner, knockout, hideObject);

    if (inner) {
        var innerCanvas    = this.$cacheStore.getCanvas();
        innerCanvas.width  = width;
        innerCanvas.height = height;
        var innerCtx       = innerCanvas.getContext("2d");

        // back
        innerCtx.fillStyle = "rgba(" +
            filterColor.R + "," +
            filterColor.G + "," +
            filterColor.B + "," +
            filterColor.A + ")";
        innerCtx.fillRect(0, 0, width, height);

        // mask
        innerCtx.globalCompositeOperation = "destination-out";
        innerCtx.fillStyle = "black";
        innerCtx.fillRect(cacheOffsetX + dx, cacheOffsetY + dy, canvas.width, canvas.height);

        innerCtx.globalCompositeOperation = "source-over";
        innerCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

        synCtx.drawImage(innerCtx.canvas, 0, 0);
        this.$cacheStore.destroy(innerCtx);

    } else {
        synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);
    }

    synCtx._offsetX = +(cacheOffsetX + cx);
    synCtx._offsetY = +(cacheOffsetY + cy);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};
/**
 * @constructor
 */
var GlowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 2;

    // default
    this._color    = 0xff0000;
    this._alpha    = 1;
    this._blurX    = 6;
    this._blurY    = 6;
    this._strength = 2;
    this._quality  = 1;
    this._inner    = false;
    this._knockout = false;

    var arg       = arguments;
    this.color    = arg[0];
    this.alpha    = arg[1];
    this.blurX    = arg[2];
    this.blurY    = arg[3];
    this.strength = arg[4];
    this.quality  = arg[5];
    this.inner    = arg[6];
    this.knockout = arg[7];
};

/**
 * extends
 * @type {BitmapFilter}
 */
GlowFilter.prototype = Object.create(BitmapFilter.prototype);
GlowFilter.prototype.constructor = GlowFilter;

/**
 * properties
 */
Object.defineProperties(GlowFilter.prototype, {
    color: {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (color) {
                this._color = this.$toColorInt(color);
            }
        }
    },
    alpha: {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            if (!this.$isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
                this._alpha = +alpha;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = +blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = +blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 > strength) {
                this._strength = +strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (!this.$isNaN(quality) && 0 < quality && 16 > quality) {
                this._quality = quality|0;
            }
        }
    },
    inner: {
        get: function () {
            return this._inner;
        },
        set: function (inner) {
            if (typeof inner === "boolean") {
                this._inner = inner;
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
GlowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (strength <= 0) {
        return cache;
    }

    var blurFilter = new BlurFilter(this.blurX, this.blurY, this.quality);

    var ctx    = blurFilter.render(cache, matrix, colorTransform, stage);
    var width  = (ctx.canvas.width  + cache._offsetX)|0;
    var height = (ctx.canvas.height + cache._offsetY)|0;

    var filterColor = this.$intToRGBA(this.color);
    var color       = this.$generateColorTransform(filterColor, colorTransform);

    ctx = this.coatOfColor(ctx, color, this.inner, strength);

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width;
    synCanvas.height = height;

    var synCtx = synCanvas.getContext("2d");
    synCtx.drawImage(cache.canvas, ctx._offsetX, ctx._offsetY);
    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    synCtx.globalCompositeOperation = this.filterOperation(this.inner, this.knockout);
    synCtx.drawImage(ctx.canvas, cache._offsetX, cache._offsetY);
    synCtx._offsetX = +(cache._offsetX + ctx._offsetX);
    synCtx._offsetY = +(cache._offsetY + ctx._offsetY);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};
/**
 * @constructor
 */
var GradientBevelFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 7;

    // default
    this._distance = 4;
    this._angle    = 45;
    this._colors   = null;
    this._alphas   = null;
    this._ratios   = null;
    this._blurX    = 4;
    this._blurY    = 4;
    this._strength = 1;
    this._quality  = 1;
    this._type     = "inner";
    this._knockout = false;

    var arg = arguments;
    this.distance = arg[0];
    this.angle    = arg[1];
    this.colors   = arg[2];
    this.alphas   = arg[3];
    this.ratios   = arg[4];
    this.blurX    = arg[5];
    this.blurY    = arg[6];
    this.strength = arg[7];
    this.quality  = arg[8];
    this.type     = arg[9];
    this.knockout = arg[10];
};

/**
 * extends
 * @type {BitmapFilter}
 */
GradientBevelFilter.prototype = Object.create(BitmapFilter.prototype);
GradientBevelFilter.prototype.constructor = GradientBevelFilter;

/**
 * properties
 */
Object.defineProperties(GradientBevelFilter.prototype, {
    distance: {
        get: function () {
            return this._distance;
        },
        set: function (distance) {
            if (!this.$isNaN(distance)) {
                this._distance = distance;
            }
        }
    },
    angle: {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
                this._angle = angle % 360;
            }

        }
    },
    colors: {
        get: function () {
            return this._colors;
        },
        set: function (colors) {
            if (colors instanceof Array) {
                this._colors = colors;
            }
        }
    },
    alphas: {
        get: function () {
            return this._alphas;
        },
        set: function (alphas) {
            if (alphas instanceof Array) {
                this._alphas = alphas;
            }
        }
    },
    ratios: {
        get: function () {
            return this._ratios;
        },
        set: function (ratios) {
            if (ratios instanceof Array) {
                this._ratios = ratios;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 >= strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (!this.$isNaN(quality) && 0 < quality && 16 > quality) {
                this._quality = quality;
            }
        }
    },
    type: {
        get: function () {
            return this._type;
        },
        set: function (type) {
            if (typeof type === "string") {
                switch (type) {
                    case "inner":
                    case "outer":
                    case "full":
                        this._type = type;
                        break;
                    default:
                        break;
                }
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
GradientBevelFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var length, i, css, color, rgba, imageData, pxGrad, pxData, idx;

    var angle    = this.angle;
    var blurX    = this.blurX;
    var blurY    = this.blurY;
    var strength = this.strength;
    var quality  = this.quality;
    var knockout = this.knockout;
    var type     = this.type;

    var r = +(angle * this.$PI / 180);

    // blur
    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx        = blurFilter.render(cache, matrix, colorTransform, stage);
    if (strength > 0) {
        i = 1;
        while (i < strength) {
            i = (i + 1)|0;
            ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    var canvas     = ctx.canvas;
    var _offsetX   = ctx._offsetX;
    var _offsetY   = ctx._offsetY;

    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;

    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;

    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    var ox = _offsetX + this.$abs(x);
    var oy = _offsetY + this.$abs(y);

    width  = (width  + this.$abs(x) * 2)|0;
    height = (height + this.$abs(y) * 2)|0;

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;
    var synCtx       = synCanvas.getContext("2d");

    if (!knockout) {
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    // gradient
    var ratios = this.ratios;
    var colors = this.colors;
    var alphas = this.alphas;

    // shadow gradient canvas
    var gCanvas    = this.$cacheStore.getCanvas();
    gCanvas.width  = 512;
    gCanvas.heigth = 1;
    var gCtx       = gCanvas.getContext("2d");

    css    = gCtx.createLinearGradient(0, 0, 511, 0);
    length = ratios.length;

    i = 0;
    while (i < length) {
        color = this.$intToRGBA(colors[i], alphas[i] * 100);
        color = this.$generateColorTransform(color, colorTransform);
        rgba  = "rgba("+color.R+","+color.G+","+color.B+","+color.A+")";

        // set
        css.addColorStop(ratios[i], rgba);

        i = (i + 1)|0;
    }
    gCtx.fillStyle = css;
    gCtx.fillRect(0, 0, 512, 1);
    imageData = gCtx.getImageData(0, 0, 512, 1);
    pxGrad    = imageData.data;

    // shadow
    var shadowCanvas    = this.$cacheStore.getCanvas();
    shadowCanvas.width  = width|0;
    shadowCanvas.height = height|0;
    var shadowCtx       = shadowCanvas.getContext("2d");
    shadowCtx.setTransform(1,0,0,1,this.$abs(x),this.$abs(y));
    shadowCtx.globalCompositeOperation = "source-out";

    // highlight
    shadowCtx.drawImage(canvas, cacheOffsetX - x, cacheOffsetY - y);
    // shadow
    shadowCtx.drawImage(canvas, cacheOffsetX + x, cacheOffsetY + y);

    imageData = shadowCtx.getImageData(0, 0, width, height);
    pxData    = imageData.data;

    i = 0;
    length = pxData.length;
    while (i < length) {
        idx = ((256 - pxData[i + 3]) * 4)|0;
        if (idx) {
            pxData[i    ] = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    shadowCtx.putImageData(imageData, 0, 0);

    // highlight
    var highlightCanvas    = this.$cacheStore.getCanvas();
    highlightCanvas.width  = width|0;
    highlightCanvas.height = height|0;
    var highlightCtx       = highlightCanvas.getContext("2d");
    highlightCtx.setTransform(1,0,0,1,this.$abs(x),this.$abs(y));
    highlightCtx.globalCompositeOperation = "source-out";

    // shadow
    highlightCtx.drawImage(canvas, cacheOffsetX + x, cacheOffsetY + y);
    // highlight
    highlightCtx.drawImage(canvas, cacheOffsetX - x, cacheOffsetY - y);

    imageData = highlightCtx.getImageData(0, 0, width, height);
    pxData    = imageData.data;

    i = 0;
    length = pxData.length;
    while (i < length) {
        idx = ((255 + pxData[i + 3]) * 4)|0;
        if (idx) {
            pxData[i    ] = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    highlightCtx.putImageData(imageData, 0, 0);

    var xorCanvas = this.$cacheStore.getCanvas();
    xorCanvas.width  = width|0;
    xorCanvas.height = height|0;

    var xorCtx = xorCanvas.getContext("2d");
    xorCtx.globalCompositeOperation = "xor";
    // highlight
    xorCtx.drawImage(highlightCtx.canvas, 0, 0);
    // shadow
    xorCtx.drawImage(shadowCtx.canvas, 0, 0);

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, ox, oy);
        operation = this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(xorCtx.canvas, 0, 0);
    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, ox, oy);
    }

    synCtx._offsetX = +(cacheOffsetX + ox);
    synCtx._offsetY = +(cacheOffsetY + oy);

    this.$cacheStore.destroy(ctx);
    this.$cacheStore.destroy(highlightCtx);
    this.$cacheStore.destroy(shadowCtx);
    this.$cacheStore.destroy(xorCtx);

    return synCtx;
};
/**
 * @constructor
 */
var GradientGlowFilter = function ()
{
    BitmapFilter.call(this);

    this.filterId = 4;

    // default
    this._distance = 4;
    this._angle    = 45;
    this._colors   = null;
    this._alphas   = null;
    this._ratios   = null;
    this._blurX    = 4;
    this._blurY    = 4;
    this._strength = 1;
    this._quality  = 1;
    this._type     = "inner";
    this._knockout = false;

    var arg = arguments;
    this.distance = arg[0];
    this.angle    = arg[1];
    this.colors   = arg[2];
    this.alphas   = arg[3];
    this.ratios   = arg[4];
    this.blurX    = arg[5];
    this.blurY    = arg[6];
    this.strength = arg[7];
    this.quality  = arg[8];
    this.type     = arg[9];
    this.knockout = arg[10];

};

/**
 * extends
 * @type {BitmapFilter}
 */
GradientGlowFilter.prototype = Object.create(BitmapFilter.prototype);
GradientGlowFilter.prototype.constructor = GradientGlowFilter;

/**
 * properties
 */
Object.defineProperties(GradientGlowFilter.prototype, {
    distance: {
        get: function () {
            return this._distance;
        },
        set: function (distance) {
            if (!this.$isNaN(distance)) {
                this._distance = distance;
            }
        }
    },
    angle: {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            if (!this.$isNaN(angle) && 0 <= angle && 360 >= angle) {
                this._angle = angle % 360;
            }
        }
    },
    colors: {
        get: function () {
            return this._colors;
        },
        set: function (colors) {
            if (colors instanceof Array) {
                this._colors = colors;
            }
        }
    },
    alphas: {
        get: function () {
            return this._alphas;
        },
        set: function (alphas) {
            if (alphas instanceof Array) {
                this._alphas = alphas;
            }
        }
    },
    ratios: {
        get: function () {
            return this._ratios;
        },
        set: function (ratios) {
            if (ratios instanceof Array) {
                this._ratios = ratios;
            }
        }
    },
    blurX: {
        get: function () {
            return this._blurX;
        },
        set: function (blurX) {
            if (!this.$isNaN(blurX) && 0 <= blurX && 256 > blurX) {
                this._blurX = blurX;
            }
        }
    },
    blurY: {
        get: function () {
            return this._blurY;
        },
        set: function (blurY) {
            if (!this.$isNaN(blurY) && 0 <= blurY && 256 > blurY) {
                this._blurY = blurY;
            }
        }
    },
    strength: {
        get: function () {
            return this._strength;
        },
        set: function (strength) {
            if (!this.$isNaN(strength) && 0 <= strength && 256 > strength) {
                this._strength = strength;
            }
        }
    },
    quality: {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            if (0 < quality && 16 > quality) {
                this._quality = quality;
            }
        }
    },
    type: {
        get: function () {
            return this._type;
        },
        set: function (type) {
            if (typeof type === "string") {
                switch (type) {
                    case "inner":
                    case "outer":
                    case "full":
                        this._type = type;
                        break;
                    default:
                        break;
                }
            }
        }
    },
    knockout: {
        get: function () {
            return this._knockout;
        },
        set: function (knockout) {
            if (typeof knockout === "boolean") {
                this._knockout = knockout;
            }
        }
    }
});

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
GradientGlowFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    var strength = this.strength;
    if (!strength) {
        return cache;
    }

    // gradient
    var ratios = this.ratios;
    var colors = this.colors;
    var alphas = this.alphas;

    // gradient canvas
    var gCanvas = this.$cacheStore.getCanvas();
    gCanvas.width  = 256;
    gCanvas.heigth = 1;
    var gCtx = gCanvas.getContext("2d");

    var css = gCtx.createLinearGradient(0, 0, 255, 0);
    var length = ratios.length;
    var i = 0;
    while (i < length) {
        var color = this.$intToRGBA(colors[i], alphas[i] * 100);
        color = this.$generateColorTransform(color, colorTransform);
        var rgba = "rgba("+color.R+","+color.G+","+color.B+","+color.A+")";

        // set
        css.addColorStop(ratios[i], rgba);

        i = (i + 1)|0;
    }
    gCtx.fillStyle = css;
    gCtx.fillRect(0, 0, 256, 1);
    var imageData = gCtx.getImageData(0, 0, 256, 1);
    var pxGrad    = imageData.data;

    var angle    = this.angle;
    var blurX    = this.blurX;
    var blurY    = this.blurY;
    var quality  = this.quality;
    var knockout = this.knockout;
    var type     = this.type;

    var blurFilter = new BlurFilter(blurX, blurY, quality);
    var ctx = blurFilter.render(cache, matrix, colorTransform, stage);
    if (strength > 0) {
        i = 1;
        while (i < strength) {
            i = (i + 1)|0;
            ctx.drawImage(ctx.canvas, 0, 0);
        }
    }

    // synthesis
    var cacheOffsetX = cache._offsetX;
    var cacheOffsetY = cache._offsetY;
    var _offsetX     = ctx._offsetX;
    var _offsetY     = ctx._offsetY;

    var canvas = ctx.canvas;
    imageData  = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pxData = imageData.data;

    i = 0;
    length = pxData.length;
    var idx;
    while (i < length) {
        idx  = (pxData[i + 3] * 4)|0;
        if (idx) {
            pxData[i    ] = pxGrad[idx    ];
            pxData[i + 1] = pxGrad[idx + 1];
            pxData[i + 2] = pxGrad[idx + 2];
        }

        i = (i + 4)|0;
    }
    ctx.putImageData(imageData, 0, 0);
    canvas = ctx.canvas;

    var r = +(angle * this.$PI / 180);
    var distance = this.distance;
    var scale    = stage.getScale();
    var x = this.$ceil(this.$cos(r) * distance * scale * stage.ratio)|0;
    var y = this.$ceil(this.$sin(r) * distance * scale * stage.ratio)|0;

    var width  = (canvas.width  + cacheOffsetX)|0;
    var height = (canvas.height + cacheOffsetY)|0;
    width      = (width  + this.$abs(x))|0;
    height     = (height + this.$abs(y))|0;

    var cx = _offsetX;
    var cy = _offsetY;
    var dx = 0;
    var dy = 0;
    if (x < 0) {
        cx = (cx - x)|0;
    } else if (x > 0) {
        dx = x|0;
    }

    if (y < 0) {
        cy = (cy - y)|0;
    } else if (y > 0) {
        dy = y|0;
    }

    var synCanvas    = this.$cacheStore.getCanvas();
    synCanvas.width  = width|0;
    synCanvas.height = height|0;

    var synCtx = synCanvas.getContext("2d");
    if (!knockout) {
        synCtx.drawImage(cache.canvas, cx, cy);
    }

    synCtx.globalAlpha = this.alpha;
    if (strength < 1) {
        synCtx.globalAlpha = +(synCtx.globalAlpha * strength);
    }

    var isInner = (type === "inner" || type === "full");
    var isOuter = (type === "outer" || type === "full");
    var operation;
    if (isInner && isOuter) {
        operation = "source-over";
    } else if (isInner) {
        synCtx.drawImage(cache.canvas, cx, cy);
        operation = this.filterOperation(true, knockout);
    } else if (isOuter) {
        operation = "destination-over";
    }

    synCtx.globalCompositeOperation = operation;
    synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

    if (!isInner && isOuter && knockout) {
        synCtx.globalCompositeOperation = "destination-out";
        synCtx.drawImage(cache.canvas, cx, cy);
    }

    synCtx._offsetX = +(cacheOffsetX + cx);
    synCtx._offsetY = +(cacheOffsetY + cy);

    this.$cacheStore.destroy(ctx);

    return synCtx;
};
var ShaderFilter = function () {};

/**
 * extends
 * @type {BitmapFilter}
 */
ShaderFilter.prototype = Object.create(BitmapFilter.prototype);
ShaderFilter.prototype.constructor = ShaderFilter;

/**
 * @param cache
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
ShaderFilter.prototype.render = function (cache, matrix, colorTransform, stage)
{
    return cache;
};
/**
 * @constructor
 */
var AccessibilityProperties = function () {};
/**
 * @constructor
 */
var DisplayObject = function ()
{
    EventDispatcher.call(this);
    this.initialize();
};

/**
 * extends
 * @type {EventDispatcher}
 */
DisplayObject.prototype = Object.create(EventDispatcher.prototype);
DisplayObject.prototype.constructor = DisplayObject;

/**
 * properties
 */
Object.defineProperties(DisplayObject.prototype, {
    accessibilityProperties: {
        value: new AccessibilityProperties()
    },
    alpha: {
        get: function () {
            return this.getAlpha() / 100;
        },
        set: function (alpha) {
            this.setAlpha(alpha * 100);
        }
    },
    _alpha: {
        get: function () {
            return this.getAlpha();
        },
        set: function (alpha) {
            this.setAlpha(alpha);
        }
    },
    name: {
        get: function () {
            return this.getName();
        },
        set: function (name) {
            this.setName(name);
        }
    },
    _name: {
        get: function () {
            return this.getName();
        },
        set: function (name) {
            this.setName(name);
        }
    },
    blendMode: {
        get: function () {
            return this.getBlendMode();
        },
        set: function (blendMode) {
            this.setBlendMode(blendMode);
        }
    },
    filters: {
        get: function () {
            return this.getFilters();
        },
        set: function (filters) {
            this.setFilters(filters);
        }
    },
    _visible: {
        get: function () {
            return this.getVisible();
        },
        set: function (visible) {
            this.setVisible(visible);
        }
    },
    visible: {
        get: function () {
            return this.getVisible();
        },
        set: function (visible) {
            this.setVisible(visible);
        }
    },
    _rotation: {
        get: function () {
            return this.getRotation();
        },
        set: function (rotation) {
            this.setRotation(rotation);
        }
    },
    rotation: {
        get: function () {
            return this.getRotation();
        },
        set: function (rotation) {
            this.setRotation(rotation);
        }
    },
    _height: {
        get: function () {
            return this.getHeight();
        },
        set: function (height) {
            this.setHeight(height);
        }
    },
    height: {
        get: function () {
            return this.getHeight();
        },
        set: function (height) {
            this.setHeight(height);
        }
    },
    _width: {
        get: function () {
            return this.getWidth();
        },
        set: function (width) {
            this.setWidth(width);
        }
    },
    width: {
        get: function () {
            return this.getWidth();
        },
        set: function (width) {
            this.setWidth(width);
        }
    },
    _x: {
        get: function () {
            return this.getX();
        },
        set: function (x) {
            this.setX(x);
        }
    },
    x: {
        get: function () {
            return this.getX();
        },
        set: function (x) {
            this.setX(x);
        }
    },
    _y: {
        get: function () {
            return this.getY();
        },
        set: function (y) {
            this.setY(y);
        }
    },
    y: {
        get: function () {
            return this.getY();
        },
        set: function (y) {
            this.setY(y);
        }
    },
    _xscale: {
        get: function () {
            return this.getXScale();
        },
        set: function (xscale) {
            this.setXScale(xscale);
        }
    },
    scaleX: {
        get: function () {
            return this.getXScale();
        },
        set: function (xscale) {
            this.setXScale(xscale);
        }
    },
    _yscale: {
        get: function () {
            return this.getYScale();
        },
        set: function (yscale) {
            this.setYScale(yscale);
        }
    },
    scaleY: {
        get: function () {
            return this.getYScale();
        },
        set: function (yscale) {
            this.setYScale(yscale);
        }
    },
    _xmouse: {
        get: function () {
            return this.getXMouse();
        },
        set: function () {
        }
    },
    mouseX: {
        get: function () {
            return this.getXMouse();
        },
        set: function () {
        }
    },
    _ymouse: {
        get: function () {
            return this.getYMouse();
        },
        set: function () {
        }
    },
    mouseY: {
        get: function () {
            return this.getYMouse();
        },
        set: function () {
        }
    },
    mask: {
        get: function () {
            return this.getMask();
        },
        set: function (obj) {
            this.setMask(obj);
        }
    },
    enabled: {
        get: function () {
            return this.getEnabled();
        },
        set: function (enabled) {
            this.setEnabled(enabled);
        }
    },
    _parent: {
        get: function () {
            return this.getParent();
        },
        set: function (parent) {
            this.setParent(parent);
        }
    },
    parent: {
        get: function () {
            return this.getParent();
        },
        set: function (parent) {
            this.setParent(parent);
        }
    }
});

/**
 * @type {PlaceObject}
 */
DisplayObject.prototype.PlaceObject = new PlaceObject();

/**
 * initialize
 */
DisplayObject.prototype.initialize = function ()
{
    // common
    this.instanceId   = instanceId++;
    this.characterId  = 0;
    this.tagType      = 0;
    this.ratio        = 0;
    this.isMask       = false;
    this.clipDepth    = 0;
    this.isClipDepth  = false;
    this.stageId      = 0;
    this.loadStageId  = null;
    this.variables    = {};
    this.buttonStatus = "up";
    this.removeFlag   = false;
    this.parentId     = null;
    this._sprite      = null;

    // properties
    this.__visible       = true;
    this.__name          = null;
    this._url            = null;
    this._focusrect      = 1;
    this._soundbuftime   = null;
    this._totalframes    = 1;
    this._level          = 0;
    this._depth          = null;
    this._framesloaded   = 0;
    this._target         = "";
    this._lockroot       = undefined;
    this._enabled        = true;
    this._blendMode      = null;
    this._filters        = null;
    this._filterCacheKey = null;
    this._mask           = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._extend         = false;

    // avm2
    this.avm2 = null;
};

// filters
DisplayObject.prototype.flash = {
    filters: {
        DropShadowFilter:    DropShadowFilter,
        BlurFilter:          BlurFilter,
        GlowFilter:          GlowFilter,
        BevelFilter:         BevelFilter,
        GradientGlowFilter:  GradientGlowFilter,
        ConvolutionFilter:   ConvolutionFilter,
        ColorMatrixFilter:   ColorMatrixFilter,
        GradientBevelFilter: GradientBevelFilter,
        BitmapFilter:        BitmapFilter
    }
};

/**
 * @returns {string}
 */
DisplayObject.prototype.toString = function ()
{
    var target = this.getTarget();
    var array  = target.split("/");
    return  "_level0" + array.join(".");
};

/**
 * @param bounds
 * @param matrix
 * @param object
 * @returns {{xMin: Number, xMax: number, yMin: Number, yMax: number}}
 */
DisplayObject.prototype.boundsMatrix = function (bounds, matrix, object)
{
    var no   = this.$Number.MAX_VALUE;
    var xMax = -no;
    var yMax = -no;
    var xMin = no;
    var yMin = no;

    if (object) {
        xMin = +object.xMin;
        xMax = +object.xMax;
        yMin = +object.yMin;
        yMax = +object.yMax;
    }

    var x0 = +(bounds.xMax * matrix[0] + bounds.yMax * matrix[2] + matrix[4]);
    var x1 = +(bounds.xMax * matrix[0] + bounds.yMin * matrix[2] + matrix[4]);
    var x2 = +(bounds.xMin * matrix[0] + bounds.yMax * matrix[2] + matrix[4]);
    var x3 = +(bounds.xMin * matrix[0] + bounds.yMin * matrix[2] + matrix[4]);
    var y0 = +(bounds.xMax * matrix[1] + bounds.yMax * matrix[3] + matrix[5]);
    var y1 = +(bounds.xMax * matrix[1] + bounds.yMin * matrix[3] + matrix[5]);
    var y2 = +(bounds.xMin * matrix[1] + bounds.yMax * matrix[3] + matrix[5]);
    var y3 = +(bounds.xMin * matrix[1] + bounds.yMin * matrix[3] + matrix[5]);

    xMax = +this.$max(this.$max(this.$max(this.$max(xMax, x0), x1), x2), x3);
    xMin = +this.$min(this.$min(this.$min(this.$min(xMin, x0), x1), x2), x3);
    yMax = +this.$max(this.$max(this.$max(this.$max(yMax, y0), y1), y2), y3);
    yMin = +this.$min(this.$min(this.$min(this.$min(yMin, y0), y1), y2), y3);

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};


/**
 * @param src
 * @returns {Array}
 */
DisplayObject.prototype.cloneArray = function(src)
{
    var i      = 0;
    var array  = [];
    var length = src.length|0;

    while (i < length) {
        array[i] = src[i];
        i = (i + 1)|0;
    }

    return array;
};

/**
 * @param blendMode
 * @returns {String}
 */
DisplayObject.prototype.getBlendName = function (blendMode)
{
    var mode = null;
    switch (blendMode) {
        case 1:
        case "normal":
            mode = "normal";
            break;
        case 2:
        case "layer":
            mode = "layer";
            break;
        case 3:
        case "multiply":
            mode = "multiply";
            break;
        case 4:
        case "screen":
            mode = "screen";
            break;
        case 5:
        case "lighten":
            mode = "lighten";
            break;
        case 6:
        case "darken":
            mode = "darken";
            break;
        case 7:
        case "difference":
            mode = "difference";
            break;
        case 8:
        case "add":
            mode = "add";
            break;
        case 9:
        case "subtract":
            mode = "subtract";
            break;
        case 10:
        case "invert":
            mode = "invert";
            break;
        case 11:
        case "alpha":
            mode = "alpha";
            break;
        case 12:
        case "erase":
            mode = "erase";
            break;
        case 13:
        case "overlay":
            mode = "overlay";
            break;
        case 14:
        case "hardlight":
            mode = "hardlight";
            break;
    }
    return mode;
};

/**
 * @param stage
 */
DisplayObject.prototype.setStage = function (stage)
{
    this.stageId = stage.getId();

    // SimpleButton
    if (this.getClassName() === "SimpleButton") {
        var upState = this.getSprite("up");
        upState.setStage(stage);

        var downState = this.getSprite("down");
        downState.setStage(stage);

        var hitState = this.getSprite("hit");
        hitState.setStage(stage);

        var overState = this.getSprite("over");
        overState.setStage(stage);
    }

    stage.setInstance(this);
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getStage = function ()
{
    return this.getLoadStage() || this.getParentStage();
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParentStage = function ()
{
    var stageId = this.stageId|0;
    return this.$stages[stageId] || this.$loadStages[stageId];
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getLoadStage = function ()
{
    var loadStageId = this.loadStageId;
    if (!loadStageId) {
        return undefined;
    }

    var stages = this.$stages;
    return stages[loadStageId] || this.$loadStages[loadStageId];
};

/**
 * @param stage
 */
DisplayObject.prototype.setLoadStage = function (stage)
{
    this.loadStageId = null;
    if (stage) {
        stage.setInstance(this);
        this.loadStageId = stage.getId();
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getCharacterId = function ()
{
    return this.characterId;
};

/**
 * @param characterId
 */
DisplayObject.prototype.setCharacterId = function (characterId)
{
    this.characterId = characterId|0;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getTagType = function ()
{
    return this.tagType;
};

/**
 * @param tagType
 */
DisplayObject.prototype.setTagType = function (tagType)
{
    this.tagType = tagType|0;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getRatio = function ()
{
    return this.ratio;
};

/**
 * @param ratio
 */
DisplayObject.prototype.setRatio = function (ratio)
{
    this.ratio = ratio|0;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParent = function ()
{
    var parentId = this.parentId;
    if (parentId === null) {
        return undefined;
    }

    parentId |= 0;

    var parent;
    var stage = this.getLoadStage();
    if (stage) {
        parent = stage.getInstance(parentId);
    }

    if (!parent) {
        stage  = this.getParentStage();
        parent = stage.getInstance(parentId);
    }

    return parent;
};

/**
 * @param parent
 */
DisplayObject.prototype.setParent = function (parent)
{
    if (parent instanceof DisplayObjectContainer) {
        parent.setInstance(this);
    }
    this.parentId = parent.instanceId;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getParentSprite = function ()
{
    if (!this._sprite) {
        return undefined;
    }

    return this
        .getStage()
        .getInstance(this._sprite);
};

/**
 * @param sprite
 */
DisplayObject.prototype.setParentSprite = function (sprite)
{
    this._sprite = sprite.instanceId|0;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getButtonStatus = function ()
{
    return this.buttonStatus;
};

/**
 * @param status
 */
DisplayObject.prototype.setButtonStatus = function (status)
{
    this.buttonStatus = status;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getMask = function ()
{
    return this._mask;
};

/**
 * @param obj
 */
DisplayObject.prototype.setMask = function (obj)
{
    var maskMc = this._mask;
    if (maskMc) {
        maskMc.isMask = false;
    }

    obj.isMask = true;
    this._mask = obj;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getEnabled = function ()
{
    return this._enabled;
};

/**
 * @param enabled
 */
DisplayObject.prototype.setEnabled = function (enabled)
{
    this._enabled = enabled;
};

/**
 * @returns {boolean}
 */
DisplayObject.prototype.getButtonMode = function ()
{
    return this._buttonMode;
};

/**
 * @param buttonMode
 */
DisplayObject.prototype.setButtonMode = function (buttonMode)
{
    this._buttonMode = buttonMode;
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getTarget = function ()
{
    return this._target;
};

/**
 * @param target
 */
DisplayObject.prototype.setTarget = function (target)
{
    this._target = target;
};

/**
 * @param path
 * @returns {{scope: DisplayObject, target: *}}
 */
DisplayObject.prototype.splitPath = function (path)
{
    var split;
    var scope      = this;
    var target     = path;
    var targetPath = "";
    if (typeof path === "string") {
        switch (true) {
            case (path.indexOf("::") !== -1):
                scope  = this;
                target = path;
                break;
            case (path.indexOf(":") !== -1):
                split      = path.split(":");
                targetPath = split[0];
                target     = split[1];
                break;
            case (path.indexOf(".") !== -1):
                split       = path.split(".");
                target      = split.pop();
                targetPath += split.join(".");
                break;
        }

        if (targetPath) {
            var mc = this.getDisplayObject(targetPath);
            if (mc) {
                scope = mc;
            }
        }
    }

    return {
        "scope":  scope,
        "target": target
    };
};

/**
 * @param name
 * @param parse
 * @returns {undefined}
 */
DisplayObject.prototype.getProperty = function (name, parse)
{
    var _root, rootStage;

    var self   = this;
    var target = name;
    if (parse !== false) {
        var obj = this.splitPath(name);
        self    = obj.scope;
        target  = obj.target;
    }

    if (self.removeFlag) {
        return undefined;
    }

    var value;
    var prop = (typeof target === "string") ? target.toLowerCase() : target;
    switch (prop) {
        case 0:
        case "_x":
            value = self.getX();
            break;
        case 1:
        case "_y":
            value = self.getY();
            break;
        case 2:
        case "_xscale":
            value = self.getXScale();
            break;
        case 3:
        case "_yscale":
            value = self.getYScale();
            break;
        case 4:
        case "_currentframe":
            if (self instanceof MovieClip) {
                value = self.getCurrentFrame();
            }
            break;
        case 5:
        case "_totalframes":
            if (self instanceof MovieClip) {
                value = self.getTotalFrames();
            }
            break;
        case 6:
        case "_alpha":
            value = self.getAlpha();
            break;
        case 7:
        case "_visible":
            value = self.getVisible();
            break;
        case 8:
        case "_width":
            value = self.getWidth();
            break;
        case 9:
        case "_height":
            value = self.getHeight();
            break;
        case 10:
        case "_rotation":
            value = self.getRotation();
            break;
        case 11:
        case "_target":
            value = self.getTarget();
            break;
        case 12:
        case "_framesloaded":
            value = self._framesloaded;
            break;
        case 13:
        case "_name":
            value = self.getName();
            break;
        case 14:
        case "_droptarget":
            if (self instanceof MovieClip) {
                value = self.getDropTarget();
            }
            break;
        case 15:
        case "_url":
            value = self._url;
            break;
        case 16:
        case "_highquality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value = 0;
            value = (rootStage.quality === "high") ? 1 : 0;
            break;
        case 17:
        case "_focusrect":
            value = self._focusrect;
            break;
        case 18:
        case "_soundbuftime":
            value = self._soundbuftime;
            break;
        case 19:
        case "_quality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value = rootStage.quality;
            break;
        case 20:
        case "_xmouse":
            value = self.getXMouse();
            break;
        case 21:
        case "_ymouse":
            value = self.getYMouse();
            break;
        case "text":
        case "htmltext":
            if (self instanceof TextField) {
                var variable = self.getVariable("variable");
                if (variable) {
                    var mc = self.getParent();
                    value  = mc.getProperty(variable);
                } else {
                    value = self.getVariable("text");
                }
            } else {
                value = self.getVariable(target);
            }
            break;
        case "$version":
            value = "swf2js 8,0,0";
            break;
        case "enabled":
            value = self.getEnabled();
            break;
        case "blendmode":
            value = self.getBlendMode();
            break;
        case "sharedobject":
            value = new SharedObject();
            break;
        case "key":
            value = this.$keyClass;
            break;
        case "mouse":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            value     = rootStage.mouse;
            break;
        default:
            value = self.getVariable(target, parse);
            if (value === undefined && target !== name) {
                value = self.getGlobalVariable(name);
            }
            break;
    }

    return value;
};

/**
 * @param name
 * @param value
 * @param parse
 */
DisplayObject.prototype.setProperty = function (name, value, parse)
{
    var _root, rootStage;

    var self   = this;
    var target = name;
    if (parse !== false) {
        var obj = self.splitPath(name);
        self    = obj.scope;
        target  = obj.target;
    }

    var prop = (typeof target === "string") ? target.toLowerCase() : target;
    switch (prop) {
        case 0:
        case "_x":
            self.setX(value);
            break;
        case 1:
        case "_y":
            self.setY(value);
            break;
        case 2:
        case "_xscale":
            self.setXScale(value);
            break;
        case 3:
        case "_yscale":
            self.setYScale(value);
            break;
        case 4:
        case "_currentframe":
        case 5:
        case "_totalframes":
        case 15:
        case "_url":
        case 20:
        case "_xmouse":
        case 21:
        case "_ymouse":
        case 11:
        case "_target":
        case 12:
        case "_framesloaded":
        case 14:
        case "_droptarget":
            // readonly
            break;
        case 6:
        case "_alpha":
            self.setAlpha(value);
            break;
        case 7:
        case "_visible":
            self.setVisible(value);
            break;
        case 8:
        case "_width":
            self.setWidth(value);
            break;
        case 9:
        case "_height":
            self.setHeight(value);
            break;
        case 10:
        case "_rotation":
            self.setRotation(value);
            break;
        case 13:
        case "_name":
            self.setName(value);
            break;
        case 16:
        case "_highquality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            if (value) {
                rootStage.quality = "high";
                rootStage.setRatio();
            }
            break;
        case 17:
        case "_focusrect":
            self._focusrect = value;
            break;
        case 18:
        case "_soundbuftime":
            self._soundbuftime = value;
            break;
        case 19:
        case "_quality":
            _root     = self.getDisplayObject("_root");
            rootStage = _root.getStage();
            rootStage.quality = value.toLowerCase();
            rootStage.setRatio();
            break;
        case "text":
        case "htmltext":
            if (self instanceof TextField) {
                var variable = self.getVariable("variable");
                if (variable) {
                    var mc = self.getParent();
                    mc.setProperty(variable, value);
                } else {
                    self.setVariable("text", value);
                }
                var input = self.input;
                if (input) {
                    input.value = value;
                }
            } else {
                self.setVariable(target, value);
            }
            break;
        case "blendmode":
            self.setBlendMode(value);
            break;
        case "enabled":
            self.setEnabled(value);
            break;
        case "filters":
            self.setFilters(value);
            break;
        default:
            self.setVariable(target, value);
            break;
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getDepth = function ()
{
    var _depth = this._depth;
    var depth  = (_depth !== null) ? _depth : this.getLevel();
    return depth - 16384;
};

/**
 * @param depth
 * @param swapDepth
 * @param swapMc
 */
DisplayObject.prototype.setDepth = function (depth, swapDepth, swapMc)
{
    var parent     = this.getParent();
    var _depth     = this._depth;
    var level      = (_depth !== null) ? _depth : this.getLevel();
    var totalFrame = parent.getTotalFrames() + 1;

    if (!swapMc) {
        this._depth = depth;
    } else {
        this._depth   = swapDepth;
        swapMc._depth = depth;
    }

    var container  = parent.container;
    var instanceId = this.instanceId;
    for (var frame = 1; frame < totalFrame; frame++) {
        if (!(frame in container)) {
            container[frame] = [];
        }

        var tags = container[frame];
        if (swapMc) {
            if (level in tags && tags[level] === instanceId) {
                tags[depth] = swapMc.instanceId;
            }

            if (swapDepth in tags && tags[swapDepth] === swapMc.instanceId) {
                tags[swapDepth] = instanceId;
            }
        } else {
            if (!(level in tags) || level in tags && tags[level] === instanceId) {
                delete tags[level];
                tags[depth] = instanceId;
            }
        }

        container[frame] = tags;
    }

    this.setController(false, false, false, false);
    if (swapMc) {
        swapMc.setController(false, false, false, false);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getX = function ()
{
    var matrix = this.getMatrix();
    return (matrix) ? matrix[4] / 20 : undefined;
};

/**
 * @param x
 */
DisplayObject.prototype.setX = function (x)
{
    x = +x;
    if (!this.$isNaN(x)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        matrix[4]   = x * 20;
        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getY = function ()
{
    var matrix = this.getMatrix();
    return (matrix) ? matrix[5] / 20 : undefined;
};

/**
 * @param y
 */
DisplayObject.prototype.setY = function (y)
{
    y = +y;
    if (!this.$isNaN(y)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        matrix[5]   = y * 20;
        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getXScale = function ()
{
    var matrix = this.getMatrix();
    var xScale = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]) * 100;
    if (0 > matrix[0]) {
        xScale = -xScale;
    }
    return xScale;
};

/**
 * @param xscale
 */
DisplayObject.prototype.setXScale = function (xscale)
{
    xscale = +xscale;
    if (!this.$isNaN(xscale)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var adjustment = 1;
        if (0 > matrix[0]) {
            adjustment = -1;
        }

        var radianX = this.$atan2(matrix[1], matrix[0]);
        xscale     /= 100;
        matrix[0]   = xscale * this.$cos(radianX) * adjustment;
        matrix[1]   = xscale * this.$sin(radianX) * adjustment;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getYScale = function ()
{
    var matrix = this.getMatrix();
    var yScale = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]) * 100;
    if (0 > matrix[3]) {
        yScale *= -1;
    }
    return yScale;
};

/**
 * @param yscale
 */
DisplayObject.prototype.setYScale = function (yscale)
{
    yscale = +yscale;
    if (!this.$isNaN(yscale)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var adjustment = 1;
        if (0 > matrix[3]) {
            // TODO test
            // adjustment = -1;
        }

        var radianY = this.$atan2(-matrix[2], matrix[3]);
        yscale     /= 100;
        matrix[2]   = -yscale * this.$sin(radianY) * adjustment;
        matrix[3]   = yscale  * this.$cos(radianY) * adjustment;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getAlpha = function ()
{
    var colorTransform = this.getColorTransform();
    var alpha = colorTransform[3] + (colorTransform[7] / 255);
    return alpha * 100;
};

/**
 * @param alpha
 */
DisplayObject.prototype.setAlpha = function (alpha)
{
    alpha = +alpha;
    if (!this.$isNaN(alpha)) {
        var _colorTransform = this.getColorTransform();
        var colorTransform  = this.cloneArray(_colorTransform);
        colorTransform[3]   = alpha / 100;
        colorTransform[7]   = 0;

        this.setColorTransform(colorTransform);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getVisible = function ()
{
    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version > 4) {
        return this.__visible;
    }

    return (this.__visible) ? 1 : 0;
};

/**
 * @param visible
 */
DisplayObject.prototype.setVisible = function (visible)
{
    if (typeof visible === "boolean") {
        this.__visible = visible;
    } else {
        visible = +visible;
        if (!this.$isNaN(visible)) {
            this.__visible = (visible) ? true : false;
        }
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getLevel = function ()
{
    return this._level;
};

/**
 * @param level
 */
DisplayObject.prototype.setLevel = function (level)
{
    this._level = level;
};

/**
 * @returns {null}
 */
DisplayObject.prototype.getName = function ()
{
    return this.__name;
};

/**
 * @param name
 */
DisplayObject.prototype.setName = function (name)
{
    this.__name = name;
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getRotation = function ()
{
    var matrix   = this.getMatrix();
    var rotation = this.$atan2(matrix[1], matrix[0]) * 180 / this.$PI;
    switch (rotation) {
        case -90.00000000000001:
            rotation = -90;
            break;
        case 90.00000000000001:
            rotation = 90;
            break;
    }
    return rotation;
};

/**
 * @param rotation
 */
DisplayObject.prototype.setRotation = function (rotation)
{
    rotation = +rotation;
    if (!this.$isNaN(rotation)) {
        var _matrix = this.getMatrix();
        var matrix  = this.cloneArray(_matrix);
        var radianX = this.$atan2(matrix[1], matrix[0]);
        var radianY = this.$atan2(-matrix[2], matrix[3]);
        var ScaleX  = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
        var ScaleY  = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);

        rotation   *= this.$PI / 180;
        radianY    += rotation - radianX;
        radianX     = rotation;

        matrix[0]   = ScaleX  * this.$cos(radianX);
        matrix[1]   = ScaleX  * this.$sin(radianX);
        matrix[2]   = -ScaleY * this.$sin(radianY);
        matrix[3]   = ScaleY  * this.$cos(radianY);

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getWidth = function ()
{
    var matrix = this.getMatrix();
    var bounds = this.getBounds(matrix);
    return this.$abs(bounds.xMax - bounds.xMin);
};

/**
 * @param width
 */
DisplayObject.prototype.setWidth = function (width)
{
    width = +width;
    if (!this.$isNaN(width)) {
        var _matrix = this.getOriginMatrix();
        var bounds  = this.getBounds(_matrix);
        var _width  = this.$abs(bounds.xMax - bounds.xMin);
        var xScale  = width * _matrix[0] / _width;

        if (this.$isNaN(xScale)) {
            xScale = 0;
        }

        _matrix    = this.getMatrix();
        var matrix = this.cloneArray(_matrix);
        matrix[0]  = xScale;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {number}
 */
DisplayObject.prototype.getHeight = function ()
{
    var matrix = this.getMatrix();
    var bounds = this.getBounds(matrix);
    return this.$abs(bounds.yMax - bounds.yMin);
};

/**
 * @param height
 */
DisplayObject.prototype.setHeight = function (height)
{
    height = +height;
    if (!this.$isNaN(height)) {
        var _matrix = this.getOriginMatrix();
        var bounds  = this.getBounds(_matrix);
        var _height = +this.$abs(bounds.yMax - bounds.yMin);
        var yScale  = +(height * _matrix[3] / _height);

        if (this.$isNaN(yScale)) {
            yScale = 0;
        }

        _matrix    = this.getMatrix();
        var matrix = this.cloneArray(_matrix);
        matrix[3]  = yScale;

        this.setMatrix(matrix);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getXMouse = function ()
{
    var event = this.$event;
    if (!event) {
        return null;
    }

    var _root   = this.getDisplayObject("_root");
    var stage   = _root.getStage();
    var div     = this.$document.getElementById(stage.getName());
    var bounds  = div.getBoundingClientRect();
    var docBody = this.$document.body;
    var x       = docBody.scrollLeft + bounds.left;

    var touchX = 0;
    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchX = changedTouche.pageX;
    } else {
        touchX = event.pageX;
    }

    var mc     = this;
    var matrix = this.getMatrix();
    while (true) {
        var parent = mc.getParent();
        if (!parent) {
            break;
        }

        matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
        mc     = parent;
    }

    touchX = +(touchX - x);
    touchX = +(touchX / stage.getScale());
    touchX = +(touchX - (matrix[4] / 20));

    return touchX;
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getYMouse = function ()
{
    var event = this.$event;
    if (!event) {
        return null;
    }

    var _root   = this.getDisplayObject("_root");
    var stage   = _root.getStage();
    var div     = this.$document.getElementById(stage.getName());
    var bounds  = div.getBoundingClientRect();
    var docBody = this.$document.body;
    var y       = docBody.scrollTop + bounds.top;

    var touchY = 0;
    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchY = changedTouche.pageY;
    } else {
        touchY = event.pageY;
    }

    var mc     = this;
    var matrix = this.getMatrix();
    while (true) {
        var parent = mc.getParent();
        if (!parent) {
            break;
        }

        matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
        mc     = parent;
    }

    touchY = +(touchY - y);
    touchY = +(touchY / stage.getScale());
    touchY = +(touchY - (matrix[5] / 20));

    return touchY;
};

/**
 * @param name
 * @param parse
 * @returns {*}
 */
DisplayObject.prototype.getVariable = function (name, parse)
{
    if (name === undefined) {
        return name;
    }

    var variables = this.variables;
    if (!variables) {
        return undefined;
    }

    if (name in variables) {
        return variables[name];
    }

    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version < 7) {
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }

            if (key.toLowerCase() === name.toLowerCase()) {
                return variables[key];
            }
        }
    }

    var value;
    if (version > 4) {
        var registerClass = variables.registerClass;
        if (registerClass &&
            typeof registerClass === "object" &&
            name in registerClass
        ) {
            return registerClass[name];
        }

        if (this instanceof MovieClip) {
            value = this.getDisplayObject(name, parse);
            if (value) {
                return value;
            }
        }

        // avm2
        var cId = this.getCharacterId();
        var symbol = stage.symbols[cId];
        if (symbol) {
            var symbols     = symbol.split(".");
            var classMethod = symbols.pop();
            var sLen        = symbols.length;
            var classObj    = stage.avm2;
            var sIdx        = 0;
            while (sIdx < sLen) {
                classObj = classObj[symbols[sIdx]];
                sIdx = (sIdx + 1)|0;
            }

            var AVM2 = classObj[classMethod];
            value = AVM2[name];
            if (value) {
                return value;
            }
        }

        var _global = stage.getGlobal();
        value = _global.getVariable(name);
        if (value) {
            return value;
        }

        if (this.getClassName() === "MovieClip" && name === "flash") {
            return this.flash;
        }

        if (name in window) {
            return window[name];
        }
    }
    return undefined;
};

/**
 * @param name
 * @param value
 */
DisplayObject.prototype.setVariable = function (name, value)
{
    var variables = this.variables;
    var stage     = this.getStage();

    name += "";
    if (stage.getVersion() < 7) {
        var _name = name.toLowerCase();
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }

            if (key.toLowerCase() !== _name) {
                continue;
            }

            this.variables[key] = value;

            return void (0);
        }
    }

    this.variables[name] = value;
};

/**
 * @param path
 * @returns {*}
 */
DisplayObject.prototype.getGlobalVariable = function (path)
{
    var stage   = this.getStage();
    var version = stage.getVersion();
    if (version < 5) {
        return undefined;
    }

    var splitData = null;
    if (path.indexOf(".") !== -1) {
        splitData = path.split(".");
    }

    var value;
    if (splitData) {
        var _global   = stage.getGlobal();
        var variables = _global.variables;

        var length = splitData.length;
        var i = 0;
        while (i < length) {
            var name = splitData[i];
            i = (i + 1)|0;

            if (version < 7) {
                for (var key in variables) {
                    if (!variables.hasOwnProperty(key)) {
                        continue;
                    }

                    if (key.toLowerCase() === name.toLowerCase()) {
                        value = variables[key];
                        break;
                    }
                }
            } else {
                value = variables[name];
            }

            if (!value) {
                break;
            }

            variables = value;
        }
    }

    return value;
};

/**
 * @param path
 * @param parse
 * @returns {*}
 */
DisplayObject.prototype.getDisplayObject = function (path, parse)
{
    var tags, tag, parent;
    var mc    = this;
    var stage = this.getStage();
    var _root = stage.getParent();

    if (!this._lockroot) {
        while (true) {
            parent = _root.getParent();
            if (!parent) {
                break;
            }
            _root = parent;
        }

        stage = _root.getStage();
    }


    parent = mc.getParent();

    // string
    path = path + "";

    // param
    switch (path) {
        case "_root":
            return _root;
        case "this":
            return this;
        case "_global":
            return stage.getGlobal();
        case "_parent":
            return parent || undefined;
        default:
            break;
    }

    var len = 1;
    var splitData = [path];
    if (parse !== false) {
        switch (true) {
            case (path.indexOf("/") !== -1):
                splitData = path.split("/");
                len       = splitData.length|0;
                if (splitData[0] === "") {
                    mc = _root;
                }
                break;
            case (path.indexOf(".") !== -1):
                splitData = path.split(".");
                len       = splitData.length|0;
                if (splitData[0] === "_root") {
                    mc = _root;
                }
                break;
            case (path.substr(0, 6) === "_level"):
                var level = path.substr(6);
                level     = +level;

                if (level === 0) {
                    return _root;
                }

                if (!parent) {
                    parent = stage.getParent();
                }

                tags = parent.getTags();
                if (level in tags) {
                    var tId = tags[level]|0;
                    tag     = stage.getInstance(tId);
                    if (tag instanceof MovieClip) {
                        return tag;
                    }
                }
                return undefined;
            default:
                break;
        }
    }

    var version = stage.getVersion();

    var i = 0;
    while (i < len) {
        var name = splitData[i];
        i = (i + 1)|0;

        var setTarget = 0;
        switch (name) {
            case "":
                break;
            case "_root":
                mc = _root;
                break;
            case "this":
                mc = this;
                break;
            case "_parent":
                parent = mc.getParent();
                if (!parent) {
                    return undefined;
                }
                mc = parent;
                break;
            case "..":
                mc = mc.getParent();
                if (!mc) {
                    return undefined;
                }
                break;
            default:
                tags = mc.getTags();
                if (!tags) {
                    return undefined;
                }

                var tagLength = tags.length|0;
                if (!tagLength) {
                    return undefined;
                }

                for (var idx in tags) {
                    if (!tags.hasOwnProperty(idx)) {
                        continue;
                    }

                    var instanceId = tags[idx|0]|0;
                    var loadStage  = mc.getStage();

                    tag = loadStage.getInstance(instanceId);
                    if (!tag || tag.removeFlag) {
                        continue;
                    }

                    var tagName = tag.getName();
                    if (!tagName) {
                        continue;
                    }

                    if (version < 7) {
                        if (tagName.toLowerCase() === name.toLowerCase()) {
                            mc        = tag;
                            setTarget = 1;
                            break;
                        }
                    } else {
                        if (tagName === name) {
                            mc        = tag;
                            setTarget = 1;
                            break;
                        }
                    }
                }

                if (!setTarget) {
                    return undefined;
                }

                break;
        }
    }

    return mc;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
DisplayObject.prototype.preRender = function (ctx, matrix, colorTransform, stage, visible)
{
    var cache, rMatrix, xScale, yScale, xMin, yMin, xMax, yMax;

    this.isLoad = true;

    var cacheKey  = "";
    var preCtx    = ctx;
    var preMatrix = matrix;

    // mask
    var maskObj = this.getMask();
    if (maskObj) {
        this.renderMask(ctx, stage);
    }

    // filter and blend
    var isFilter = false;
    var isBlend  = false;
    if (visible && !stage.clipMc) {
        var filters = this.getFilters();
        isFilter = (filters && filters.length);

        // blend
        var blendMode = this.getBlendMode();
        isBlend = (blendMode && blendMode !== "normal");
    }

    // filter or blend
    var x, y;
    if (isFilter || isBlend) {
        rMatrix = this.$multiplicationMatrix(stage.getMatrix(), matrix);

        var bounds;
        var twips = 1;
        switch (this.getClassName()) {
            case "Shape":
            case "StaticText":
                bounds = this.getBounds();
                xScale = +this.$sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
                yScale = +this.$sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
                break;
            default:
                twips  = 20;
                bounds = this.getBounds(matrix);
                xScale = +(stage.getScale() * stage.ratio);
                yScale = +(stage.getScale() * stage.ratio);
                break;
        }

        xMin = +bounds.xMin;
        yMin = +bounds.yMin;
        xMax = +bounds.xMax;
        yMax = +bounds.yMax;

        var width  = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
        var height = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;

        var canvas     = this.$cacheStore.getCanvas();
        canvas.width   = width;
        canvas.height  = height;
        cache          = canvas.getContext("2d");
        cache._offsetX = 0;
        cache._offsetY = 0;

        var m2 = [1, 0, 0, 1, +(-xMin * twips), +(-yMin * twips)];
        var m3 = [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
        if (this.getClassName() === "Shape") {
            m3[4] = 0;
            m3[5] = 0;
        }

        preCtx    = cache;
        preMatrix = this.$multiplicationMatrix(m2, m3);

        x = +(xMin * xScale);
        y = +(yMin * yScale);
    }

    // graphics
    if (visible) {
        cacheKey += this.renderGraphics(preCtx, preMatrix, colorTransform, stage);
    }

    return {
        preCtx:    preCtx,
        preMatrix: preMatrix,
        isFilter:  isFilter,
        isBlend:   isBlend,
        rMatrix:   rMatrix,
        cacheKey:  cacheKey,
        xMin:      x,
        yMin:      y
    };
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param obj
 */
DisplayObject.prototype.postRender = function(ctx, matrix, colorTransform, stage, obj)
{
    var cache    = obj.preCtx;
    var isFilter = obj.isFilter;
    var cacheKey = obj.cacheKey;

    if (isFilter && cacheKey) {
        cache = this.renderFilter(cache, matrix, colorTransform, stage, cacheKey);
    }

    var xMin = obj.xMin;
    var yMin = obj.yMin;
    if (this.getClassName() === "Shape") {
        xMin += obj.rMatrix[4];
        yMin += obj.rMatrix[5];
    }

    if (cache) {
        xMin = xMin - cache._offsetX;
        yMin = yMin - cache._offsetY;
    }

    this.renderBlend(ctx, cache, xMin, yMin, isFilter);
};


/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {string}
 */
DisplayObject.prototype.renderGraphics = function (ctx, matrix, colorTransform, stage)
{
    var cacheKey = "";
    if ("graphics" in this) {
        var graphics = this.graphics;
        if (graphics.isDraw) {
            cacheKey = graphics.render(ctx, matrix, colorTransform, stage);
        }
    }
    return cacheKey;
};

/**
 * @param ctx
 * @param stage
 */
DisplayObject.prototype.renderMask = function (ctx, stage)
{
    var maskObj = this.getMask();
    if (maskObj) {
        // star
        stage.clipMc = true;

        ctx.save();
        ctx.beginPath();

        var mc     = maskObj;
        var matrix = [1,0,0,1,0,0];
        while (true) {
            var parent = mc.getParent();
            if (!parent.getParent()) {
                break;
            }

            matrix = this.$multiplicationMatrix(parent.getMatrix(), matrix);
            mc = parent;
        }

        maskObj.render(ctx, matrix, [1,1,1,1,0,0,0,0], stage, true);

        // clip
        ctx.clip();

        // end
        stage.clipMc = false;
    }
};

/**
 * @param filters
 * @returns {string}
 */
DisplayObject.prototype.getFilterKey = function (filters)
{
    var keys   = [];
    var length = filters.length;

    var i = 0;
    while (i < length) {
        var filter = filters[i];
        i = (i + 1)|0;

        for (var prop in filter) {
            if (!filter.hasOwnProperty(prop)) {
                continue;
            }

            var value = filter[prop];
            if (value instanceof Array) {
                value = value.join("_");
            }

            keys[keys.length] = value;
        }
    }

    return keys.join("_");
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param cacheKey
 * @returns {*}
 */
DisplayObject.prototype.renderFilter = function (ctx, matrix, colorTransform, stage, cacheKey)
{
    var filters = this.getFilters();
    if (stage.clipMc || !filters || !filters.length) {
        return ctx;
    }

    cacheKey += "_" + this.getFilterKey(filters);
    var cacheStoreKey = "Filter_" + this.instanceId;

    var cache;
    if (this._filterCacheKey === cacheKey) {
        cache = this.$cacheStore.getCache(cacheStoreKey);
    }

    if (!cache) {
        var fLength = filters.length|0;
        var i = 0;
        cache = ctx;
        cache._offsetX = 0;
        cache._offsetY = 0;
        while (i < fLength) {
            var filter = filters[i];
            i = (i + 1)|0;

            cache = filter.render(cache, matrix, colorTransform, stage);
        }

        this._filterCacheKey = cacheKey;
        this.$cacheStore.setCache(cacheStoreKey, cache);
    }

    this.$cacheStore.destroy(ctx);

    return cache;
};

/**
 * @param ctx
 * @param cache
 * @param xMin
 * @param yMin
 * @param isFilter
 */
DisplayObject.prototype.renderBlend = function (ctx, cache, xMin, yMin, isFilter)
{
    var mode = this.getBlendMode();
    var operation = "source-over";
    var canvas    = cache.canvas;
    var width     = canvas.width;
    var height    = canvas.height;

    cache.setTransform(1, 0, 0, 1, 0, 0);

    switch (mode) {
        case "alpha":
            return ;
            break;
        case "multiply":
            operation = "multiply";
            break;
        case "screen":
            operation = "screen";
            break;
        case "lighten":
            operation = "lighten";
            break;
        case "darken":
            operation = "darken";
            break;
        case "difference":
            operation = "difference";
            break;
        case "add":
            operation = "lighter";
            break;
        case "subtract":
            cache.globalCompositeOperation = "difference";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            cache.globalCompositeOperation = "darken";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            operation = "color-burn";
            break;
        case "invert":
            cache.globalCompositeOperation = "difference";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            cache.globalCompositeOperation = "lighter";
            cache.fillStyle = "rgb(255,255,255)";
            cache.fillRect(0, 0, width, height);
            operation = "difference";
            break;
        case "alpha":
            operation = "source-over";
            break;
        case "erase":
            operation = "destination-out";
            break;
        case "overlay":
            operation = "overlay";
            break;
        case "hardlight":
            operation = "hard-light";
            break;
        default:
            break;
    }

    canvas = cache.canvas;

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = operation;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(canvas, xMin, yMin, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    if (!isFilter) {
        this.$cacheStore.destroy(cache);
    }
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getOriginMatrix = function ()
{
    var controller = this.getController();
    return controller.getMatrix();
};

/**
 * @returns []
 */
DisplayObject.prototype.getMatrix = function ()
{
    return this._matrix || this.getOriginMatrix();
};

/**
 * @param matrix
 */
DisplayObject.prototype.setMatrix = function (matrix)
{
    this._matrix = matrix;
    this.setController(true, false, false, false);
};

/**
 * @returns {*}
 */
DisplayObject.prototype.getOriginColorTransform = function ()
{
    var controller = this.getController();
    return controller.getColorTransform();
};

/**
 * @returns []
 */
DisplayObject.prototype.getColorTransform = function ()
{
    return this._colorTransform || this.getOriginColorTransform();
};

/**
 * @param colorTransform
 */
DisplayObject.prototype.setColorTransform = function (colorTransform)
{
    this._colorTransform = colorTransform;
    this.setController(false, true, false, false);
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getOriginBlendMode = function ()
{
    var controller = this.getController();
    return controller.getBlendMode();
};

/**
 * @returns {string}
 */
DisplayObject.prototype.getBlendMode = function ()
{
    return this._blendMode || this.getOriginBlendMode();
};

/**
 * @param blendMode
 */
DisplayObject.prototype.setBlendMode = function (blendMode)
{
    var mode = this.getBlendName(blendMode);
    if (mode) {
        this._blendMode = mode;
        this.setController(false, false, false, true);
    }
};

/**
 * @returns {Array}
 */
DisplayObject.prototype.getOriginFilters = function ()
{
    var controller = this.getController();
    return controller.getFilters();
};

/**
 * @returns {Array}
 */
DisplayObject.prototype.getFilters = function ()
{
    return this._filters || this.getOriginFilters();
};

/**
 * @param filters
 */
DisplayObject.prototype.setFilters = function (filters)
{
    this._filterCacheKey = null;
    this._filters = filters;
    this.setController(false, false, true, false);
};

/**
 * @param isMatrix
 * @param isColorTransform
 * @param isFilters
 * @param isBlend
 */
DisplayObject.prototype.setController = function (isMatrix, isColorTransform, isFilters, isBlend)
{
    if (!isMatrix) {
        var _matrix = this._matrix;
        if (!_matrix) {
            _matrix      = this.getMatrix();
            this._matrix = this.cloneArray(_matrix);
        }
    }

    if (!isColorTransform) {
        var _colorTransform = this._colorTransform;
        if (!_colorTransform) {
            _colorTransform      = this.getColorTransform();
            this._colorTransform = this.cloneArray(_colorTransform);
        }
    }

    if (!isFilters) {
        var _filters = this._filters;
        if (!_filters) {
            _filters = this.getFilters();
            if (_filters === null) {
                _filters = [];
            }
            this._filters = _filters;
        }
    }

    if (!isBlend) {
        var _blendMode = this._blendMode;
        if (!_blendMode) {
            this._blendMode = this.getBlendMode();
        }
    }
};

/**
 * @returns {PlaceObject}
 */
DisplayObject.prototype.getController = function ()
{
    if (this.parentId === null) {
        return this.PlaceObject;
    }

    var parent = this.getParentSprite();
    if (!parent) {
        parent = this.getParent();
    }

    var frame = 0;
    if (parent.getClassName() === "MovieClip") {
        frame = parent.getCurrentFrame()|0;
    }

    var depth      = this.getLevel()|0;
    var instanceId = parent.instanceId|0;

    var stage = this.getParentStage();

    var placeObject = stage.getPlaceObject(instanceId, depth, frame);
    if (!placeObject) {
        stage = this.getLoadStage();
        if (stage) {
            placeObject = stage.getPlaceObject(instanceId, depth, frame);
        }
    }

    return placeObject || new PlaceObject();
};

/**
 * reset
 */
DisplayObject.prototype.reset = function ()
{
    this.active          = false;
    this.isMask          = false;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this._depth          = null;
    this.setVisible(true);
    this.setEnabled(true);
    this.setButtonStatus("up");

    if (this.getClassName() === "TextField") {
        if (this.inputActive) {
            this.inputActive    = false;
            this.input.onchange = null;

            var stage = this.getStage();

            var div = this.$document.getElementById(stage.getName());
            if (div) {
                var el = this.$document.getElementById(this.getTagName());
                if (el) {
                    try {
                        div.removeChild(el);
                    } catch (e) {

                    }
                }
            }
        }

        this.variables.text = this.initialText;
    }
};

/**
 * trace
 */
DisplayObject.prototype.trace = function ()
{
    var params = ["[trace]"];
    var length = arguments.length;
    var i = 0;
    while (i < length) {
        params[params.length] = arguments[i];
        i = (i+1)|0;
    }
    console.log.apply(window, params);
};
/**
 * @constructor
 */
var InteractiveObject = function ()
{
    this._mouseEnabled = true;
    DisplayObject.call(this);
};

/**
 * extends
 * @type {DisplayObject}
 */
InteractiveObject.prototype = Object.create(DisplayObject.prototype);
InteractiveObject.prototype.constructor = InteractiveObject;

/**
 * properties
 */
Object.defineProperties(DisplayObject.prototype,
    {
        mouseEnabled: {
            get: function () {
                return this.getMouseEnabled();
            },
            set: function (mouseEnabled) {
                this.setMouseEnabled(mouseEnabled);
            }
        }
    });

/**
 * @returns {boolean}
 */
InteractiveObject.prototype.getMouseEnabled = function ()
{
    return this._mouseEnabled;
};

/**
 * @param mouseEnabled
 */
InteractiveObject.prototype.setMouseEnabled = function (mouseEnabled)
{
    this._mouseEnabled = mouseEnabled;
};
/**
 * @constructor
 */
var DisplayObjectContainer = function ()
{
    InteractiveObject.call(this);

    this._mouseChildren = true;
    this._tabChildren   = true;
    this._textSnapshot  = new TextSnapshot();
    this._numChildren   = 0;
    this.soundId        = null;
    this.soundInfo      = null;
    this.container      = [];

    if (this.getClassName() === "MovieClip") {
        var totalFrames = (this.getTotalFrames() + 1)|0;
        var frame = 1;
        while (frame < totalFrames) {
            this.container[frame] = [];
            frame = (frame + 1)|0;
        }
    }

    this.instances = [];
    this.isSwap    = false;
};

/**
 * extends
 * @type {InteractiveObject}
 */
DisplayObjectContainer.prototype = Object.create(InteractiveObject.prototype);
DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;

/**
 * properties
 */
Object.defineProperties(DisplayObjectContainer.prototype,
    {
        mouseChildren: {
            get: function () {
                return this.getMouseChildren();
            },
            set: function (mouseChildren) {
                this.setMouseChildren(mouseChildren);
            }
        },
        textSnapshot: {
            get: function () {
                return this.getTextSnapshot();
            },
            set: function () {
            }
        },
        numChildren: {
            get: function () {
                return this.getNumChildren();
            },
            set: function () {
            }
        },
        tabChildren: {
            get: function () {
                return this.getTabChildren();
            },
            set: function (tabChildren) {
                this.setTabChildren(tabChildren);
            }
        }
    });

/**
 * @returns {boolean}
 */
DisplayObjectContainer.prototype.getMouseChildren = function ()
{
    return this._mouseChildren;
};

/**
 * @param mouseChildren
 */
DisplayObjectContainer.prototype.setMouseChildren = function (mouseChildren)
{
    this._mouseChildren = mouseChildren;
};

/**
 * @returns {TextSnapshot}
 */
DisplayObjectContainer.prototype.getTextSnapshot = function ()
{
    return this._textSnapshot;
};

/**
 * @returns {number}
 */
DisplayObjectContainer.prototype.getNumChildren = function ()
{
    return this._numChildren;
};

/**
 * @returns {boolean}
 */
DisplayObjectContainer.prototype.getTabChildren = function ()
{
    return this._tabChildren;
};

/**
 * @param tabChildren
 */
DisplayObjectContainer.prototype.setTabChildren = function (tabChildren)
{
    this._tabChildren = tabChildren;
};

/**
 * @returns {Array}
 */
DisplayObjectContainer.prototype.getContainer = function ()
{
    return this.container;
};

/**
 * @returns {Array}
 */
DisplayObjectContainer.prototype.getInstances = function ()
{
    return this.instances;
};

/**
 * @param instance
 */
DisplayObjectContainer.prototype.setInstance = function (instance)
{
    var instances  = this.getInstances();
    var instanceId = instance.instanceId|0;
    if (!(instanceId in instances)) {
        instances[instanceId] = 1;
    }
};

/**
 * @param instance
 */
DisplayObjectContainer.prototype.deleteInstance = function (instance)
{
    delete this.instances[instance.instanceId|0];
};

/**
 * @param child
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.addChild = function (child, depth)
{
    if (child instanceof DisplayObject) {

        if (depth === undefined) {
            depth = this._numChildren;
        }

        var stage = this.getStage();
        child.setParent(this);
        child.setStage(stage);
        child.setLevel(depth);

        var container   = this.getContainer();
        var frame       = 1;
        var placeObject = new PlaceObject();
        var instanceId  = this.instanceId;
        if (this.getClassName() === "MovieClip") {
            var totalFrames = (this.getTotalFrames() + 1)|0;
            while (frame < totalFrames) {
                if (!(frame in container)) {
                    container[frame] = [];
                }

                stage.setPlaceObject(placeObject, instanceId, depth, frame);
                container[frame][depth] = child.instanceId;

                frame = (frame + 1)|0;
            }
        } else {
            stage.setPlaceObject(placeObject, instanceId, depth, frame);
            container[depth] = child.instanceId;
        }

        this._numChildren = (this._numChildren + 1)|0;
    }

    return child;
};

/**
 * @param child
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.addChildAt = function (child, depth)
{
    return this.addChild(child, depth);
};

/**
 *
 * @param depth
 * @returns {DisplayObject}
 */
DisplayObjectContainer.prototype.getChildAt = function (depth)
{
    var container = this.getContainer();
    var children  = container;

    if (16384 > depth) {
        depth = (depth + 16384)|0;
    }

    if (this.getClassName() === "MovieClip") {
        var frame = this.getCurrentFrame();
        children  = container[frame];
    }

    return children[depth];
};

/**
 * @param name
 * @return {DisplayObject}
 */
DisplayObjectContainer.prototype.getChildByName = function (name)
{
    var container = this.getContainer();
    var children  = container;
    if (this.getClassName() === "MovieClip") {
        var frame = this.getCurrentFrame();
        children  = container[frame];
    }

    var obj;
    for (var depth in children) {
        if (!children.hasOwnProperty(depth)) {
            continue;
        }

        var child = children[depth];
        if (child.getName() !== name) {
            continue;
        }
        obj = child;

        break;
    }
    return obj;
};

/**
 * @param child
 * @returns {number}
 */
DisplayObjectContainer.prototype.getChildIndex = function (child)
{
    var index;
    if (child instanceof DisplayObject) {
        index = child.getLevel() - 16384;
    }
    return index;
};

/**
 * @param child
 * @return {DisplayObject}
 */
DisplayObjectContainer.prototype.removeChild = function (child)
{
    var depth, obj;
    var container = this.getContainer();

    if (this.getClassName() === "MovieClip") {
        var totalFrames = (this.getTotalFrames() + 1)|0;

        var frame = 1;
        while (frame < totalFrames) {
            if (!(frame in container)) {
                frame = (frame + 1)|0;
                continue;
            }

            var children = container[frame];
            for (depth in children) {
                if (!children.hasOwnProperty(depth)) {
                    frame = (frame + 1)|0;
                    continue;
                }

                var instanceId = children[depth];
                if (instanceId !== child.instanceId) {
                    frame = (frame + 1)|0;
                    continue;
                }

                delete container[frame][depth];
                break;
            }

            frame = (frame + 1)|0;
        }
    } else {
        for (depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            obj = container[depth];
            if (obj.instanceId !== child.instanceId) {
                continue;
            }

            delete container[depth];
            break;
        }
    }

    if (child) {
        this.deleteInstance(child);
        this._numChildren = (this._numChildren - 1)|0;
    }

    return child;
};

/**
 * @param depth
 * @returns {*}
 */
DisplayObjectContainer.prototype.removeChildAt = function (depth)
{
    var container = this.getContainer();
    var children  = container;

    if (16384 > depth) {
        depth = (depth + 16384)|0;
    }

    var child;
    if (this.getClassName() === "MovieClip") {
        var totalFrames = this.getTotalFrames();
        var frame = 1;

        while (frame < totalFrames) {
            if (!(frame in container)) {
                frame = (frame  + 1)|0;
                continue;
            }

            children = container[frame];
            if (!(depth in children)) {
                frame = (frame  + 1)|0;
                continue;
            }

            child = children[depth];
            delete container[frame][depth];

            frame = (frame  + 1)|0;
        }
    } else {
        child = children[depth];
        delete children[depth];
    }

    if (child) {
        this._numChildren = (this._numChildren - 1)|0;
    }

    return child;
};

/**
 * @param depth
 * @param obj
 */
DisplayObjectContainer.prototype.addTag = function (depth, obj)
{
    this.container[depth] = obj.instanceId;
    this._numChildren     = (this._numChildren + 1)|0;
};

/**
 * startSound
 */
DisplayObjectContainer.prototype.startSound = function ()
{
    var soundId = this.soundId;
    if (soundId) {
        var stage = this.getStage();
        var sound = stage.sounds[soundId];
        if (sound) {
            var audio = this.$document.createElement("audio");
            audio.onload = function ()
            {
                this.load();
                this.preload = "auto";
                this.autoplay = false;
                this.loop = false;
            };
            audio.src = sound.base64;

            this.$startSound(audio, this.soundInfo);
        }
    }
};

/**
 * reset
 */
DisplayObjectContainer.prototype.reset = function ()
{
    var container = this.container;
    var length    = container.length;
    if (length) {
        var stage = this.getStage();
        for (var depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = container[depth];
            var obj        = stage.getInstance(instanceId);

            obj.reset();
        }
    }

    this.isMask          = false;
    this._depth          = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this.mouseEnabled    = true;
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
DisplayObjectContainer.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var isVisible = this.$min(this.getVisible(), visible)|0;

    if (this.getEnabled() && isVisible === 1) {
        var buttonHits = stage.buttonHits;
        var variables  = this.variables;

        var events = this.events;
        if (events.press !== undefined ||
            events.release !== undefined ||
            events.releaseOutside !== undefined ||
            events.rollOver !== undefined ||
            events.rollOut !== undefined ||
            events.dragOver !== undefined ||
            events.dragOut !== undefined ||
            variables.onPress !== undefined ||
            variables.onRelease !== undefined ||
            variables.onRollOver !== undefined ||
            variables.onReleaseOutside !== undefined ||
            variables.onRollOut !== undefined ||
            variables.onDragOver !== undefined ||
            variables.onDragOut !== undefined
        ) {
            var rMatrix = this.$multiplicationMatrix(matrix, this.getMatrix());
            var bounds  = this.getBounds(rMatrix);
            buttonHits[buttonHits.length] = {
                xMax:   +bounds.xMax,
                xMin:   +bounds.xMin,
                yMax:   +bounds.yMax,
                yMin:   +bounds.yMin,
                parent: this,
                matrix: this.cloneArray(matrix)
            };
        }
    }
};

/**
 *
 * @param name
 * @param depth
 * @returns {MovieClip}
 */
DisplayObjectContainer.prototype.createMovieClip = function (name, depth)
{
    var movieClip = new MovieClip();
    movieClip     = this.addChild(movieClip, depth);
    if (name) {
        movieClip.setName(name);
    }
    return movieClip;
};

/**
 * @param name
 * @param depth
 * @returns {Sprite}
 */
DisplayObjectContainer.prototype.createSprite = function (name, depth)
{
    var sprite = new Sprite();
    sprite     = this.addChild(sprite, depth);
    if (name) {
        sprite.setName(name);
    }
    return sprite;
};

/**
 * @param name
 * @param depth
 * @returns {SimpleButton}
 */
DisplayObjectContainer.prototype.createButton = function (name, depth)
{
    var button = new SimpleButton();
    button     = this.addChild(button, depth);
    if (name) {
        button.setName(name);
    }
    return button;
};

/**
 * @param name
 * @param width
 * @param height
 * @param depth
 * @returns {TextField}
 */
DisplayObjectContainer.prototype.createText = function (name, width, height, depth)
{
    var textField = new TextField(name, depth, width, height);
    textField     = this.addChild(textField, depth);
    textField.setInitParams();
    if (name) {
        textField.setName(name);
    }
    textField.size = 12;
    return textField;
};

/**
 * @returns {Shape}
 */
DisplayObjectContainer.prototype.createShape = function (depth)
{
    var shape = new Shape();
    this.addChild(shape, depth);
    return shape;
};
/**
 * @constructor
 */
var Sprite = function ()
{
    DisplayObjectContainer.call(this);

    this.touchPointID    = 0;
    this._buttonMode     = false;
    this._useHandCursor  = false;
    this._dropTarget     = null;
    this._hitArea        = null;
    this._graphics       = new Graphics();
    this._soundTransform = new SoundTransform();
};

/**
 * extends
 * @type {DisplayObjectContainer}
 */
Sprite.prototype = Object.create(DisplayObjectContainer.prototype);
Sprite.prototype.constructor = Sprite;

/**
 * properties
 */
Object.defineProperties(Sprite.prototype, {
    graphics: {
        get: function () {
            return this.getGraphics();
        },
        set: function () {
        }
    },
    hitArea: {
        get: function () {
            return this.getHitArea();
        },
        set: function (sprite) {
            this.setHitArea(sprite);
        }
    },
    buttonMode: {
        get: function () {
            return this.getButtonMode();
        },
        set: function (buttonMode) {
            this.setButtonMode(buttonMode);
        }
    },
    soundTransform: {
        get: function () {
            return this._soundTransform;
        },
        set: function () {
        }
    },
    useHandCursor: {
        get: function () {
            return this.getUseHandCursor();
        },
        set: function (useHandCursor) {
            this.setUseHandCursor(useHandCursor);
        }
    },
    dropTarget: {
        get: function () {
            return this.getDropTarget();
        },
        set: function () {
            this.setDropTarget();
        }
    }
});

/**
 * @returns {string}
 */
Sprite.prototype.getClassName = function ()
{
    return "Sprite";
};

/**
 * @returns {Graphics}
 */
Sprite.prototype.getGraphics = function ()
{
    return this._graphics;
};

/**
 * @returns {DisplayObject}
 */
Sprite.prototype.getHitArea = function ()
{
    return this._hitArea;
};

/**
 * @param displayObject
 */
Sprite.prototype.setHitArea = function (displayObject)
{
    this._hitArea = displayObject;
};

/**
 * @returns {boolean}
 */
Sprite.prototype.getUseHandCursor = function ()
{
    return this._useHandCursor;
};

/**
 * @param useHandCursor
 */
Sprite.prototype.setUseHandCursor = function (useHandCursor)
{
    this._useHandCursor = useHandCursor;
};

/**
 * startTouchDrag
 */
Sprite.prototype.startTouchDrag = function (touchPointID, lock, bounds)
{
    this.startDrag(lock);
};

/**
 * @param touchPointID
 */
Sprite.prototype.stopTouchDrag = function (touchPointID)
{
    this.stopDrag();
};

/**
 * startDrag
 */
Sprite.prototype.startDrag = function ()
{
    var args   = arguments;
    var lock   = args[0];
    var left   = args[1];
    var top    = args[2];
    var right  = args[3];
    var bottom = args[4];

    var _root  = this.getDisplayObject("_root");
    var stage  = _root.getStage();
    var startX = 0;
    var startY = 0;
    if (!lock) {
        startX = this.getXMouse();
        startY = this.getYMouse();
    }

    stage.dragMc    = this;
    stage.dragRules = {
        startX: startX,
        startY: startY,
        left:   left,
        top:    top,
        right:  right,
        bottom: bottom
    };

    this.setDropTarget();
};

/**
 * stopDrag
 */
Sprite.prototype.stopDrag = function ()
{
    var _root = this.getDisplayObject("_root");
    var stage = _root.getStage();

    stage.dragMc    = null;
    stage.dragRules = null;

    this.setDropTarget();
};

/**
 * executeDrag
 */
Sprite.prototype.executeDrag = function ()
{
    var _root = this.getDisplayObject("_root");
    var stage = _root.getStage();

    var dragRules = stage.dragRules;

    var startX = dragRules.startX;
    var startY = dragRules.startY;

    var left   = dragRules.left;
    var top    = dragRules.top;
    var right  = dragRules.right;
    var bottom = dragRules.bottom;

    var x = this.getX();
    var y = this.getY();

    var xmouse = this.getXMouse();
    var ymouse = this.getYMouse();

    xmouse = xmouse - startX;
    ymouse = ymouse - startY;

    var moveX = x + xmouse;
    var moveY = y + ymouse;

    if (left === null || left === undefined) {
        this.setX(moveX);
        this.setY(moveY);
    } else {
        left   = +left;
        top    = +top;
        right  = +right;
        bottom = +bottom;

        // x
        if (right < moveX) {
            this.setX(right);
        } else if (moveX < left) {
            this.setX(left);
        } else {
            this.setX(moveX);
        }

        // y
        if (bottom < moveY) {
            this.setY(bottom);
        } else if (moveY < top) {
            this.setY(top);
        } else {
            this.setY(moveY);
        }
    }
};

/**
 *
 * @returns {null|*}
 */
Sprite.prototype.getDropTarget = function ()
{
    return this._droptarget;
};

/**
 * setDropTarget
 */
Sprite.prototype.setDropTarget = function ()
{
    this._droptarget = null;

    var _root  = this.getDisplayObject("_root");
    var stage  = _root.getStage();
    var parent = this.getParent();
    if (!parent) {
        parent = stage.getParent();
    }

    var x = _root.getXMouse();
    var y = _root.getYMouse();

    var tags = parent.getTags();
    for (var depth in tags) {
        if (!tags.hasOwnProperty(depth)) {
            continue;
        }

        var id = tags[depth];
        if (id === this.instanceId) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (!(instance instanceof MovieClip)) {
            continue;
        }

        var hit = instance.hitTest(x, y);
        if (hit) {
            this._droptarget = instance;
            break;
        }
    }
};

/**
 * @returns {Array}
 */
Sprite.prototype.getTags = function ()
{
    return this.getContainer();
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
Sprite.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    if (this.removeFlag) {
        return "";
    }

    this.isLoad = true;
    stage.doneTags.unshift(this);

    // sound
    if (this.getClassName() === "MovieClip" && !this.soundStopFlag) {
        var sounds = this.getSounds();
        if (sounds !== undefined) {
            var sLen = sounds.length|0;
            for (var idx = 0; idx < sLen; idx++) {
                if (!(idx in sounds)) {
                    continue;
                }

                var sound = sounds[idx];
                this.startSound(sound);
            }
        }
    }

    // matrix & colorTransform
    var rMatrix         = this.$multiplicationMatrix(matrix, this.getMatrix());
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible)|0;

    // pre render
    var obj       = this.preRender(ctx, rMatrix, rColorTransform, stage, visible);
    var cacheKey  = obj.cacheKey;
    var preCtx    = obj.preCtx;
    var preMatrix = obj.preMatrix;

    // render
    var clips     = [];
    var container = this.getTags();
    var length    = container.length|0;
    if (length) {
        var myStage = this.getStage();
        for (var depth in container) {
            if (!container.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = container[depth]|0;
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            // mask end
            var cLen = clips.length|0;
            var cIdx = 0;
            while (cIdx < cLen) {
                var cDepth = clips[cIdx];
                if (depth > cDepth) {
                    clips.splice(cIdx, 1);
                    ctx.restore();
                    break;
                }
                cIdx = (cIdx + 1)|0;
            }

            // mask start
            if (instance.isClipDepth) {
                ctx.save();
                ctx.beginPath();

                clips[clips.length] = instance.clipDepth|0;
                if (instance.getClassName() === "MovieClip") {
                    stage.isClipDepth = true;
                }
            }

            if (isVisible === 1) {
                instance.setHitRange(rMatrix, stage, visible, cLen);
            }

            // mask
            if (instance.isMask) {
                continue;
            }

            if (instance.isClipDepth) {
                switch (0) {
                    case preMatrix[0]:
                        preMatrix[0] = 0.00000000000001;
                        break;
                    case preMatrix[3]:
                        preMatrix[3] = 0.00000000000001;
                        break;
                }
            }

            cacheKey = cacheKey + instance.render(preCtx, preMatrix, rColorTransform, stage, isVisible);
            if (stage.isClipDepth) {
                preCtx.clip();
                stage.isClipDepth = false;
            }
        }
    }

    if (clips.length || this.getMask()) {
        ctx.restore();
    }

    // post render
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, rMatrix, rColorTransform, stage, obj);
    }

    return cacheKey;
};

/**
 * initFrame
 */
Sprite.prototype.initFrame = function () {};

/**
 * @param stage
 * @param clipEvent
 */
Sprite.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    this.dispatchEvent(clipEvent, stage);
};

/**
 * @param stage
 */
Sprite.prototype.addActions = function (stage)
{
    var myStage = this.getStage();
    var tags    = this.getTags();
    var length  = tags.length;
    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.addActions(stage);
        }
    }
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
Sprite.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var loadStage = this.getStage();
    var tags      = this.getTags();
    var length    = tags.length;
    var hit       = false;
    var rMatrix   = this.$multiplicationMatrix(matrix, this.getMatrix());

    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var obj        = loadStage.getInstance(instanceId);

            hit = obj.renderHitTest(ctx, rMatrix, stage, x, y);
            if (hit) {
                return hit;
            }
        }
    }

    var graphics = this.graphics;
    if (graphics.isDraw) {
        return graphics.renderHitTest(ctx, rMatrix, stage, x, y);
    }

    return hit;
};

/**
 * @param mc
 * @returns {{xMin: *, xMax: number, yMin: *, yMax: number}}
 */
Sprite.prototype.getRect = function (mc)
{
    if (!mc) {
        mc = this;
    }

    var bounds    = mc.getBounds(mc.getOriginMatrix());
    var graphics  = this.graphics;
    var twips     = 20;
    var maxWidth  = graphics.maxWidth / twips;
    var halfWidth = maxWidth / 2;

    var xMin = bounds.xMin + halfWidth;
    var xMax = bounds.xMax - halfWidth;
    var yMin = bounds.yMin + halfWidth;
    var yMax = bounds.yMax - halfWidth;

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};

/**
 * @param matrix
 * @returns {{}}
 */
Sprite.prototype.getBounds = function (matrix)
{
    if (matrix instanceof MovieClip) {
        return matrix.getBounds(matrix.getOriginMatrix());
    }

    var tags = this.getTags();
    var xMax = 0;
    var yMax = 0;
    var xMin = 0;
    var yMin = 0;

    var graphics = this.graphics;
    var isDraw = graphics.isDraw;
    if (isDraw) {
        var maxWidth  = graphics.maxWidth;
        var halfWidth = maxWidth / 2;
        var gBounds   = this.boundsMatrix(graphics.bounds, matrix);
        var twips = (matrix) ? 20 : 1;
        xMin = +((gBounds.xMin - halfWidth) / twips);
        xMax = +((gBounds.xMax + halfWidth) / twips);
        yMin = +((gBounds.yMin - halfWidth) / twips);
        yMax = +((gBounds.yMax + halfWidth) / twips);
    }

    var length = tags.length|0;
    var stage  = this.getStage();
    if (length) {
        if (!isDraw) {
            var no = this.$Number.MAX_VALUE;
            xMax = -no;
            yMax = -no;
            xMin = no;
            yMin = no;
        }

        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag = stage.getInstance(instanceId);
            if (!tag || tag.isClipDepth) {
                continue;
            }

            var matrix2 = (matrix) ? this.$multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
            var bounds  = tag.getBounds(matrix2);
            if (!bounds) {
                continue;
            }

            xMin = +this.$min(xMin, bounds.xMin);
            xMax = +this.$max(xMax, bounds.xMax);
            yMin = +this.$min(yMin, bounds.yMin);
            yMax = +this.$max(yMax, bounds.yMax);
        }
    }

    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {*}
 */
Sprite.prototype.hitCheck = function (ctx, matrix, stage, x, y)
{
    if (!this.getEnabled() ||
        !this.getVisible() ||
        !this.getMouseEnabled()
    ) {
        return false;
    }

    var hitObj;
    var hit = false;
    var matrix2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    var tags   = this.getTags();
    var length = 0 | tags.length;
    if (length) {
        var loadStage = this.getStage();

        tags.reverse();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var tagId    = tags[depth];
            var instance = loadStage.getInstance(tagId);

            switch (instance.getClassName()) {
                case "Shape":
                case "StaticText":
                case "TextField":
                    hit = instance.renderHitTest(ctx, matrix2, stage, x, y);
                    break;
                default:
                    hit = instance.hitCheck(ctx, matrix2, stage, x, y);
                    break;
            }

            if (hit) {
                hitObj = hit;
                if (typeof hit !== "object") {
                    var events = this.events;
                    if (events.press !== undefined ||
                        events.release !== undefined ||
                        events.releaseOutside !== undefined ||
                        events.rollOver !== undefined ||
                        events.rollOut !== undefined ||
                        events.dragOver !== undefined ||
                        events.dragOut !== undefined
                    ) {
                        stage.isHit = hit;
                        hitObj = {
                            parent : this
                        };
                    }
                }

                tags.reverse();

                return hitObj;
            }
        }

        tags.reverse();
    }

    var graphics = this.graphics;
    if (graphics.isDraw) {
        hit = graphics.renderHitTest(ctx, matrix2, stage, x, y);
        if (hit) {
            hitObj = {
                parent : this
            };
        }
    }

    return hitObj;
};
var ActionScriptVersion = function () {};

ActionScriptVersion.prototype.ACTIONSCRIPT2 = 2;
ActionScriptVersion.prototype.ACTIONSCRIPT3 = 3;
/*jshint bitwise: false*/
/**
 * @constructor
 */
var Graphics = function ()
{
    this.clear();
};

/**
 * util
 */
Graphics.prototype = Object.create(Util.prototype);
Graphics.prototype.constructor = Graphics;

/**
 * @type {number}
 */
Graphics.prototype.MOVE_TO = 0;

/**
 * @type {number}
 */
Graphics.prototype.CURVE_TO = 1;

/**
 * @type {number}
 */
Graphics.prototype.LINE_TO = 2;

/**
 * @type {number}
 */
Graphics.prototype.CUBIC = 3;

/**
 * @type {number}
 */
Graphics.prototype.ARC = 4;

/**
 * @type {number}
 */
Graphics.prototype.FILL_STYLE = 5;

/**
 * @type {number}
 */
Graphics.prototype.STROKE_STYLE = 6;

/**
 * @type {number}
 */
Graphics.prototype.FILL = 7;

/**
 * @type {number}
 */
Graphics.prototype.STROKE = 8;

/**
 * @type {number}
 */
Graphics.prototype.LINE_WIDTH = 9;

/**
 * @type {number}
 */
Graphics.prototype.LINE_CAP = 10;

/**
 * @type {number}
 */
Graphics.prototype.LINE_JOIN = 11;

/**
 * @type {number}
 */
Graphics.prototype.MITER_LIMIT = 12;

/**
 * @type {number}
 */
Graphics.prototype.BEGIN_PATH = 13;

/**
 * @returns {string}
 */
Graphics.prototype.getClassName = function ()
{
    return "Graphics";
};

/**
 * @returns {Graphics}
 */
Graphics.prototype.clear = function ()
{
    var no = this.$Number.MAX_VALUE;

    this.bounds      = {xMin: no, xMax: -no, yMin: no, yMax: -no};
    this.maxWidth    = 0;
    this.command     = null;
    this.isDraw      = false;
    this.isFillDraw  = false;
    this.isLineDraw  = false;
    this.cacheKey    = "";
    this.fillRecodes = [];
    this.lineRecodes = [];

    return this;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getFillRecodes = function ()
{
    return this.fillRecodes;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getLineRecodes = function ()
{
    return this.lineRecodes;
};

/**
 * @returns {Array}
 */
Graphics.prototype.getCommand = function ()
{
    return this.command;
};

/**
 * @param command
 */
Graphics.prototype.setCommand = function (command)
{
    this.command = command;
};

/**
 * @returns {string}
 */
Graphics.prototype.getCacheKey = function ()
{
    return this.cacheKey;
};

/**
 * @returns {string}
 */
Graphics.prototype.addCacheKey = function ()
{
    var args     = arguments;
    var cacheKey = "";
    var length   = args.length|0;
    if (length) {
        var i = 0;
        while (i < length) {
            cacheKey = cacheKey + "_" + args[i];
            i = (i + 1)|0;
        }
    }

    this.cacheKey = this.cacheKey + cacheKey;
};

/**
 * @returns {*}
 */
Graphics.prototype.getBounds = function ()
{
    return this.bounds;
};

/**
 * @param x
 * @param y
 */
Graphics.prototype.setBounds = function (x, y)
{
    var bounds  = this.bounds;
    bounds.xMin = this.$min(bounds.xMin, x);
    bounds.xMax = this.$max(bounds.xMax, x);
    bounds.yMin = this.$min(bounds.yMin, y);
    bounds.yMax = this.$max(bounds.yMax, y);
};

/**
 * @param rgb
 * @param alpha
 * @returns {Graphics}
 */
Graphics.prototype.beginFill = function (rgb, alpha)
{
    if (typeof rgb === "string") {
        rgb = this.$colorStringToInt(rgb);
    }

    rgb   = rgb|0;
    alpha = +alpha;
    if (this.$isNaN(alpha)) {
        alpha  = 100;
    } else {
        alpha *= 100;
    }

    var fillRecodes = this.getFillRecodes();

    // beginPath
    if (!this.isFillDraw) {
        fillRecodes[fillRecodes.length] = [this.BEGIN_PATH];
    }

    // Fill Style
    var color = this.$intToRGBA(rgb, alpha);
    fillRecodes[fillRecodes.length] = [this.FILL_STYLE, color.R, color.G, color.B, color.A];

    this.addCacheKey(rgb, alpha);

    // on
    this.isFillDraw = true;
    this.isDraw     = true;

    return this;
};

/**
 * @param width
 * @param rgb
 * @param alpha
 * @param pixelHinting
 * @param noScale
 * @param capsStyle
 * @param jointStyle
 * @param miterLimit
 * @returns {Graphics}
 */
Graphics.prototype.lineStyle = function (width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
{
    var lineRecodes = this.getLineRecodes();

    width = +width;
    if (!this.$isNaN(width)) {
        if (rgb === undefined) {
            rgb = 0;
        }

        if (typeof rgb === "string") {
            rgb = this.$colorStringToInt(rgb);
        }

        if (!capsStyle) {
            capsStyle = "round";
        }

        if (!jointStyle) {
            jointStyle = "round";
        }

        rgb   = rgb|0;
        alpha = +alpha;
        if (this.$isNaN(alpha)) {
            alpha  = 100;
        } else {
            alpha *= 100;
        }

        var color = this.$intToRGBA(rgb, alpha);
        if (width < 0.5) {
            width += 0.2;
        }

        width *= 20;
        this.maxWidth = this.$max(this.maxWidth, width);

        if (this.isLineDraw) {
            lineRecodes[lineRecodes.length] = [this.STROKE];
        }

        lineRecodes[lineRecodes.length] = [this.BEGIN_PATH];
        lineRecodes[lineRecodes.length] = [this.STROKE_STYLE, color.R, color.G, color.B, color.A];
        lineRecodes[lineRecodes.length] = [this.LINE_WIDTH,   width];
        lineRecodes[lineRecodes.length] = [this.LINE_CAP,     capsStyle];
        lineRecodes[lineRecodes.length] = [this.LINE_JOIN,    jointStyle];

        this.addCacheKey(rgb, alpha);

        this.isLineDraw = true;
        this.isDraw = true;

    } else if (this.isLineDraw) {
        this.isLineDraw = false;

        lineRecodes[lineRecodes.length] = [this.STROKE];

        var length      = lineRecodes.length|0;
        var fillRecodes = this.getFillRecodes();
        var i = 0;
        while (i < length) {
            fillRecodes[fillRecodes.length] = lineRecodes[i];
            i = (i + 1)|0;
        }

        this.lineRecodes = [];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.moveTo = function (x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        x *= 20;
        y *= 20;
        this.setBounds(x, y);
        this.addCacheKey(x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.MOVE_TO, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.MOVE_TO, x, y];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.lineTo = function (x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        x *= 20;
        y *= 20;
        this.setBounds(x, y);
        this.addCacheKey(x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.LINE_TO, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.LINE_TO, x, y];
    }

    return this;
};

/**
 * @param cx
 * @param cy
 * @param dx
 * @param dy
 * @returns {Graphics}
 */
Graphics.prototype.curveTo = function (cx, cy, dx, dy)
{
    if (this.isFillDraw || this.isLineDraw) {
        cx *= 20;
        cy *= 20;
        dx *= 20;
        dy *= 20;

        this.setBounds(cx, cy);
        this.setBounds(dx, dy);
        this.addCacheKey(cx, cy, dx, dy);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.CURVE_TO, cx, cy, dx, dy];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.CURVE_TO, cx, cy, dx, dy];
    }

    return this;
};

/**
 * @param cp1x
 * @param cp1y
 * @param cp2x
 * @param cp2y
 * @param x
 * @param y
 * @returns {Graphics}
 */
Graphics.prototype.cubicCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y)
{
    if (this.isFillDraw || this.isLineDraw) {
        cp1x *= 20;
        cp1y *= 20;
        cp2x *= 20;
        cp2y *= 20;
        x    *= 20;
        y    *= 20;

        this.setBounds(x, y);
        this.setBounds(cp1x, cp1y);
        this.setBounds(cp2x, cp2y);
        this.addCacheKey(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @param radius
 * @returns {Graphics}
 */
Graphics.prototype.drawCircle = function (x, y, radius)
{
    if (this.isFillDraw || this.isLineDraw) {
        x      *= 20;
        y      *= 20;
        radius *= 20;

        this.setBounds(x - radius, y - radius);
        this.setBounds(x + radius, y + radius);
        this.addCacheKey(x, y, radius);
    }

    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.ARC, x, y, radius];
    }

    if (this.isLineDraw) {
        var lineRecodes = this.getLineRecodes();
        lineRecodes[lineRecodes.length] = [this.ARC, x, y, radius];
    }

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {Graphics}
 */
Graphics.prototype.drawEllipse = function (x, y, width, height)
{
    var hw = width  / 2; // half width
    var hh = height / 2; // half height
    var x0 = x + hw;
    var y0 = y + hh;
    var x1 = x + width;
    var y1 = y + height;
    var c  = 4 / 3 * (this.$SQRT2 - 1);
    var cw = c * hw;
    var ch = c * hh;

    this.moveTo(x0, y);
    this.cubicCurveTo(x0 + cw, y, x1, y0 - ch, x1, y0);
    this.cubicCurveTo(x1, y0 + ch, x0 + cw, y1, x0, y1);
    this.cubicCurveTo(x0 - cw, y1, x, y0 + ch, x,  y0);
    this.cubicCurveTo(x, y0 - ch, x0 - cw, y, x0, y);

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {Graphics}
 */
Graphics.prototype.drawRect = function (x, y, width, height)
{
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);

    return this;
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @param ellipseWidth
 * @param ellipseHeight
 * @returns {Graphics}
 */
Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight)
{
    var hew = ellipseWidth  / 2;
    var heh = ellipseHeight / 2;
    var c   = 4 / 3 * (this.$SQRT2 - 1);
    var cw  = c * hew;
    var ch  = c * heh;

    var dx0 = x + hew;
    var dx1 = x + width;
    var dx2 = dx1 - hew;

    var dy0 = y + heh;
    var dy1 = y + height;
    var dy2 = dy1 - heh;

    this.moveTo(dx0, y);
    this.lineTo(dx2, y);
    this.cubicCurveTo(dx2 + cw, y, dx1, dy0 - ch, dx1, dy0);
    this.lineTo(dx1, dy2);
    this.cubicCurveTo(dx1, dy2 + ch, dx2 + cw, dy1, dx2, dy1);
    this.lineTo(dx0, dy1);
    this.cubicCurveTo(dx0 - cw, dy1, x, dy2 + ch, x, dy2);
    this.lineTo(x, dy0);
    this.cubicCurveTo(x, dy0 - ch, dx0 - cw, y, dx0, y);

    return this;
};

/**
 * @param vertices
 * @param indices
 * @param uvtData
 * @param culling
 * @returns {Graphics}
 */
Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling)
{
    var length = vertices.length;
    if (length && length % 3 === 0) {
        var i = 0;
        var count = 0;
        if (indices) {
            length = indices.length;
            if (length && length % 3 === 0) {
                i = 0;
                while (i < length) {
                    var idx = indices[i];
                    if (count === 0) {
                        this.moveTo(vertices[idx], vertices[idx + 1]);
                    } else {
                        this.lineTo(vertices[idx], vertices[idx + 1]);
                    }

                    count++;
                    if (count % 3 === 0) {
                        count = 0;
                    }

                    i = (i + 1)|0;
                }
            }
        } else {
            i = 0;
            while (i < length) {
                if (count === 0) {
                    this.moveTo(vertices[i++], vertices[i]);
                } else {
                    this.lineTo(vertices[i++], vertices[i]);
                }

                count++;
                if (count % 3 === 0) {
                    count = 0;
                }

                i = (i + 1)|0;
            }
        }
    }

    return this;
};

/**
 * @returns {Graphics}
 */
Graphics.prototype.endFill = function ()
{
    if (this.isFillDraw) {
        var fillRecodes = this.getFillRecodes();
        fillRecodes[fillRecodes.length] = [this.FILL];
    }

    this.isFillDraw = false;

    return this;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @returns {*}
 */
Graphics.prototype.render = function (ctx, matrix, colorTransform, stage)
{
    var cacheKey = "";
    var alpha    = colorTransform[3] + (colorTransform[7] / 255);
    if (!alpha) {
        return cacheKey;
    }

    var rMatrix = this.$multiplicationMatrix(stage.getMatrix(), matrix);
    var xScale  = +this.$sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
    var yScale  = +this.$sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
    xScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P));
    yScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P));

    var maxWidth  = this.maxWidth;
    var halfWidth = maxWidth / 2;

    var bounds = this.getBounds();
    var xMax   = +bounds.xMax;
    var xMin   = +bounds.xMin;
    var yMax   = +bounds.yMax;
    var yMin   = +bounds.yMin;

    var W = this.$abs(this.$ceil((xMax - xMin + maxWidth) * xScale))|0;
    var H = this.$abs(this.$ceil((yMax - yMin + maxWidth) * yScale))|0;
    if (W <= 0 || H <= 0) {
        return cacheKey;
    }

    var cache;
    var canvas;
    var isClipDepth = stage.clipMc || this.isClipDepth;
    if (!isClipDepth) {
        var cacheStore = this.$cacheStore;

        cacheKey = cacheStore.generateKey(0, [xScale, yScale], colorTransform);
        cacheKey = cacheKey + this.getCacheKey();

        cache = cacheStore.getCache(cacheKey);
        if (!cache && stage.getWidth() > W && stage.getHeight() > H && cacheStore.size > (W * H)) {
            canvas        = cacheStore.getCanvas();
            canvas.width  = W;
            canvas.height = H;
            cache         = canvas.getContext("2d");

            var cMatrix = [xScale, 0, 0, yScale, (-xMin + halfWidth) * xScale, (-yMin + halfWidth) * yScale];
            cache.setTransform(cMatrix[0], cMatrix[1], cMatrix[2], cMatrix[3], cMatrix[4], cMatrix[5]);
            cache = this.executeRender(cache, this.$min(xScale, yScale), colorTransform, false);
            cacheStore.setCache(cacheKey, cache);
        }
    }

    if (cache) {
        canvas = cache.canvas;

        var sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin - halfWidth, yMin - halfWidth];

        var m2 = this.$multiplicationMatrix(rMatrix, sMatrix);
        ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);

        if (this.$isAndroid4x && !this.$isChrome) {
            ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
            ctx.fillRect(0, 0, W, H);
        } else {
            ctx.drawImage(canvas, 0, 0, W, H);
        }
    } else {
        ctx.setTransform(rMatrix[0],rMatrix[1],rMatrix[2],rMatrix[3],rMatrix[4],rMatrix[5]);
        this.executeRender(ctx, this.$min(rMatrix[0], rMatrix[3]), colorTransform, isClipDepth);
    }

    return cacheKey + "_" + rMatrix[4] + "_" + rMatrix[5];
};

/**
 * @param ctx
 * @param minScale
 * @param colorTransform
 * @param isClip
 */
Graphics.prototype.executeRender = function (ctx, minScale, colorTransform, isClip)
{
    var fillRecodes = this.getFillRecodes();
    var lineRecodes = this.getLineRecodes();

    var lLen = lineRecodes.length;
    var fLen = fillRecodes.length;

    if (fLen || lLen) {
        var command = this.getCommand();

        // build command
        if (command === null) {
            command = this.buildCommand();
            this.setCommand(command);
        }

        ctx.beginPath();
        command(ctx, colorTransform, isClip);

        // rendering
        switch (true) {
            case isClip:
                ctx.clip();
                break;
            default:
                if (this.isFillDraw) {
                    ctx.fill();
                }

                if (this.isLineDraw) {
                    ctx.stroke();
                }
                break;
        }
    }

    var resetCss    = "rgba(0,0,0,1)";
    ctx.strokeStyle = resetCss;
    ctx.fillStyle   = resetCss;
    ctx.globalAlpha = 1;

    return ctx;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
Graphics.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var command = this.getCommand();

    // build command
    if (command === null) {
        command = this.buildCommand();
        this.setCommand(command);
    }

    var m = this.$multiplicationMatrix(stage.getMatrix(), matrix);
    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);

    ctx.beginPath();
    command(ctx, [1,1,1,1,0,0,0,0], true);

    var hit = ctx.isPointInPath(x, y);
    if (hit) {
        return hit;
    }

    if ("isPointInStroke" in ctx) {
        hit = ctx.isPointInStroke(x, y);
        if (hit) {
            return hit;
        }
    }

    return hit;
};


/**
 * @returns {*}
 */
Graphics.prototype.buildCommand = function ()
{
    var fillRecodes = this.getFillRecodes();
    var lineRecodes = this.getLineRecodes();

    var length = lineRecodes.length;
    if (length) {
        var i = 0;
        while (i < length) {
            fillRecodes[fillRecodes.length] = lineRecodes[i];
            i = (i + 1)|0;
        }

        // reset
        this.lineRecodes = [];
    }

    return this.$vtc.buildCommand(fillRecodes);
};
/**
 * @constructor
 */
var MovieClip = function ()
{
    Sprite.call(this);

    this._currentframe = 1;
    this.removeTags    = [];
    this.actions       = [];
    this.labels        = [];

    // flag
    this.stopFlag = false;
    this.isAction = true;

    // clip
    this.isClipDepth = false;
    this.clipDepth   = 0;

    // sound
    this.sounds        = [];
    this.soundStopFlag = false;
};

/**
 * extends
 * @type {Sprite}
 */
MovieClip.prototype = Object.create(Sprite.prototype);
MovieClip.prototype.constructor = MovieClip;

/**
 * @returns {string}
 */
MovieClip.prototype.getClassName = function ()
{
    return "MovieClip";
};

/**
 * @param name
 * @param stage
 */
MovieClip.prototype.dispatchOnEvent = function (name, stage)
{
    var as = this.variables[name];
    if (as) {
        this.setActionQueue(as, stage);
    }
};

/**
 * @param name
 * @param depth
 * @returns {MovieClip}
 */
MovieClip.prototype.createEmptyMovieClip = function (name, depth)
{
    var stage = this.getStage();

    if (!name) {
        return undefined;
    }

    var mc = this.getDisplayObject(name);
    if (!mc) {
        mc = new MovieClip();
    }

    depth += 16384;

    mc.setName(name);
    mc.setLevel(depth);
    mc.setParent(this);
    mc.setStage(stage);

    var container   = this.getContainer();
    var totalFrames = this.getTotalFrames() + 1;
    var placeObject = new PlaceObject();
    var instanceId  = this.instanceId;

    var frame = 1;
    while (frame < totalFrames) {
        if (!(frame in container)) {
            container[frame] = [];
        }

        container[frame][depth] = mc.instanceId;
        stage.setPlaceObject(placeObject, instanceId, depth, frame);

        frame = 0 | frame + 1;
    }

    return mc;
};

/**
 * @param name
 * @param depth
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {TextField}
 */
MovieClip.prototype.createTextField = function (name, depth, x, y, width, height)
{
    if (16384 > depth) {
        depth += 16384;
    }

    var textField = new TextField(name, depth, width, height);
    textField.setX(x);
    textField.setY(y);
    textField.setParent(this);
    textField.setStage(this.getStage());
    textField.setInitParams();

    var container = this.getContainer();
    for (var frame in container) {
        if (!container.hasOwnProperty(frame)) {
            continue;
        }

        container[frame][depth] = textField.instanceId;
    }

    return textField;
};

/**
 * @param r
 * @param g
 * @param b
 */
MovieClip.prototype.setBackgroundColor = function (r, g, b)
{
    var stage = this.getStage();
    stage.setBackgroundColor(r, g, b);
};

/**
 * play
 */
MovieClip.prototype.play = function ()
{
    this.stopFlag = false;
};

/**
 * stop
 */
MovieClip.prototype.stop = function ()
{
    this.stopFlag = true;
};

/**
 * @param frame
 */
MovieClip.prototype.gotoAndPlay = function (frame)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (typeof frame === "number" && frame > 0) {
        this.setNextFrame(frame);
        this.play();
    }
};

/**
 * @param frame
 */
MovieClip.prototype.gotoAndStop = function (frame)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (typeof frame === "number" && frame > this.getTotalFrames()) {
        frame = this.getTotalFrames();
        this.isAction = false;
    }

    if (frame > 0) {
        this.setNextFrame(frame);
        this.stop();
    }
};

/**
 * stopAllSounds
 */
MovieClip.prototype.stopAllSounds = function ()
{
    var stage = this.getStage();

    var loadSounds = stage.loadSounds;
    var length     = 0 | loadSounds.length;

    if (length) {
        var stopSound = function () {
            this.removeEventListener("pause", stopSound);
            this.currentTime = 0;
            this.loop = false;
        };

        var idx = 0;
        while (idx < length) {
            if (!(idx in loadSounds)) {
                continue;
            }

            var audio = loadSounds[idx];
            audio.addEventListener("pause", stopSound);
            audio.pause();

            idx = 0 | idx  + 1;
        }
    }

    stage.loadSounds = [];
};

/**
 * @param url
 * @param target
 * @param SendVarsMethod
 * @returns {number}
 */
MovieClip.prototype.loadMovie = function (url, target, SendVarsMethod)
{
    var stage    = this.getStage();
    var targetMc = null;

    if (!target) {
        target   = this.getName();
        targetMc = this;
    }

    if (!targetMc) {
        if (typeof target === "string") {
            var _level = target.substr(0, 6);
            if (_level === "_level") {
                target = +target.substr(6);
            }
        }

        if (typeof target === "number") {
            var parent = stage.getParent();
            if (!parent) {
                parent = stage.getParent();
            }

            var tags = parent.getTags();
            targetMc = tags[target];
        } else {
            targetMc = this.getDisplayObject(target);
        }
    }

    if (targetMc) {
        this.unloadMovie(targetMc);

        var xmlHttpRequest = new XMLHttpRequest();

        var targetUrl = url;
        var body      = null;

        if (SendVarsMethod === 2) {
            var urls = url.split("?");
            if (urls[1]) {
                body = urls[1];
            }

            targetUrl = urls[0];
            xmlHttpRequest.open("POST", targetUrl, true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            xmlHttpRequest.open("GET", targetUrl, true);
        }

        if (this.$canXHR2) {
            xmlHttpRequest.responseType = "arraybuffer";
        } else {
            xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
        }

        var self = this;
        xmlHttpRequest.onreadystatechange = function ()
        {
            var readyState = xmlHttpRequest.readyState;
            var status = xmlHttpRequest.status;
            if (readyState === 4) {
                switch (status) {
                    case 200:
                    case 304:
                        var _root     = self.getDisplayObject("_root");
                        var rootStage = _root.getStage();
                        var data      = (self.$canXHR2) ? xmlHttpRequest.response : xmlHttpRequest.responseText;

                        var loadStage = new Stage();
                        self.$loadStages[loadStage.getId()] = loadStage;
                        targetMc._url = url;
                        targetMc.reset();
                        loadStage.setParent(targetMc);
                        targetMc.setLoadStage(loadStage);
                        loadStage.parse(data, targetUrl);
                        loadStage.stop();

                        if (target === 0 || (typeof target !== "number" && !targetMc.getParent())) {
                            stage.stop();
                            loadStage.setId(stage.getId());
                            loadStage.setName(stage.getName());
                            loadStage.backgroundColor = stage.backgroundColor;
                            loadStage.initCanvas();
                            loadStage.loadStatus = 2;
                            loadStage.loadEvent();
                            delete loadStages[loadStage.getId()];
                            stages[stage.getId()] = loadStage;
                            stage = null;
                        }

                        var onData = targetMc.variables.onData;
                        if (typeof onData === "function") {
                            loadStage.executeEventAction(onData, targetMc);
                        }

                        var clipEvent = self.$clipEvent;
                        clipEvent.type = "data";
                        targetMc.dispatchEvent(clipEvent, rootStage);

                        targetMc.addActions(rootStage);

                        break;
                }
            }
        };

        xmlHttpRequest.send(body);
    }
};

/**
 * @param target
 * @returns {number}
 */
MovieClip.prototype.unloadMovie = function (target)
{
    var targetMc = null;
    if (target instanceof MovieClip) {
        targetMc = target;
    } else {
        targetMc = this.getDisplayObject(target);
        if (!targetMc) {
            return 0;
        }
    }

    // delete
    targetMc.reset();
    targetMc.setLoadStage(null);
    targetMc.setStage(this.getStage());
    targetMc.container    = [];
    targetMc.actions      = [];
    targetMc.instances    = [];
    targetMc.labels       = [];
    targetMc.sounds       = [];
    targetMc.removeTags   = [];
    targetMc._totalframes = 1;
    targetMc._url         = null;
    targetMc._lockroot    = undefined;

    var loadStage = targetMc.getStage();
    delete this.$loadStages[loadStage.getId()];
};

/**
 * @param url
 * @param target
 * @param method
 * @returns {*}
 */
MovieClip.prototype.getURL = function (url, target, method)
{
    if (typeof url === "string") {
        var cmd = url.substr(0, 9);
        if (cmd === "FSCommand") {
            var values = url.split(":");
            cmd = values.pop();
            var str = arguments[1];
            if (str === undefined) {
                str = "";
            }

            var stage     = this.getStage();
            var FSCommand = stage.abc.flash.system.fscommand;
            return FSCommand.apply(stage, [cmd, str]);
        }
    }

    if (target && typeof target === "string") {
        switch (target.toLowerCase()) {
            case "_self":
            case "_blank":
            case "_parent":
            case "_top":
                break;
            case "post":
                target = "_self";
                method = "GET";
                break;
            case "get":
                target = "_self";
                method = "GET";
                break;
            default:
                if (!method) {
                    method = "GET";
                }
                this.loadMovie(url, target, method);
                return 0;
        }
    }

    // form
    if (method === "POST") {
        var form    = this.$document.createElement("form");
        form.action = url;
        form.method = method;
        if (target) {
            form.target = target;
        }

        var urls = url.split("?");
        if (urls.length > 1) {
            var pears      = urls[1].split("&");
            var pLen       = pears.length;
            var _encodeURI = encodeURI;

            var pIdx = 0;
            while (pIdx < pLen) {
                var pear = pears[pIdx].split("=");
                pIdx = 0 | pIdx + 1;

                var input   = this.$document.createElement("input");
                input.type  = "hidden";
                input.name  = pear[0];
                input.value = _encodeURI(pear[1] || "");
                form.appendChild(input);
            }
        }

        this.$document.body.appendChild(form);
        form.submit();
    } else {
        url = url.replace(/'/g, "\\'");
        var func = new this.$Function("location.href = '" + url + "';");
        func();
    }
};

/**
 * @param url
 * @param target
 * @param method
 */
MovieClip.prototype.loadVariables = function (url, target, method)
{
    var _this = this;
    var targetMc = _this;
    if (target) {
        targetMc = _this.getDisplayObject(target);
    }

    if (targetMc) {
        var xmlHttpRequest = new XMLHttpRequest();
        var body = null;
        if (method === "POST") {
            var urls = url.split("?");
            if (urls[1]) {
                body = urls[1];
            }
            xmlHttpRequest.open(method, urls[0], true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            xmlHttpRequest.open("GET", url, true);
        }

        xmlHttpRequest.onreadystatechange = function ()
        {
            var readyState = xmlHttpRequest.readyState;
            if (readyState === 4) {
                var status = xmlHttpRequest.status;
                switch (status) {
                    case 200:
                    case 304:
                        var responseText = decodeURIComponent(xmlHttpRequest.responseText);
                        var pairs = responseText.split("&");
                        var length = pairs.length;
                        for (var idx = 0; idx < length; idx++) {
                            var pair = pairs[idx];
                            var values = pair.split("=");
                            targetMc.setVariable(values[0], values[1]);
                        }

                        var _root = _this.getDisplayObject();
                        var rootStage = _root.getStage();
                        var stage = _this.getStage();
                        var onData = targetMc.variables.onData;
                        if (typeof onData === "function") {
                            stage.executeEventAction(onData, targetMc);
                        }

                        clipEvent.type = "data";
                        targetMc.dispatchEvent(clipEvent, rootStage);

                        break;
                }
            }
        };
        xmlHttpRequest.send(body);
    }
};

/**
 * @returns {boolean}
 */
MovieClip.prototype.hitTest = function ()
{
    var _this = this;
    var targetMc = arguments[0];
    var x = 0;
    var y = 0;
    var bool = false;
    if (!(targetMc instanceof MovieClip)) {
        x = arguments[0];
        y = arguments[1];
        bool = arguments[2];
        if (!x || !y) {
            return false;
        }
    }

    var bounds = _this.getHitBounds();
    var xMax = bounds.xMax;
    var xMin = bounds.xMin;
    var yMax = bounds.yMax;
    var yMin = bounds.yMin;

    if (targetMc instanceof MovieClip) {
        var targetBounds = targetMc.getHitBounds();
        var txMax = targetBounds.xMax;
        var txMin = targetBounds.xMin;
        var tyMax = targetBounds.yMax;
        var tyMin = targetBounds.yMin;
        return (txMax > xMin && tyMax > yMin && xMax > txMin && yMax > tyMin);
    } else {
        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
            if (bool) {
                var matrix = [1,0,0,1,0,0];
                var mc = _this;
                var _multiplicationMatrix = _this.multiplicationMatrix;
                while (true) {
                    var parent = mc.getParent();
                    if (!parent.getParent()) {
                        break;
                    }
                    matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
                    mc = parent;
                }
                var _root = _this.getDisplayObject("_root");
                var stage = _root.getStage();
                var ctx = stage.hitContext;
                var scale = stage.getScale();
                x *= scale;
                y *= scale;
                y *= _devicePixelRatio;
                x *= _devicePixelRatio;

                return _this.renderHitTest(ctx, matrix, stage, x, y);
            } else {
                return true;
            }
        }
        return false;
    }
};

/**
 * @returns {{xMin: *, xMax: *, yMin: *, yMax: *}}
 * @returns {*}
 */
MovieClip.prototype.getHitBounds = function ()
{
    var _this = this;
    var mc = _this;
    var matrix = _this.getMatrix();
    var _multiplicationMatrix = _this.multiplicationMatrix;
    while (true) {
        var parent = mc.getParent();
        if (!parent.getParent()) {
            break;
        }
        matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
        mc = parent;
    }
    return _this.getBounds(matrix);
};

/**
 * @param depth
 * @returns {*}
 */
MovieClip.prototype.getInstanceAtDepth = function (depth)
{
    var _this = this;
    var parent = _this.getParent();
    if (!parent) {
        parent = _this.getDisplayObject("_root");
    }
    var tags = parent.getTags();
    depth += 16384;
    return tags[depth];
};

/**
 * swapDepths
 */
MovieClip.prototype.swapDepths = function ()
{
    var _this = this;
    var mc = arguments[0];
    var depth = 0;
    var parent = _this.getParent();
    if (parent) {
        var tags = parent.getTags();
        if (mc instanceof MovieClip) {
            if (parent === mc.getParent()) {
                depth = _this.getDepth() + 16384;
                var swapDepth = mc.getDepth() + 16384;
                _this.setDepth(depth, swapDepth, mc);
            }
        } else {
            depth = arguments[0];
            if (this.$isNaN(depth)) {
                depth = parent.getNextHighestDepth();
            }
            if (16384 > depth) {
                depth += 16384;
            }
            if (depth in tags) {
                var id = tags[depth];
                if (id !== _this.instanceId) {
                    var stage = _this.getStage();
                    var instance = stage.getInstance(id);
                    _this.swapDepths(instance);
                }
            } else {
                _this.setDepth(depth, null, null);
            }
        }
    }
};

/**
 * @param id
 * @param name
 * @param depth
 * @param object
 * @returns {*}
 */
MovieClip.prototype.attachMovie = function (id, name, depth, object)
{
    var movieClip = null;
    var _this = this;
    if (_isNaN(depth)) {
        depth = _this.getNextHighestDepth();
    }
    if (depth < 16384) {
        depth += 16384;
    }

    var mc = _this.getDisplayObject(name);
    if (mc) {
        mc.removeMovieClip();
    }

    var stage = _this.getStage();
    var exportAssets = stage.exportAssets;
    if (id in exportAssets) {
        var characterId = exportAssets[id];
        var tag = stage.getCharacter(characterId);
        if (tag) {
            movieClip = new MovieClip();
            movieClip.setStage(stage);
            movieClip.setParent(_this);
            movieClip.setCharacterId(characterId);
            movieClip.setLevel(depth);
            movieClip.setName(name);
            movieClip.setTarget(_this.getTarget() + "/" + name);

            // init action
            var initAction = stage.initActions[characterId];
            if (typeof initAction === "function") {
                movieClip.active = true;
                initAction.apply(movieClip);
                movieClip.reset();
            }

            // registerClass
            var RegClass = stage.registerClass[characterId];
            if (RegClass) {
                movieClip.variables.registerClass = new RegClass();
            }

            var swfTag = new SwfTag(stage, null);
            swfTag.build(tag, movieClip);

            var placeObject = new PlaceObject();
            var instanceId = _this.instanceId;
            var totalFrame = _this.getTotalFrames() + 1;
            var container = _this.getContainer();
            for (var frame = 1; frame < totalFrame; frame++) {
                if (!(frame in container)) {
                    container[frame] = [];
                }
                container[frame][depth] = movieClip.instanceId;
                stage.setPlaceObject(placeObject, instanceId, depth, frame);
            }

            if (object) {
                for (var prop in object) {
                    if (!object.hasOwnProperty(prop)) {
                        continue;
                    }
                    movieClip.setProperty(prop, object[prop]);
                }
            }

            var _root = _this.getDisplayObject("_root");
            var rootStage = _root.getStage();
            movieClip.addActions(rootStage);
        }
    }
    return movieClip;
};

/**
 * @returns {number}
 */
MovieClip.prototype.getNextHighestDepth = function ()
{
    var depth = 0;
    var _this = this;
    var container = _this.getContainer();
    for (var idx in container) {
        if (!container.hasOwnProperty(idx)) {
            continue;
        }
        var children = container[idx];
        depth = _max(depth, children.length);
    }
    if (16384 > depth) {
        depth = 0;
    }
    return depth;
};

/**
 * @returns {*}
 */
MovieClip.prototype.getBytesLoaded = function ()
{
    var _this = this;
    var stage = _this.getStage();
    var bitio = stage.bitio;
    return (!bitio) ? stage.fileSize : bitio.byte_offset;
};

/**
 * @returns {number|*|fileLength}
 */
MovieClip.prototype.getBytesTotal = function ()
{
    var _this = this;
    var stage = _this.getStage();
    return stage.fileSize;
};

/**
 * updateAfterEvent
 */
MovieClip.prototype.updateAfterEvent = function ()
{
    var _this = this;
    var _root = _this.getDisplayObject("_root");
    var stage = _root.getStage();
    stage.touchRender();
};

/**
 * @returns {*}
 */
MovieClip.prototype.duplicateMovieClip = function ()
{
    var _this = this;
    var _root = _this.getDisplayObject("_root");
    var stage = _root.getStage();
    var target = arguments[0];
    var name = arguments[1];
    var depth = arguments[2];

    var targetMc = _this.getDisplayObject(name);
    var parent;
    var object;
    if (!targetMc && stage.getVersion() > 4) {
        target = arguments[0];
        depth = arguments[1];
        if (_isNaN(depth)) {
            parent = _this.getParent();
            if (!parent) {
                parent = stage.getParent();
            }
            depth = parent.getNextHighestDepth();
        }
        object = arguments[2];
        targetMc = _this;
    }

    if (16384 > depth) {
        depth += 16384;
    }

    var cloneMc;
    if (targetMc && targetMc.getCharacterId() !== 0) {
        stage = targetMc.getStage();
        parent = targetMc.getParent();
        if (!parent) {
            parent = stage.getParent();
        }

        var char = stage.getCharacter(targetMc.characterId);
        var swftag = new SwfTag(stage);
        if (char instanceof Array) {
            cloneMc = new MovieClip();
            cloneMc.setStage(stage);
            cloneMc.setParent(parent);
            cloneMc.setLevel(depth);
            cloneMc.setTotalFrames(targetMc.getTotalFrames());
            cloneMc.setCharacterId(targetMc.characterId);
            swftag.build(char, cloneMc);
        } else {
            var tag = {
                CharacterId: targetMc.characterId,
                Ratio: 0,
                Depth: depth
            };
            cloneMc = swftag.buildObject(tag, parent);
        }

        cloneMc.setName(target);
        if (targetMc._matrix) {
            cloneMc._blendMode = targetMc._blendMode;
            cloneMc._filters = targetMc._filters;
            cloneMc._matrix = _this.cloneArray(targetMc._matrix);
            cloneMc._colorTransform = _this.cloneArray(targetMc._colorTransform);
        }

        var totalFrame = parent.getTotalFrames() + 1;
        var container = parent.getContainer();
        var instanceId = parent.instanceId;
        var placeObjects = stage.placeObjects[instanceId];
        var level = targetMc.getLevel();
        for (var frame = 1; frame < totalFrame; frame++) {
            if (!(frame in container)) {
                container[frame] = [];
            }
            container[frame][depth] = cloneMc.instanceId;

            if (frame in placeObjects) {
                var placeObject = placeObjects[frame][level];
                if (placeObject) {
                    if (!(frame in placeObjects)) {
                        placeObjects[frame] = [];
                    }
                    placeObjects[frame][depth] = placeObject.clone();
                }
            }
        }

        if (object) {
            for (var prop in object) {
                if (!object.hasOwnProperty(prop)) {
                    continue;
                }
                cloneMc.setProperty(prop, object[prop]);
            }
        }

        cloneMc.addActions(stage);
    }

    return cloneMc;
};

/**
 * @param name
 */
MovieClip.prototype.removeMovieClip = function (name)
{
    var _this = this;
    var targetMc = _this;
    if (typeof name === "string") {
        var target = _this.getDisplayObject(name);
        if (target) {
            targetMc = target;
        }
    }

    var depth = targetMc.getDepth() + 16384;
    var level = targetMc.getLevel();
    if (targetMc instanceof MovieClip && depth >= 16384) {
        targetMc.reset();
        targetMc.removeFlag = true;
        var parent = targetMc.getParent();
        var container = parent.getContainer();
        var instanceId = targetMc.instanceId;
        var tagId;
        for (var frame = parent.getTotalFrames() + 1; --frame;) {
            if (!(frame in container)) {
                continue;
            }

            var tags = container[frame];
            if (depth in tags) {
                tagId = tags[depth];
                if (tagId === instanceId) {
                    delete container[frame][depth];
                }
            }

            if (depth !== level && 16384 > level) {
                if (!(level in tags)) {
                    tags[level] = instanceId;
                }
            }
        }
    }
};

/**
 * initFrame
 */
MovieClip.prototype.initFrame = function ()
{
    this.active = true;

    var stage  = this.getStage();
    var tags   = this.getTags();
    var length = tags.length;
    if (length) {
        tags.reverse();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var instance   = stage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.initFrame();
        }
        tags.reverse();
    }

    var initAction = stage.initActions[this.getCharacterId()];
    if (typeof initAction === "function") {
        initAction.apply(this);
    }
};

/**
 * @param stage
 * @param clipEvent
 */
MovieClip.prototype.putFrame = function (stage, clipEvent)
{
    var prevTags;
    var myStage  = this.getStage();
    if (!this.stopFlag && this.active) {
        var frame       = this.getCurrentFrame()|0;
        var totalFrames = this.getTotalFrames()|0;
        if (totalFrames > 1) {
            if (this.isLoad) {
                prevTags = this.getTags();
                frame = (frame + 1)|0;
            }

            if (frame > totalFrames) {
                frame = 1;
                this.resetCheck();
            }

            this.setCurrentFrame(frame);
            this.remove(stage);

            this.isAction      = true;
            this.soundStopFlag = false;
        }
    }

    if (this.removeFlag) {
        return 0;
    }

    this.active = true;
    if (prevTags) {
        if (this.isSwap) {
            this.resetSwap();
        }

        var tags   = this.getTags();
        var length = tags.length;
        if (length && tags.toString() !== prevTags.toString()) {
            for (var depth in tags) {
                if (!tags.hasOwnProperty(depth)) {
                    continue;
                }

                var instanceId = tags[depth];
                if (depth in prevTags && instanceId === prevTags[depth]) {
                    continue;
                }

                var instance = myStage.getInstance(instanceId);
                if (instance && instance.getClassName() === "MovieClip") {
                    stage.newTags.unshift(instance);
                }
            }
        }
    }

    if (this.isLoad) {
        clipEvent.type = "enterFrame";
        this.dispatchEvent(clipEvent, stage);
        this.dispatchOnEvent("onEnterFrame", stage);
        this.addTouchEvent(stage);

        if (this.isAction) {
            this.isAction = false;
            var as = this.getActions(this.getCurrentFrame());
            if (as) {
                this.setActionQueue(as, stage);
            }
        }
    } else {
        // init action
        var initAction = myStage.initActions[this.getCharacterId()];
        if (typeof initAction === "function") {
            initAction.apply(this);
        }
    }
};

/**
 * nextFrame
 */
MovieClip.prototype.nextFrame = function ()
{
    var _this = this;
    var frame = _this.getCurrentFrame();
    frame++;
    _this.setNextFrame(frame);
    _this.stop();
};

/**
 * prevFrame
 */
MovieClip.prototype.prevFrame = function ()
{
    var frame = this.getCurrentFrame()|0;
    frame = (frame - 1)|0;
    this.setNextFrame(frame);
    this.stop();
};

/**
 * @returns {number}
 */
MovieClip.prototype.getCurrentFrame = function ()
{
    return this._currentframe;
};

/**
 * @param frame
 */
MovieClip.prototype.setCurrentFrame = function (frame)
{
    this._currentframe = frame|0;
};

/**
 * @param frame
 */
MovieClip.prototype.setNextFrame = function (frame)
{
    if (frame > 0 && this.getCurrentFrame() !== frame) {
        this.isAction = true;

        if (frame > this.getTotalFrames()) {
            frame = this.getTotalFrames()|0;
            this.isAction = false;
        }

        var maxFrame = (this.$max(frame, this.getCurrentFrame()) + 1)|0;
        var minFrame = this.$min(frame, this.getCurrentFrame())|0;

        var tag, tagId, depth, nextTag, nextTagId;
        var checked  = [];
        var stage    = this.getStage();
        var tags     = this.getTags();
        var nextTags = this.getTags(frame);

        var length = this.$max(tags.length, nextTags.length)|0;
        if (length) {
            depth = 0;
            while (depth < length) {
                tagId     = (depth in tags) ? tags[depth]|0 : 0;
                nextTagId = (depth in nextTags) ? nextTags[depth]|0 : 0;

                if (!tagId && !nextTagId) {
                    depth = (depth + 1)|0;
                    continue;
                }

                if (tagId && nextTagId) {
                    if (tagId === nextTagId) {
                        checked[tagId] = true;
                        depth = (depth + 1)|0;
                        continue;
                    }

                    tag     = stage.getInstance(tagId);
                    nextTag = stage.getInstance(nextTagId);

                    tag.reset();
                    nextTag.reset();

                    checked[tagId]     = true;
                    checked[nextTagId] = true;
                } else if (tagId) {
                    tag = stage.getInstance(tagId);
                    tag.reset();
                    checked[tagId] = true;
                } else if (nextTagId) {
                    nextTag = stage.getInstance(nextTagId);
                    nextTag.reset();
                    checked[nextTagId] = true;
                }

                depth = (depth + 1)|0;
            }
        }

        if (checked.length) {
            var chkFrame = minFrame;
            while (chkFrame < maxFrame) {
                var container = this.getTags(chkFrame);
                if (!container.length) {
                    chkFrame = (chkFrame + 1)|0;
                    continue;
                }

                chkFrame = (chkFrame + 1)|0;
                for (depth in container) {
                    if (!container.hasOwnProperty(depth)) {
                        continue;
                    }

                    tagId = container[depth|0]|0;
                    if (tagId in checked) {
                        continue;
                    }

                    checked[tagId] = true;
                    tag = stage.getInstance(tagId);
                    tag.reset();
                }
            }
        }

        this.setCurrentFrame(frame);
        this.soundStopFlag = false;

        var _root     = this.getDisplayObject("_root");
        var rootStage = _root.getStage();
        this.addActions(rootStage);
    }
};

/**
 * @returns {number}
 */
MovieClip.prototype.getTotalFrames = function ()
{
    return this._totalframes;
};

/**
 * @param frame
 */
MovieClip.prototype.setTotalFrames = function (frame)
{
    this._totalframes  = frame|0;
    this._framesloaded = frame|0;
};

/**
 * addLabel
 * @param frame
 * @param name
 */
MovieClip.prototype.addLabel = function (frame, name)
{
    name = name + "";
    this.labels[name.toLowerCase()] = frame|0;
};

/**
 * @param name
 * @returns {*}
 */
MovieClip.prototype.getLabel = function (name)
{
    name = name + "";
    return this.labels[name.toLowerCase()];
};

/**
 * @param frame
 * @param obj
 */
MovieClip.prototype.addSound = function (frame, obj)
{
    if (!(frame in this.sounds)) {
        this.sounds[frame] = [];
    }
    this.sounds[frame].push(obj);
};

/**
 * @returns {*}
 */
MovieClip.prototype.getSounds = function ()
{
    return this.sounds[this.getCurrentFrame()|0];
};

/**
 * @param sound
 */
MovieClip.prototype.startSound = function (sound)
{
    var stage   = this.getStage();
    var soundId = sound.SoundId|0;

    var tag = stage.getCharacter(soundId);
    if (!tag) {
        return 0;
    }

    var soundInfo = tag.SoundInfo;
    this.$startSound(sound.Audio, soundInfo);
    this.soundStopFlag = true;
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getTags = function (frame)
{
    return this.container[frame || this.getCurrentFrame()] || [];
};

/**
 * @param frame
 * @param tags
 */
MovieClip.prototype.setRemoveTag = function (frame, tags)
{
    var removeTags = [];

    var length = tags.length|0;
    var i = 0;
    while (i < length) {
        var tag = tags[i];
        i = (i + 1)|0;

        removeTags[tag.Depth] = 1;
    }

    this.removeTags[frame] = removeTags;
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getRemoveTags = function (frame)
{
    return this.removeTags[frame];
};

/**
 * @param stage
 */
MovieClip.prototype.remove = function (stage)
{
    var removeTags = this.getRemoveTags(this.getCurrentFrame());
    if (removeTags) {
        var myStage = this.getStage();
        var frame   = (this.getCurrentFrame() - 1)|0;
        var tags    = this.getTags(frame);
        for (var idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var instanceId = tags[idx]|0;
            var tag = myStage.getInstance(instanceId);
            if (!tag) {
                continue;
            }

            if (tag.getClassName() === "MovieClip") {
                var depth = (tag.getDepth() + 16384)|0;
                if (!(depth in removeTags)) {
                    continue;
                }

                var clipEvent  = this.$clipEvent;
                clipEvent.type = "unload";
                this.dispatchEvent(clipEvent, stage);

                tag.reset();
            } else {
                if (!(idx in removeTags)) {
                    continue;
                }

                tag.reset();
            }
        }
    }
};

/**
 * resetCheck
 */
MovieClip.prototype.resetCheck = function ()
{
    var stage = this.getStage();

    var instances = this.getInstances();
    for (var id in instances) {
        if (!instances.hasOwnProperty(id)) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (!instance || (!instance.getRatio() && !instance.removeFlag)) {
            continue;
        }

        instance.reset();
    }
};

/**
 * resetSwap
 */
MovieClip.prototype.resetSwap = function ()
{
    var _this = this;
    var stage = _this.getStage();
    var currentTags = _this.getTags();
    var totalFrames = _this.getTotalFrames() + 1;
    for (var frame = 1; frame < totalFrames; frame++) {
        var tags = _this.getTags(frame);
        var length = tags.length;
        if (length) {
            var resetTags = [];
            for (var depth in tags) {
                if (!tags.hasOwnProperty(depth)) {
                    continue;
                }

                depth |= 0;
                var tagId = tags[depth];
                var instance = stage.getInstance(tagId);
                if (!instance) {
                    delete tags[depth];
                    continue;
                }

                if (instance.active) {
                    continue;
                }

                if (instance.getLevel() !== depth) {
                    if (!(instance.getLevel() in currentTags)) {
                        instance._depth = null;
                        resetTags[instance.getLevel()] = tagId;
                    }
                    delete tags[depth];
                }
            }

            length = resetTags.length;
            if (length) {
                for (var level in resetTags) {
                    if (!resetTags.hasOwnProperty(level)) {
                        continue;
                    }
                    tags[level] = resetTags[level];
                }
            }
        }
    }
    _this.isSwap = false;
};

/**
 * reset
 */
MovieClip.prototype.reset = function ()
{
    var stage     = this.getStage();
    var instances = this.getInstances();
    for (var id in instances) {
        if (!instances.hasOwnProperty(id)) {
            continue;
        }

        var instance = stage.getInstance(id);
        if (instance.getClassName() === "MovieClip" && instance.getDepth() >= 0) {
            instance.removeMovieClip();
            if (instance.getDepth() < 0) {
                instance.removeFlag = false;
            }
        } else {
            instance.reset();
        }
    }

    var parent = this.getParent();
    if (parent && this.getLevel() !== this.getDepth()+16384) {
        parent.isSwap = true;
    }

    this.play();
    this.setCurrentFrame(1);
    this.clear();
    this.initParams();
    this.variables = {};
};

/**
 * init
 */
MovieClip.prototype.initParams = function ()
{
    this.active          = false;
    this.removeFlag      = false;
    this.isLoad          = false;
    this.isMask          = false;
    this.isAction        = true;
    this.soundStopFlag   = false;
    this._droptarget     = null;
    this._depth          = null;
    this._mask           = null;
    this._matrix         = null;
    this._colorTransform = null;
    this._filters        = null;
    this._blendMode      = null;
    this.buttonStatus    = "up";
    this.mouseEnabled    = true;
    this.setVisible(true);
    this.setEnabled(true);
};

/**
 * @param stage
 */
MovieClip.prototype.addTouchEvent = function (stage)
{
    var events = this.events;

    var moveEventHits    = stage.moveEventHits;
    var downEventHits    = stage.downEventHits;
    var upEventHits      = stage.upEventHits;
    var keyDownEventHits = stage.keyDownEventHits;
    for (var name in events) {
        if (!events.hasOwnProperty(name)) {
            continue;
        }
        var as = events[name];
        switch (name) {
            case "mouseDown":
                downEventHits[downEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "mouseMove":
                moveEventHits[moveEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "mouseUp":
                upEventHits[upEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
            case "keyDown":
                if (this.$isTouch) {
                    downEventHits[downEventHits.length] = {
                        as: as,
                        mc: this
                    };
                } else {
                    keyDownEventHits[keyDownEventHits.length] = {
                        as: as,
                        mc: this
                    };
                }
                break;
            case "keyUp":
                upEventHits[upEventHits.length] = {
                    as: as,
                    mc: this
                };
                break;
        }
    }

    var variables = this.variables;

    var onMouseDown = variables.onMouseDown;
    if (onMouseDown) {
        downEventHits[downEventHits.length] = {mc: this};
    }
    var onMouseMove = variables.onMouseMove;
    if (onMouseMove) {
        moveEventHits[moveEventHits.length] = {mc: this};
    }
    var onMouseUp = variables.onMouseUp;
    if (onMouseUp) {
        upEventHits[upEventHits.length] = {mc: this};
    }
};

/**
 * @param script
 * @returns {*}
 */
MovieClip.prototype.createActionScript = function (script)
{
    return (function (clip, origin)
    {
        var as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
        as.cache = origin.cache;
        as.scope = clip;
        return function ()
        {
            as.reset();
            as.variables["this"] = this;
            return as.execute(clip);
        };
    })(this, script);
};

/**
 * @param script
 * @param parent
 */
MovieClip.prototype.createActionScript2 = function (script, parent)
{
    return (function (clip, origin, chain)
    {
        return function ()
        {
            var as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
            as.parentId = origin.id; // todo
            as.cache    = origin.cache;
            as.scope    = clip;
            as.parent   = (chain) ? chain : null;
            if (as.register.length) {
                as.initVariable(arguments);
            }
            as.variables["this"] = this;
            return as.execute(clip);
        };
    })(this, script, parent);
};

/**
 * addFrameScript
 */
MovieClip.prototype.addFrameScript = function ()
{
    var args   = arguments;
    var length = args.length;
    var i = 0;
    while (i < length) {
        var frame = args[i];
        i = (i + 1)|0;

        var script = args[i];
        i = (i + 1)|0;

        if (typeof frame === "string") {
            frame = this.getLabel(frame)|0;
        } else {
            frame = (frame + 1)|0;
        }

        frame = frame|0;
        if (frame > 0 && this.getTotalFrames() >= frame) {
            var actions = this.actions;
            if (!(frame in actions)) {
                actions[frame] = [];
            }

            if (!script) {
                actions[frame] = [];
            } else {
                var aLen = actions[frame].length|0;
                actions[frame][aLen] = script;
            }
        }
    }
};

/**
 * @param stage
 */
MovieClip.prototype.addActions = function (stage)
{
    this.active = true;
    var myStage = this.getStage();

    if (this.isAction) {
        this.isAction = false;
        if (!this.isLoad) {

            // as3
            this.buildAVM2();

            // registerClass
            var RegClass = myStage.registerClass[this.getCharacterId()];
            if (typeof RegClass === "function") {
                this.variables.registerClass = new RegClass();
            }

            // clipEvent
            var clipEvent = this.$clipEvent;

            // initialize
            clipEvent.type = "initialize";
            this.dispatchEvent(clipEvent, stage);

            // construct
            clipEvent.type = "construct";
            this.dispatchEvent(clipEvent, stage);

            // load
            clipEvent.type = "load";
            this.dispatchEvent(clipEvent, stage);

            var onLoad = this.variables.onLoad;
            if (typeof onLoad === "function") {
                this.setActionQueue(onLoad, stage);
            }

            this.addTouchEvent(stage);
        }

        var action = this.getActions(this.getCurrentFrame());
        if (action) {
            this.setActionQueue(action, stage);
        }
    }

    var tags   = this.getTags();
    var length = tags.length;
    if (length) {
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var instance   = myStage.getInstance(instanceId);
            if (!instance) {
                continue;
            }

            instance.addActions(stage);
        }
    }
};

/**
 * @param frame
 * @returns {*}
 */
MovieClip.prototype.getActions = function (frame)
{
    return this.actions[frame];

};

/**
 * @param frame
 * @param actionScript
 */
MovieClip.prototype.setActions = function (frame, actionScript)
{
    var actions = this.actions;
    if (!(frame in actions)) {
        actions[frame] = [];
    }

    var length = actions[frame].length;
    actions[frame][length] = this.createActionScript(actionScript);
};

/**
 * @param frame
 * @param action
 */
MovieClip.prototype.overWriteAction = function (frame, action)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (frame > 0 && this.getTotalFrames() >= frame) {
        this.actions[frame] = [action];
    }
};

/**
 * @param frame
 * @param action
 */
MovieClip.prototype.addAction = function (frame, action)
{
    if (typeof frame === "string") {
        var label = this.getLabel(frame);
        if (label) {
            frame = label;
        }
    }

    frame |= 0;
    if (frame > 0 && this.getTotalFrames() >= frame) {
        var actions = this.actions;
        if (!(frame in actions)) {
            actions[frame] = [];
        }

        var length = actions[frame].length;
        actions[frame][length] = action;
    }
};

/**
 * @param frame
 */
MovieClip.prototype.executeActions = function (frame)
{
    var actions = this.getActions(frame);
    if (actions) {
        var length = actions.length|0;

        var i = 0;
        while (i < length) {
            var action = actions[i];
            i = (i + 1)|0;

            action.apply(this);
        }
    }
};

/**
 * ASSetPropFlags
 */
MovieClip.prototype.ASSetPropFlags = function ()
{
    // object, properties, n, allowFalse
};

/**
 * @param rgb
 * @param alpha
 */
MovieClip.prototype.beginFill = function (rgb, alpha)
{
    this.getGraphics().beginFill(rgb, alpha);
};

/**
 * @param width
 * @param rgb
 * @param alpha
 * @param pixelHinting
 * @param noScale
 * @param capsStyle
 * @param jointStyle
 * @param miterLimit
 */
MovieClip.prototype.lineStyle = function (width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
{
    this.getGraphics().lineStyle(width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit);
};

/**
 * @param dx
 * @param dy
 */
MovieClip.prototype.moveTo = function (dx, dy)
{
    this.getGraphics().moveTo(dx, dy);
};

/**
 * @param dx
 * @param dy
 */
MovieClip.prototype.lineTo = function (dx, dy)
{
    this.getGraphics().lineTo(dx, dy);
};

/**
 * @param cx
 * @param cy
 * @param dx
 * @param dy
 */
MovieClip.prototype.curveTo = function (cx, cy, dx, dy)
{
    this.getGraphics().curveTo(cx, cy, dx, dy);
};

/**
 * clear
 */
MovieClip.prototype.clear = function ()
{
    this.getGraphics().clear();
};

/**
 * endFill
 */
MovieClip.prototype.endFill = function ()
{
    this.getGraphics().endFill();
};

/**
 * buildAVM2
 */
MovieClip.prototype.buildAVM2 = function ()
{
    return;
    var _this = this;
    var stage = _this.getStage();
    var symbol = stage.symbols[_this.getCharacterId()];
    if (symbol) {
        var symbols = symbol.split(".");
        var classMethod = symbols.pop();
        var length = symbols.length;
        var classObj = stage.avm2;
        var abcObj = stage.abc;
        for (var i = 0; i < length; i++) {
            classObj = classObj[symbols[i]];
            abcObj = abcObj[symbols[i]];
        }

        // build abc
        var DoABC = abcObj[classMethod];
        var ABCObj = new DoABC(_this);
        // classObj[classMethod] = ABCObj;
        _this.avm2 = ABCObj;
        // AVM2 init
        var AVM2 = ABCObj[classMethod];
        if (typeof AVM2 === "function") {
            _this.actions = [];
            AVM2.apply(_this, []);
        }
    }
};
/**
 * @constructor
 */
var Shape = function ()
{
    DisplayObject.call(this);

    this.data      = null;
    this._graphics = new Graphics();

    var no = this.$Number.MAX_VALUE;
    this.setBounds({xMin: no, xMax: -no, yMin: no, yMax: -no});
};

/**
 * extends
 * @type {DisplayObject}
 */
Shape.prototype = Object.create(DisplayObject.prototype);
Shape.prototype.constructor = Shape;

/**
 * properties
 */
Object.defineProperties(Shape.prototype, {
    graphics: {
        get: function () {
            return this.getGraphics();
        },
        set: function () {
        }
    }
});

/**
 * dummy
 */
Shape.prototype.addActions  = function () {};
Shape.prototype.initFrame   = function () {};
Shape.prototype.setHitRange = function () {};

/**
 * @returns {string}
 */
Shape.prototype.getClassName = function ()
{
    return "Shape";
};

/**
 * @param stage
 * @param clipEvent
 */
Shape.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    this.dispatchEvent(clipEvent, stage);
};

/**
 * @returns {Graphics}
 */
Shape.prototype.getGraphics = function ()
{
    return this._graphics;
};

/**
 * @returns []
 */
Shape.prototype.getData = function ()
{
    return this.data;
};

/**
 * @param data
 */
Shape.prototype.setData = function (data)
{
    this.data = data;
};

/**
 * @returns {{}}
 */
Shape.prototype.getBounds = function (matrix)
{
    var bounds, gBounds;

    var graphics = this.graphics;
    var isDraw   = graphics.isDraw;

    if (matrix) {
        bounds = this.boundsMatrix(this.bounds, matrix);
        if (isDraw) {
            gBounds = this.boundsMatrix(graphics.getBounds(), matrix);
            bounds.xMin = +this.$min(gBounds.xMin, bounds.xMin);
            bounds.xMax = +this.$max(gBounds.xMax, bounds.xMax);
            bounds.yMin = +this.$min(gBounds.yMin, bounds.yMin);
            bounds.yMax = +this.$max(gBounds.yMax, bounds.yMax);
        }

        for (var name in bounds) {
            if (!bounds.hasOwnProperty(name)) {
                continue;
            }

            var value    = +bounds[name];
            bounds[name] = +(value / 20);
        }

    } else {
        bounds = this.bounds;
        if (isDraw) {
            gBounds = graphics.getBounds();
            bounds.xMin = +this.$min(gBounds.xMin, bounds.xMin);
            bounds.xMax = +this.$max(gBounds.xMax, bounds.xMax);
            bounds.yMin = +this.$min(gBounds.yMin, bounds.yMin);
            bounds.yMax = +this.$max(gBounds.yMax, bounds.yMax);
        }
    }

    return bounds;
};

/**
 * @param bounds
 */
Shape.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * @returns {boolean}
 */
Shape.prototype.isMorphing = function ()
{
    var tagType = this.getTagType();
    return (tagType === 46 || tagType === 84);
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 * @returns {*}
 */
Shape.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    stage.doneTags.unshift(this);

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible);
    var alpha           = +(rColorTransform[3] + (rColorTransform[7] / 255));
    var stageClip       = stage.clipMc || stage.isClipDepth;
    if (!stageClip && (!alpha || !isVisible)) {
        return "";
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj      = this.preRender(ctx, m2, rColorTransform, stage, isVisible);
    var cacheKey = obj.cacheKey;
    var cache    = null;

    // render
    var m3 = this.$multiplicationMatrix(stage.getMatrix(), obj.preMatrix);
    var isClipDepth = this.isClipDepth || stageClip;
    if (isClipDepth) {
        if (m3[0] === 0) {
            m3[0] = 0.00000000000001;
        }
        if (m3[3] === 0) {
            m3[3] = 0.00000000000001;
        }

        ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
        this.executeRender(ctx, +this.$min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
    } else {
        var xScale = +(this.$sqrt(m3[0] * m3[0] + m3[1] * m3[1]));
        var yScale = +(this.$sqrt(m3[2] * m3[2] + m3[3] * m3[3]));
        xScale = +(this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P)));
        yScale = +(this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P)));

        var bounds = this.getBounds();
        var xMax   = +bounds.xMax;
        var xMin   = +bounds.xMin;
        var yMax   = +bounds.yMax;
        var yMin   = +bounds.yMin;

        var W = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
        var H = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;
        if (W <= 0 || H <= 0) {
            return cacheKey;
        }

        var canvas;
        var loadStage = this.getStage();
        var cacheId   = this.getCharacterId() + "_" + loadStage.getId();
        if (this.isMorphing()) {
            cacheId = cacheId + "_" + this.getRatio();
        }

        cacheKey = this.$cacheStore.generateKey(cacheId, [xScale, yScale], rColorTransform);
        cache    = this.$cacheStore.getCache(cacheKey);
        if (!cache &&
            stage.getWidth() > W &&
            stage.getHeight() > H &&
            this.$cacheStore.size > (W * H)
        ) {
            canvas        = this.$cacheStore.getCanvas();
            canvas.width  = W;
            canvas.height = H;
            cache         = canvas.getContext("2d");

            var cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
            cache.setTransform(cMatrix[0],cMatrix[1],cMatrix[2],cMatrix[3],cMatrix[4],cMatrix[5]);
            cache = this.executeRender(
                cache, +this.$min(xScale, yScale), rColorTransform, isClipDepth, stage
            );

            this.$cacheStore.setCache(cacheKey, cache);
        }

        var preCtx = obj.preCtx;
        if (cache) {
            canvas = cache.canvas;

            var sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin, yMin];
            var m4      = this.$multiplicationMatrix(m3, sMatrix);
            preCtx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

            if (this.$isAndroid4x && !this.$isChrome) {
                preCtx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
                preCtx.fillRect(0, 0, W, H);
            } else {
                preCtx.drawImage(canvas, 0, 0, W, H);
            }
        } else {
            preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
            this.executeRender(preCtx, +this.$min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
        }
    }

    // post render
    cacheKey += "_" + m3[4] + "_" + m3[5];
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, matrix, rColorTransform, stage, obj);
    }

    return cacheKey;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
Shape.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    var graphics = this.graphics;
    if (graphics.isDraw) {
        return graphics.renderHitTest(ctx, m2, stage, x, y);
    }

    if (!this.getData()) {
        return false;
    }

    var m3 = this.$multiplicationMatrix(stage.getMatrix(), m2);
    ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var minScale = this.$min(m3[0], m3[3]);
    var shapes   = this.getData();
    var length   = 0 | shapes.length;
    var hit      = false;

    var idx = 0;
    while (idx < length) {
        var data     = shapes[idx];
        var obj      = data.obj;
        var isStroke = (obj.Width !== undefined);

        ctx.beginPath();
        var cmd = data.cmd;
        cmd(ctx);

        if (isStroke) {
            ctx.lineWidth = this.$max(obj.Width, 1 / minScale);
            ctx.lineCap   = "round";
            ctx.lineJoin  = "round";
        }

        hit = ctx.isPointInPath(x, y);
        if (hit) {
            return hit;
        }

        if ("isPointInStroke" in ctx) {
            hit = ctx.isPointInStroke(x, y);
            if (hit) {
                return hit;
            }
        }

        idx = (idx + 1)|0;
    }

    return hit;
};

/**
 * @param ctx
 * @param minScale
 * @param colorTransform
 * @param isClipDepth
 * @param stage
 * @returns {*}
 */
Shape.prototype.executeRender = function (ctx, minScale, colorTransform, isClipDepth, stage)
{
    var shapes = this.getData();
    if (!shapes) {
        return ctx;
    }

    var color, css, canvas;
    var stageClip = stage.clipMc || stage.isClipDepth;
    var idx       = 0;
    var length    = shapes.length|0;
    while (idx < length) {
        var data = shapes[idx];
        idx = (idx + 1)|0;

        var obj      = data.obj;
        var styleObj = (!obj.HasFillFlag) ? obj : obj.FillType;
        var cmd      = data.cmd;
        var isStroke = (obj.Width !== undefined);

        if (isClipDepth) {
            if (isStroke) {
                continue;
            }

            cmd(ctx);
            continue;
        }

        ctx.beginPath();
        cmd(ctx);

        var styleType = styleObj.fillStyleType|0;
        switch (styleType) {
            case 0x00:
                color = styleObj.Color;
                color = this.$generateColorTransform(color, colorTransform);
                css = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
                if (isStroke) {
                    ctx.strokeStyle = css;
                    ctx.lineWidth   = +this.$max(obj.Width, 1 / minScale);
                    ctx.lineCap     = "round";
                    ctx.lineJoin    = "round";
                    ctx.stroke();
                } else {
                    ctx.fillStyle = css;
                    ctx.fill();
                }

                break;

            // gradient
            case 0x10:
            case 0x12:
            case 0x13:
                var m    = styleObj.gradientMatrix;
                var type = styleObj.fillStyleType|0;
                if (type !== 16) {
                    ctx.save();
                    ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                    css = ctx.createRadialGradient(0, 0, 0, 0, 0, 16384);
                } else {
                    var xy = this.linearGradientXY(m);
                    css = ctx.createLinearGradient(xy[0], xy[1], xy[2], xy[3]);
                }

                var records = styleObj.gradient.GradientRecords;
                var rLength = records.length|0;
                var rIdx    = 0;
                while (rIdx < rLength) {
                    var record = records[rIdx];
                    color      = record.Color;
                    color      = this.$generateColorTransform(color, colorTransform);
                    var rgba   = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
                    css.addColorStop(record.Ratio, rgba);

                    rIdx = (rIdx + 1)|0;
                }

                if (isStroke) {
                    ctx.strokeStyle = css;
                    ctx.lineWidth   = this.$max(obj.Width, 1 / minScale);
                    ctx.lineCap     = "round";
                    ctx.lineJoin    = "round";
                    ctx.stroke();
                } else {
                    ctx.fillStyle = css;
                    ctx.fill();
                }

                if (type !== 16) {
                    ctx.restore();
                }

                break;

            // bitmap
            case 0x40:
            case 0x41:
            case 0x42:
            case 0x43:
                var width;
                var height;
                var loadStage      = this.getStage();
                var bitmapId       = styleObj.bitmapId|0;
                var bMatrix        = styleObj.bitmapMatrix;
                var repeat         = (styleType === 0x40 || styleType === 0x42) ? "repeat" : "no-repeat";
                var bitmapCacheKey = this.$cacheStore.generateKey(
                    bitmapId + "_" + loadStage.getId() + "_" + repeat,
                    undefined,
                    colorTransform
                );

                var image = this.$cacheStore.getCache(bitmapCacheKey);
                if (image === undefined) {
                    image = loadStage.getCharacter(bitmapId);
                    if (!image) {
                        break;
                    }

                    if (colorTransform[0] !== 1 ||
                        colorTransform[1] !== 1 ||
                        colorTransform[2] !== 1 ||
                        colorTransform[4] ||
                        colorTransform[5] ||
                        colorTransform[6]
                    ) {
                        var imgCanvas = image.canvas;
                        width         = imgCanvas.width|0;
                        height        = imgCanvas.height|0;
                        if (width > 0 && height > 0) {
                            canvas           = this.$cacheStore.getCanvas();
                            canvas.width     = width;
                            canvas.height    = height;

                            var imageContext = canvas.getContext("2d");
                            imageContext.drawImage(image.canvas, 0, 0, width, height, 0, 0, width, height);

                            image = this.generateImageTransform(imageContext, colorTransform);

                            this.$cacheStore.setCache(bitmapCacheKey, image);
                        }
                    } else {
                        ctx.globalAlpha = +(this.$max(0, this.$min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255);
                    }
                }

                if (image) {
                    ctx.save();
                    canvas = image.canvas;
                    width  = canvas.width|0;
                    height = canvas.height|0;
                    if (width > 0 && height > 0) {
                        if (styleType === 0x41 || styleType === 0x43) {
                            ctx.clip();
                            ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
                            ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
                        } else {
                            ctx.fillStyle = stage.context.createPattern(canvas, repeat);
                            ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
                            ctx.fill();
                        }
                    }
                    ctx.restore();
                }

                break;
        }
    }

    if (isClipDepth && !stageClip) {
        ctx.clip();

        if (this.$isAndroid && this.$isChrome) {
            if (!canvas) {
                canvas = ctx.canvas;
            }

            var cWidth  = canvas.width|0;
            var cHeight = canvas.height|0;

            var tmpContext   = this.$tmpContext;
            var tmpCanvas    = tmpContext.canvas;
            canvas           = ctx.canvas;
            tmpCanvas.width  = cWidth;
            tmpCanvas.height = cHeight;
            tmpContext.drawImage(canvas, 0, 0, cWidth, cHeight, 0, 0, cWidth, cHeight);

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.beginPath();
            ctx.clearRect(0, 0, cWidth + 1, cHeight + 1);
            ctx.drawImage(tmpCanvas, 0, 0, cWidth, cHeight, 0, 0, cWidth, cHeight);
            ctx.restore();

            tmpContext.setTransform(1,0,0,1,0,0);
            tmpContext.clearRect(0, 0, cWidth + 1, cHeight + 1);
        }
    }

    var resetCss    = "rgba(0,0,0,1)";
    ctx.strokeStyle = resetCss;
    ctx.fillStyle   = resetCss;
    ctx.globalAlpha = 1;

    return ctx;
};

/**
 * @param ctx
 * @param color
 * @returns {*}
 */
Shape.prototype.generateImageTransform = function (ctx, color)
{
    var canvas  = ctx.canvas;
    var width   = canvas.width|0;
    var height  = canvas.height|0;
    var imgData = ctx.getImageData(0, 0, width, height);
    var pxData  = imgData.data;

    var RedMultiTerm   = +color[0];
    var GreenMultiTerm = +color[1];
    var BlueMultiTerm  = +color[2];
    var AlphaMultiTerm = +color[3];
    var RedAddTerm     = +color[4];
    var GreenAddTerm   = +color[5];
    var BlueAddTerm    = +color[6];
    var AlphaAddTerm   = +color[7];

    var length = (width * height)|0;
    if (length > 0) {
        var i   = 0;
        var idx = 0;
        while (i < length) {
            var R = pxData[idx]|0;
            idx = (idx + 1)|0;

            var G = pxData[idx]|0;
            idx = (idx + 1)|0;

            var B = pxData[idx]|0;
            idx = (idx + 1)|0;

            var A = pxData[idx]|0;
            idx = (idx + 1)|0;

            pxData[idx - 4] =  this.$max(0, this.$min((R * RedMultiTerm)   + RedAddTerm,   255))|0;
            pxData[idx - 3] =  this.$max(0, this.$min((G * GreenMultiTerm) + GreenAddTerm, 255))|0;
            pxData[idx - 2] =  this.$max(0, this.$min((B * BlueMultiTerm)  + BlueAddTerm,  255))|0;
            pxData[idx - 1] = +this.$max(0, this.$min((A * AlphaMultiTerm) + AlphaAddTerm, 255));

            i = (i + 1)|0;
        }
    }

    ctx.putImageData(imgData, 0, 0);

    return ctx;
};

/**
 * @param m
 * @returns {*[]}
 */
Shape.prototype.linearGradientXY = function (m)
{
    var x0  = +(-16384 * m[0] - 16384 * m[2] + m[4]);
    var x1  = +( 16384 * m[0] - 16384 * m[2] + m[4]);
    var x2  = +(-16384 * m[0] + 16384 * m[2] + m[4]);
    var y0  = +(-16384 * m[1] - 16384 * m[3] + m[5]);
    var y1  = +( 16384 * m[1] - 16384 * m[3] + m[5]);
    var y2  = +(-16384 * m[1] + 16384 * m[3] + m[5]);
    var vx2 = +(x2 - x0);
    var vy2 = +(y2 - y0);
    var r1  = +this.$sqrt(vx2 * vx2 + vy2 * vy2);

    switch (true) {
        case (r1):
            vx2 = +(vx2 / r1);
            vy2 = +(vy2 / r1);
            break;
        default:
            vx2 = 0;
            vy2 = 0;
            break;
    }

    var r2  = +((x1 - x0) * vx2 + (y1 - y0) * vy2);
    return [
        +(x0 + r2 * vx2),
        +(y0 + r2 * vy2),
        x1,
        y1
    ];
};
/**
 * @constructor
 */
var SimpleButton = function ()
{
    InteractiveObject.call(this);
    this._downState = new Sprite();
    this._hitState  = new Sprite();
    this._overState = new Sprite();
    this._upState   = new Sprite();
    this.actions    = [];
};

/**
 * extends
 * @type {InteractiveObject}
 */
SimpleButton.prototype = Object.create(InteractiveObject.prototype);
SimpleButton.prototype.constructor = SimpleButton;

/**
 * properties
 */
Object.defineProperties(SimpleButton.prototype, {
    downState: {
        get: function () {
            return this.getSprite("down");
        },
        set: function (sprite) {
            this.setSprite("down", sprite);
        }
    },
    hitState: {
        get: function () {
            return this.getSprite("hit");
        },
        set: function (sprite) {
            this.setSprite("hit", sprite);
        }
    },
    overState: {
        get: function () {
            return this.getSprite("over");
        },
        set: function (sprite) {
            this.setSprite("over", sprite);
        }
    },
    upState: {
        get: function () {
            return this.getSprite("up");
        },
        set: function (sprite) {
            this.setSprite("up", sprite);
        }
    }
});

/**
 * @returns {string}
 */
SimpleButton.prototype.getClassName = function ()
{
    return "SimpleButton";
};

/**
 *
 * @returns {Array|ActionScript|*|actions}
 */
SimpleButton.prototype.getActions = function ()
{
    return this.actions;
};

/**
 * @param actions
 */
SimpleButton.prototype.setActions = function (actions)
{
    this.actions = actions;
};

/**
 * @param status
 */
SimpleButton.prototype.setButtonStatus = function (status)
{
    if (this.getButtonStatus() !== status) {
        this.buttonReset(status);
    }
    this.buttonStatus = status;
};

/**
 * @param status
 * @returns {*}
 */
SimpleButton.prototype.getSprite = function (status)
{
    if (!status) {
        status = this.buttonStatus;
    }

    status += "State";
    return this["_" + status];
};

/**
 * @param status
 * @param sprite
 */
SimpleButton.prototype.setSprite = function (status, sprite)
{
    var stage = this.getStage();

    var level = 0;
    switch (status) {
        case "down":
            level = 1;
            break;
        case "hit":
            level = 2;
            break;
        case "over":
            level = 3;
            break;
        case "up":
            level = 4;
            break;
    }

    stage.setPlaceObject(new PlaceObject(), this.instanceId, level, 0);
    sprite.setParent(this);
    sprite.setLevel(level);
    sprite.setStage(stage);

    var container = sprite.getContainer();
    for (var depth in container) {
        if (!container.hasOwnProperty(depth)) {
            continue;
        }

        var instanceId = container[depth];
        var obj        = stage.getInstance(instanceId);
        obj.setParentSprite(sprite);
    }

    status += "State";
    this["_" + status] = sprite;
};

/**
 * @param matrix
 * @param status
 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
 */
SimpleButton.prototype.getBounds = function (matrix, status)
{
    var xMax = 0;
    var yMax = 0;
    var xMin = 0;
    var yMin = 0;

    var sprite = this.getSprite(status);
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (length) {
        var stage = this.getStage();

        var no = this.$Number.MAX_VALUE;
        xMax   = -no;
        yMax   = -no;
        xMin   = no;
        yMin   = no;

        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag        = stage.getInstance(instanceId);
            if (!tag || tag.isClipDepth) {
                continue;
            }

            var matrix2 = (matrix) ? this.$multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
            var bounds  = tag.getBounds(matrix2, status);
            if (!bounds) {
                continue;
            }
            xMin = +this.$min(xMin, bounds.xMin);
            xMax = +this.$max(xMax, bounds.xMax);
            yMin = +this.$min(yMin, bounds.yMin);
            yMax = +this.$max(yMax, bounds.yMax);
        }
    }
    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};

/**
 * @param status
 */
SimpleButton.prototype.buttonReset = function (status)
{
    var sprite    = this.getSprite();
    var container = sprite.getContainer();

    var nextSprite    = this.getSprite(status);
    var nextContainer = nextSprite.getContainer();

    var stage = this.getStage();
    for (var depth in container) {
        if (!container.hasOwnProperty(depth)) {
            continue;
        }

        var instanceId = container[depth]|0;
        if (depth in nextContainer && instanceId === nextContainer[depth]) {
            continue;
        }

        var instance = stage.getInstance(instanceId);
        if (!instance) {
            continue;
        }

        instance.reset();
    }
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
SimpleButton.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var isVisible = this.$min(this.getVisible(), visible)|0;
    if (!this.clipDepth && this.getEnabled() && isVisible === 1) {
        var buttonHits = stage.buttonHits;

        // enter
        if (this.$isTouch) {
            var actions = this.getActions();

            var aLen = actions.length|0;
            if (aLen) {
                var idx = 0;
                while (idx < aLen) {
                    var cond = actions[idx];
                    if (cond.CondKeyPress === 13) {
                        buttonHits[buttonHits.length] = {
                            button:       this,
                            xMin:         0,
                            xMax:         stage.getWidth()|0,
                            yMin:         0,
                            yMax:         stage.getHeight()|0,
                            CondKeyPress: cond.CondKeyPress|0,
                            parent:       this.getParent()
                        };
                    }

                    idx = (idx + 1)|0;
                }
            }
        }

        var status  = "hit";
        var hitTest = this.getSprite(status);
        var hitTags = hitTest.getContainer();
        var length  = hitTags.length|0;
        if (length === 0) {
            status = "up";
            hitTest = this.getSprite(status);
            hitTags = hitTest.getContainer();
        }

        length = hitTags.length|0;
        if (length) {
            var m2     = this.$multiplicationMatrix(matrix, this.getMatrix());
            var bounds = this.getBounds(m2, status);
            if (bounds) {
                buttonHits[buttonHits.length] = {
                    button:       this,
                    xMin:         +bounds.xMin,
                    xMax:         +bounds.xMax,
                    yMin:         +bounds.yMin,
                    yMax:         +bounds.yMax,
                    CondKeyPress: 0,
                    parent:       this.getParent(),
                    matrix:       this.cloneArray(matrix)
                };
            }
        }
    }
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
SimpleButton.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    // return "";

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var isVisible = this.$min(this.getVisible(), visible);
    var obj       = this.preRender(ctx, m2, rColorTransform, stage, isVisible);

    // render
    var sprite  = this.getSprite();
    var rMatrix = this.$multiplicationMatrix(obj.preMatrix, sprite.getMatrix());
    var rColorTransform2 = this.$multiplicationColor(rColorTransform, sprite.getColorTransform());
    isVisible = this.$min(sprite.getVisible(), visible);

    var cacheKey = obj.cacheKey;
    cacheKey    += sprite.render(obj.preCtx, rMatrix, rColorTransform2, stage, isVisible);

    // post render
    if (obj.isFilter || obj.isBlend) {
        obj.cacheKey = cacheKey;
        this.postRender(ctx, matrix, colorTransform, stage, obj);
    }

    return cacheKey;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
SimpleButton.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var sprite = this.getSprite("hit");
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (!length) {
        return false;
    }

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(m2, sprite.getMatrix());

    if (length) {
        var loadStage = this.getStage();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth]|0;
            var tag        = loadStage.getInstance(instanceId);
            if (!tag) {
                continue;
            }

            var hit = tag.renderHitTest(ctx, m3, stage, x, y);
            if (hit) {
                return hit;
            }
        }
    }

    return false;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {*}
 */
SimpleButton.prototype.hitCheck = function (ctx, matrix, stage, x, y)
{
    var sprite = this.getSprite("hit");
    var tags   = sprite.getContainer();
    var length = tags.length;
    if (!length) {
        return false;
    }

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(m2, sprite.getMatrix());

    var hitObj = false;
    var hit    = false;
    if (length) {
        var loadStage = this.getStage();
        tags.reverse();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var tagId    = tags[depth];
            var instance = loadStage.getInstance(tagId);
            switch (instance.getClassName()) {
                case "Shape":
                case "StaticText":
                case "TextField":
                    hit = instance.renderHitTest(ctx, m3, stage, x, y);
                    break;
                default:
                    hit = instance.hitCheck(ctx, m3, stage, x, y);
                    break;
            }

            if (hit) {
                hitObj = hit;
                if (typeof hit !== "object") {
                    var events = this.events;
                    if (events.press !== undefined ||
                        events.release !== undefined ||
                        events.releaseOutside !== undefined ||
                        events.rollOver !== undefined ||
                        events.rollOut !== undefined ||
                        events.dragOver !== undefined ||
                        events.dragOut !== undefined
                    ) {
                        stage.isHit = hit;
                        hitObj = {
                            parent : this.getParent(),
                            button : this
                        };
                    }
                }

                tags.reverse();

                return hitObj;
            }
        }
        tags.reverse();
    }

    return false;
};

/**
 * @see MovieClip.addActions
 */
SimpleButton.prototype.addActions = function (stage)
{
    var sprite = this.getSprite();
    var tags   = sprite.getContainer();
    var length = tags.length|0;
    if (length) {
        var myStage = this.getStage();
        for (var depth in tags) {
            if (!tags.hasOwnProperty(depth)) {
                continue;
            }

            var instanceId = tags[depth];
            var tag = myStage.getInstance(instanceId);
            if (tag === undefined) {
                continue;
            }

            tag.addActions(stage);
        }
    }
};

/**
 * Dummy
 * @returns {undefined}
 */
SimpleButton.prototype.getTags   = function () { return undefined; };
SimpleButton.prototype.initFrame = function () {};
/**
 * @constructor
 */
var Stage = function ()
{
    this.id         = stageId++;
    this.name       = "swf2js_" + this.id;
    this.intervalId = 0;
    this.frameRate  = 0;
    this.fileSize   = 0;
    this.stopFlag   = true;

    // options
    this.optionWidth  = 0;
    this.optionHeight = 0;
    this.callback     = null;
    this.tagId        = null;
    this.FlashVars    = {};
    this.quality      = "medium"; // low = 0.25, medium = 0.8, high = 1.0
    this.bgcolor      = null;

    // event
    this.mouse = new Mouse();

    // params
    this.context          = null;
    this.canvas           = null;
    this.preContext       = null;
    this.hitContext       = null;
    this.matrix           = [1,0,0,1,0,0];
    this._matrix          = [1,0,0,1,0,0];
    this._colorTransform  = [1,1,1,1,0,0,0,0];
    this.characters       = [];
    this.initActions      = [];
    this.exportAssets     = [];
    this.packages         = [];
    this.registerClass    = [];
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.sounds           = [];
    this.loadSounds       = [];
    this.videos           = [];
    this.actions          = [];
    this.instances        = [];
    this.placeObjects     = [];
    this.fonts            = [];
    this.isAction         = true;
    this._global          = new Global();
    this.touchObj         = null;
    this.touchStatus      = "up";
    this.overObj          = null;
    this.touchEndAction   = null;
    this.imgUnLoadCount   = 0;
    this.scale            = 1;
    this.ratio            = 1;
    this.baseWidth        = 0;
    this.baseHeight       = 0;
    this.width            = 0;
    this.height           = 0;
    this.isHit            = false;
    this.isTouchEvent     = false;
    this.isLoad           = false;
    this.jpegTables       = null;
    this.backgroundColor  = "transparent";
    this.version          = 8;
    this.loadStatus       = 0;
    this.isClipDepth      = false;
    this.clipDepth        = 0;
    this.clipMc           = false;
    this.dragMc           = null;
    this.dragRules        = null;
    this.scaleMode        = "showAll";
    this.align            = "";
    this.avm2             = new Packages(this);
    this.abc              = new Packages(this);
    this.symbols          = [];
    this.abcFlag          = false;

    // render
    this.doneTags = [];
    this.newTags  = [];

    // init
    var mc = new MovieClip();
    mc.setStage(this);
    this.setParent(mc);
};

/**
 * util
 */
Stage.prototype = Object.create(Util.prototype);
Stage.prototype.constructor = Stage;

/**
 * @returns {number}
 */
Stage.prototype.getId = function ()
{
    return this.id;
};

/**
 * @param id
 */
Stage.prototype.setId = function (id)
{
    this.id = id;
};

/**
 * @returns {*}
 */
Stage.prototype.getParent = function ()
{
    return this.parent;
};

/**
 * @param parent
 */
Stage.prototype.setParent = function (parent)
{
    this.parent = parent;
};

/**
 * @returns {number|*}
 */
Stage.prototype.getVersion = function ()
{
    return this.version;
};

/**
 * @param version
 */
Stage.prototype.setVersion = function (version)
{
    this.version = version;
};

/**
 *
 * @returns {string}
 */
Stage.prototype.getBackgroundColor = function ()
{
    return this.backgroundColor;
};

/**
 * @param r
 * @param g
 * @param b
 */
Stage.prototype.setBackgroundColor = function (r, g, b)
{
    this.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
};

/**
 * @returns {Array}
 */
Stage.prototype.getGlobal = function ()
{
    return this._global;
};

/**
 * play
 */
Stage.prototype.play = function ()
{
    this.stopFlag = false;

    var enterFrame = function (stage) {
        var animation = stage.$requestAnimationFrame;
        return function () {
            animation(function () {
                if (stage.isLoad && !stage.stopFlag) {
                    stage.nextFrame();
                }
            }, 0);
        };
    };

    this.intervalId = this.$setInterval.call(
        null, enterFrame(this), this.getFrameRate()
    );
};

/**
 * stop
 */
Stage.prototype.stop = function ()
{
    this.stopFlag = true;
    this.$clearInterval.call(null, this.intervalId);
};

/**
 * @returns {*}
 */
Stage.prototype.getName = function ()
{
    return this.name;
};

/**
 * @param name
 */
Stage.prototype.setName = function (name)
{
    this.name = name;
};

/**
 * @param options
 */
Stage.prototype.setOptions = function (options)
{
    if (typeof options === "object") {
        this.optionWidth  = options.width      || this.optionWidth;
        this.optionHeight = options.height     || this.optionHeight;
        this.callback     = options.callback   || this.callback;
        this.tagId        = options.tagId      || this.tagId;
        this.FlashVars    = options.FlashVars  || this.FlashVars;
        this.quality      = options.quality    || this.quality;
        this.bgcolor      = options.bgcolor    || this.bgcolor;
    }

    this.setRatio();
};

/**
 * view ratio
 */
Stage.prototype.setRatio = function ()
{
    // quality
    switch (this.quality) {
        case "medium":
            this.ratio = this.$devicePixelRatio * 0.8;
            break;
        case "high":
            this.ratio = this.$devicePixelRatio;
            break;
        case "low":
            this.ratio = this.$devicePixelRatio * 0.5;
            break;
    }
};

/**
 * @returns {number}
 */
Stage.prototype.getBaseWidth = function ()
{
    return this.baseWidth;
};

/**
 * @param baseWidth
 */
Stage.prototype.setBaseWidth = function (baseWidth)
{
    this.baseWidth = baseWidth;
};

/**
 *
 * @returns {number}
 */
Stage.prototype.getBaseHeight = function ()
{
    return this.baseHeight;
};

/**
 * @param baseHeight
 */
Stage.prototype.setBaseHeight = function (baseHeight)
{
    this.baseHeight = baseHeight;
};

/**
 *
 * @returns {number}
 */
Stage.prototype.getWidth = function ()
{
    return this.width;
};

/**
 * @param width
 */
Stage.prototype.setWidth = function (width)
{
    if (width < 0) {
        width *= -1;
    }
    this.width = width;
};

/**
 * @returns {number}
 */
Stage.prototype.getHeight = function ()
{
    return this.height;
};

/**
 * @param height
 */
Stage.prototype.setHeight = function (height)
{
    if (height < 0) {
        height *= -1;
    }
    this.height = height;
};

/**
 * @returns {number}
 */
Stage.prototype.getScale = function ()
{
    return this.scale;
};

/**
 * @param scale
 */
Stage.prototype.setScale = function (scale)
{
    this.scale = scale;
};

/**
 * @returns {*}
 */
Stage.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
Stage.prototype.setMatrix = function (matrix)
{
    this.matrix = matrix;
};

/**
 * @param id
 * @returns {*}
 */
Stage.prototype.getCharacter = function (id)
{
    return this.characters[id];
};

/**
 * @param id
 * @param obj
 */
Stage.prototype.setCharacter = function (id, obj)
{
    this.characters[id] = obj;
};

/**
 * @param id
 * @returns {*}
 */
Stage.prototype.getInstance = function (id)
{
    return this.instances[id|0];
};

/**
 * @param instance
 */
Stage.prototype.setInstance = function (instance)
{
    this.instances[instance.instanceId|0] = instance;
};

/**
 * @param instanceId
 * @param depth
 * @param frame
 * @returns {*}
 */
Stage.prototype.getPlaceObject = function (instanceId, depth, frame)
{
    var placeObjects = this.placeObjects;
    if (!(instanceId in placeObjects)) {
        return null;
    }

    var placeObject = placeObjects[instanceId];
    if (!(frame in placeObject)) {
        return null;
    }

    var tags = placeObject[frame];
    if (!(depth in tags)) {
        return null;
    }

    return tags[depth];
};

/**
 * @param placeObject
 * @param instanceId
 * @param depth
 * @param frame
 */
Stage.prototype.setPlaceObject = function (placeObject, instanceId, depth, frame)
{
    var placeObjects = this.placeObjects;
    if (!(instanceId in placeObjects)) {
        placeObjects[instanceId] = [];
    }

    if (!(frame in placeObjects[instanceId])) {
        placeObjects[instanceId][frame] = [];
    }

    placeObjects[instanceId][frame][depth] = placeObject;
};

/**
 * @param instanceId
 * @param depth
 * @param frame
 */
Stage.prototype.copyPlaceObject = function (instanceId, depth, frame)
{
    var placeObject = this.getPlaceObject(instanceId, depth, frame - 1);
    this.setPlaceObject(placeObject, instanceId, depth, frame);
};

/**
 * @param instanceId
 */
Stage.prototype.removePlaceObject = function (instanceId)
{
    delete this.placeObjects[instanceId];
};

/**
 * @returns {number}
 */
Stage.prototype.getFrameRate = function ()
{
    return this.frameRate;
};

/**
 * @param fps
 */
Stage.prototype.setFrameRate = function (fps)
{
    this.frameRate = (1000 / fps)|0;
};

/**
 * loadStatus CountUp
 */
Stage.prototype.loadEvent = function ()
{
    switch (this.loadStatus) {
        case 2:
            this.resize();
            this.loadStatus++;
            break;
        case 3:
            if (!this.isLoad || !this.stopFlag || this.imgUnLoadCount > 0) {
                break;
            }
            this.loadStatus++;
            this.loaded();
            break;
    }

    if (this.loadStatus !== 4) {
        var retry = (function (self)
        {
            return function()
            {
                self.loadEvent();
            };
        })(this);

        this.$setTimeout.call(null, retry, 0);
    }
};

/**
 * @param data
 * @param url
 */
Stage.prototype.parse = function (data, url)
{
    this.isLoad = false;
    var bitio   = new BitIO();
    var swftag  = new SwfTag(this, bitio);

    if (this.$canXHR2) {
        bitio.setData(new Uint8Array(data));
    } else {
        bitio.generate(data);
    }

    var mc  = this.getParent();
    mc._url = location.href;
    if (this.setSwfHeader(bitio, swftag)) {

        // parse
        var tags = swftag.parse(mc);

        // mc reset
        mc.container    = [];
        var frame       = 1;
        var totalFrames = mc.getTotalFrames() + 1;
        while (frame < totalFrames) {
            mc.container[frame] = [];
            frame = 0 | frame + 1;
        }
        mc.instances = [];

        // build
        swftag.build(tags, mc);

        var query = url.split("?")[1];
        if (query) {
            var values = query.split("&");
            var length = values.length;
            while (length) {
                length    = 0 | length - 1;
                var value = values[length];
                var pair  = value.split("=");
                if (pair.length > 1) {
                    mc.setVariable(pair[0], pair[1]);
                }
            }
        }

        // FlashVars
        var vars = this.FlashVars;
        for (var key in vars) {
            if (!vars.hasOwnProperty(key)) {
                continue;
            }
            mc.setVariable(key, vars[key]);
        }
    }

    this.isLoad = true;
};

/**
 * @param bitio
 * @param swftag
 * @returns {boolean}
 */
Stage.prototype.setSwfHeader = function (bitio, swftag)
{
    var data = bitio.data;

    // image
    switch (true) {
        case (data[0] === 0x89 && data[1] === 0x50 &&
              data[2] === 0x4E && data[3] === 0x47 &&
              data[4] === 0x0D && data[5] === 0x0A &&
              data[6] === 0x1A && data[7] === 0x0A): // PNG
        case (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46): // GIF
        case (data[0] === 0xff && data[1] === 0xd8): // JPEG
        case (data[0] === 0x42 && data[1] === 0x4d): // BMP
            this.parseImage();
            return false;
        default:
            break;
    }

    // signature
    var signature = bitio.getHeaderSignature();

    // version
    var version = bitio.getVersion();
    this.setVersion(version);

    // file size
    var fileSize  = bitio.getUI32();
    this.fileSize = fileSize;

    switch (signature) {
        case "FWS": // No ZIP
            break;
        case "CWS": // ZLIB
            bitio.deCompress(fileSize, "ZLIB");
            break;
        case "ZWS": // TODO LZMA
            bitio.deCompress(fileSize, "LZMA");
            break;
    }

    var bounds    = swftag.rect();
    var frameRate = bitio.getUI16() / 0x100;
    bitio.getUI16(); // frameCount

    this.setBaseWidth(this.$ceil((bounds.xMax - bounds.xMin) / 20));
    this.setBaseHeight(this.$ceil((bounds.yMax - bounds.yMin) / 20));
    this.setFrameRate(frameRate);

    this.loadStatus += 1;

    return true;
};

/**
 * parseJPEG
 */
Stage.prototype.parseImage = function ()
{
    var self  = this;
    var image = self.$document.createElement("img");
    image.addEventListener("load", function ()
    {
        var width  = this.width|0;
        var height = this.height|0;

        var canvas       = this.$cacheStore.getCanvas();
        canvas.width     = width;
        canvas.height    = height;

        var imageContext = canvas.getContext("2d");
        imageContext.drawImage(this, 0, 0, width, height);
        self.setCharacter(1, imageContext);

        var shapeWidth  = (width * 20)|0;
        var shapeHeight = (height * 20)|0;

        self.setBaseWidth(width);
        self.setBaseHeight(height);

        var shape = {
            ShapeRecords: [
                {
                    FillStyle1: 1,
                    StateFillStyle0: 0,
                    StateFillStyle1: 1,
                    StateLineStyle: 0,
                    StateMoveTo: 0,
                    StateNewStyles: 0,
                    isChange: true
                },
                {
                    AnchorX: shapeWidth,
                    AnchorY: 0,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: shapeWidth,
                    AnchorY: shapeHeight,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: 0,
                    AnchorY: shapeHeight,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                {
                    AnchorX: 0,
                    AnchorY: 0,
                    ControlX: 0,
                    ControlY: 0,
                    isChange: false,
                    isCurved: false
                },
                0
            ],
            fillStyles: {
                fillStyleCount: 1,
                fillStyles: [{
                    bitmapId: 1,
                    bitmapMatrix: [20, 0, 0, 20, 0, 0],
                    fillStyleType: 65
                }]
            },
            lineStyles: {
                lineStyleCount: 0,
                lineStyles: []
            }
        };

        var bounds = {
            xMin: 0,
            xMax: shapeWidth,
            yMin: 0,
            yMax: shapeHeight
        };
        var data = this.$vtc.convert(shape);

        self.setCharacter(2, {
            tagType: 22,
            data:    data,
            bounds:  bounds
        });

        var parent = self.getParent();
        var obj    = new Shape();
        obj.setParent(parent);
        obj.setStage(self);
        obj.setData(data);
        obj.setTagType(22);
        obj.setCharacterId(2);
        obj.setBounds(bounds);
        obj.setLevel(1);

        parent.container[1]    = [];
        parent.container[1][1] = obj.instanceId;

        var placeObject = new PlaceObject();
        self.setPlaceObject(placeObject, obj.instanceId, 1, 1);
        self.init();
    });

    image.src = this.getParent()._url;
};

/**
 * resize
 */
Stage.prototype.resize = function ()
{
    var div = this.$document.getElementById(this.getName());
    if (!div) {
        return 0;
    }

    var oWidth  = this.optionWidth;
    var oHeight = this.optionHeight;

    var element     = this.$document.documentElement;
    var innerWidth  = this.$max(element.clientWidth, window.innerWidth || 0);
    var innerHeight = this.$max(element.clientHeight, window.innerHeight || 0);

    var parent = div.parentNode;
    if (parent.tagName !== "BODY") {
        innerWidth  = parent.offsetWidth;
        innerHeight = parent.offsetHeight;
    }
    var screenWidth  = (oWidth > 0)  ? oWidth  : innerWidth;
    var screenHeight = (oHeight > 0) ? oHeight : innerHeight;

    var baseWidth  = this.getBaseWidth();
    var baseHeight = this.getBaseHeight();

    var scale  = +this.$min((screenWidth / baseWidth), (screenHeight / baseHeight));
    var width  = baseWidth  * scale;
    var height = baseHeight * scale;
    if (width !== this.getWidth() || height !== this.getHeight()) {
        // div
        var style    = div.style;
        style.width  = width  + "px";
        style.height = height + "px";
        style.top    = 0;
        style.left   = ((screenWidth / 2) - (width / 2)) + "px";

        width  = width  * this.$devicePixelRatio;
        height = height * this.$devicePixelRatio;

        this.setScale(scale);
        this.setWidth(width);
        this.setHeight(height);

        // main
        var canvas    = this.context.canvas;
        canvas.width  = width;
        canvas.height = height;

        // pre
        var preCanvas    = this.preContext.canvas;
        preCanvas.width  = width;
        preCanvas.height = height;

        // hit canvas
        var hitCanvas    = this.hitContext.canvas;
        hitCanvas.width  = width;
        hitCanvas.height = height;

        // tmp
        if (this.$isAndroid && this.$isChrome) {
            var tmpContext   = this.$tmpContext;
            var tmpCanvas    = tmpContext.canvas;
            tmpCanvas.width  = width;
            tmpCanvas.height = height;
        }

        var mc     = this.getParent();
        var mScale = scale * this.ratio / 20;
        this.setMatrix(mc.cloneArray([mScale, 0, 0, mScale, 0, 0]));
    }
};

/**
 * loaded
 */
Stage.prototype.loaded = function ()
{
    // reset
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.actions          = [];

    // DOM
    this.deleteNode();

    // add canvas
    var div = this.$document.getElementById(this.getName());
    if (div) {
        var mc = this.getParent();
        mc.initFrame();
        mc.addActions(this);
        this.executeAction();

        // callback
        var callback = this.callback;
        if (typeof callback === "function") {
            callback.call(window, mc);
        }

        // set backgroundColor
        if (this.bgcolor) {
            this.backgroundColor = this.bgcolor;
        }

        // renders
        this.render();
        this.renderMain();

        var ctx    = this.context;
        var canvas = ctx.canvas;

        // load sound
        if (this.$isTouch) {
            var loadSounds = this.loadSounds;
            var length     = 0 | loadSounds.length;
            if (length) {
                var loadSound = function ()
                {
                    canvas.removeEventListener(this.$startEvent, loadSound);
                    for (var idx in loadSounds) {
                        if (!loadSounds.hasOwnProperty(idx)) {
                            continue;
                        }

                        var audio = loadSounds[idx];
                        audio.load();
                    }
                };

                canvas.addEventListener(this.$startEvent, loadSound);
            }
        }

        var self = this;
        canvas.addEventListener(this.$startEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchStart(event);
        });

        canvas.addEventListener(this.$moveEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchMove(event);
        });

        canvas.addEventListener(this.$endEvent, function (event)
        {
            Util.prototype.$event = event;
            self.touchEnd(event);
        });

        div.appendChild(canvas);

        this.play();
    }
};

/**
 * deleteNode
 */
Stage.prototype.deleteNode = function (tagId)
{
    var div = this.$document.getElementById(tagId ? tagId : this.getName());
    if (div) {
        var childNodes = div.childNodes;
        var length     = childNodes.length;
        if (length) {
            for (var idx in childNodes) {
                if (!childNodes.hasOwnProperty(idx)) {
                    continue;
                }

                div.removeChild(childNodes[idx]);
            }
        }
    }
};

/**
 * nextFrame
 */
Stage.prototype.nextFrame = function ()
{
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];

    // mouse event
    var parent      = this.getParent();
    var mouse       = this.mouse;
    var mouseEvents = mouse.events;

    var onMouseDown = mouseEvents.onMouseDown;
    if (onMouseDown) {
        this.downEventHits[this.downEventHits.length] = {as: onMouseDown, mc: parent};
    }

    var onMouseMove = mouseEvents.onMouseMove;
    if (onMouseMove) {
        this.moveEventHits[this.moveEventHits.length] = {as: onMouseMove, mc: parent};
    }

    var onMouseUp = mouseEvents.onMouseUp;
    if (onMouseUp) {
        this.upEventHits[this.upEventHits.length] = {as: onMouseUp, mc: parent};
    }

    stats.begin();
    this.putFrame();
    this.addActions();
    this.executeAction();
    this.render();
    this.renderMain();
    stats.end();

};

/**
 * putFrame
 */
Stage.prototype.putFrame = function ()
{
    this.newTags = [];
    var doneTags = this.doneTags;
    var length   = doneTags.length|0;
    if (length) {
        var clipEvent  = this.$clipEvent;
        clipEvent.type = "enterFrame";

        var i = 0;
        while (i < length) {
            var tag = doneTags[i];
            i = (i + 1)|0;

            tag.putFrame(this, clipEvent);
        }
    }
};

/**
 * addActions
 */
Stage.prototype.addActions = function ()
{
    var newTags = this.newTags;
    var length  = newTags.length|0;
    if (length) {
        var i = 0;
        while (i < length) {
            var tag = newTags[i];
            i = (i + 1)|0;

            tag.addActions(this);
        }
    }
};

/**
 * render
 */
Stage.prototype.render = function ()
{
    this.buttonHits = [];
    this.doneTags   = [];

    var ctx = this.preContext;

    // reset
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // background color
    var backgroundColor = this.getBackgroundColor();
    switch (backgroundColor) {
        case "transparent":
        case false:
            // pre clear
            var canvas = ctx.canvas;
            ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);

            // main clear
            var mainCtx = this.context;
            mainCtx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
            break;
        default:
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, this.getWidth() + 1, this.getHeight() + 1);
            break;
    }

    var mc = this.getParent();
    mc.render(ctx, this._matrix, this._colorTransform, this, true);
};

/**
 * executeAction
 */
Stage.prototype.executeAction = function ()
{
    if (this.isAction && this.actions.length) {
        this.isAction = false;

        var i = 0;
        while (i < this.actions.length) {
            var obj = this.actions[i];
            i = (i + 1)|0;

            var mc   = obj.mc;
            var args = obj.args || [];
            if (!mc.active) {
                continue;
            }

            var actions = obj.as;
            switch (typeof actions) {
                case "function":
                    actions.apply(mc, args);
                    break;
                default:
                    var length = actions.length|0;
                    var idx    = 0;
                    while (idx < length) {
                        if (!(idx in actions)) {
                            continue;
                        }

                        var action = actions[idx];
                        idx = (idx + 1)|0;

                        switch (typeof action) {
                            case "function":
                                action.apply(mc, args);
                                break;

                        }
                    }
                    break;
            }
        }
    }

    // reset
    this.actions  = [];
    this.isAction = true;
};

/**
 * @param mc
 * @param as
 */
Stage.prototype.buttonAction = function (mc, as)
{
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];

    as.execute(mc);
    this.executeAction();
};

/*
 * main canvas
 */
Stage.prototype.renderMain = function ()
{
    var preContext = this.preContext;
    var preCanvas  = preContext.canvas;
    var width      = preCanvas.width;
    var height     = preCanvas.height;

    if (width > 0 && height > 0) {
        var ctx = this.context;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(preCanvas, 0, 0, width, height);
    }
};

/**
 * reset
 */
Stage.prototype.reset = function ()
{
    this.instanceId = 0;

    // new MovieClip
    var mc = new MovieClip();
    mc.reset();
    mc.setStage(this);

    // reset
    this.parent           = mc;
    this.characters       = [];
    this.instances        = [];
    this.buttonHits       = [];
    this.downEventHits    = [];
    this.moveEventHits    = [];
    this.upEventHits      = [];
    this.keyDownEventHits = [];
    this.keyUpEventHits   = [];
    this.sounds           = [];
    this.loadSounds       = [];
    this.actions          = [];
};

/**
 * init
 */
Stage.prototype.init = function ()
{
    var div;
    var doc    = this.$document;
    var stages = this.$stages;
    if (this.getId() in stages) {
        var tagId = this.tagId;
        if (tagId) {
            if (doc.readyState === "loading") {
                var reTry = function ()
                {
                    window.removeEventListener("DOMContentLoaded", reTry);
                    this.init();
                };
                window.addEventListener("DOMContentLoaded", reTry);
                return 0;
            }

            var container = doc.getElementById(tagId);
            if (!container) {
                alert("Not Found Tag ID:" + tagId);
                return 0;
            }

            div = doc.getElementById(this.getName());
            if (div) {
                this.deleteNode();
            } else {
                div    = doc.createElement("div");
                div.id = this.getName();
                container.appendChild(div);
            }
        } else {
            doc.body.insertAdjacentHTML("beforeend", "<div id='" + this.getName() + "'></div>");
        }
    }

    div = doc.getElementById(this.getName());
    if (div) {
        this.initStyle(div);
        this.loading();
    }

    if (!this.canvas) {
        this.initCanvas();
    }

    this.loadStatus += 1;
    this.loadEvent();
};

/**
 * @param div
 */
Stage.prototype.initStyle = function (div)
{
    var style = div.style;

    // set css
    style.position                       = "relative";
    style.top                            = "0";
    style.backgroundColor                = "transparent";
    style.overflow                       = "hidden";
    style["-webkit-backface-visibility"] = "hidden";

    var parent  = div.parentNode;
    var oWidth  = this.optionWidth;
    var oHeight = this.optionHeight;
    var width;
    var height;
    if (parent.tagName === "BODY") {
        width  = (oWidth > 0)  ? oWidth  : window.innerWidth;
        height = (oHeight > 0) ? oHeight : window.innerHeight;
    } else {
        width  = (oWidth > 0)  ? oWidth  : parent.offsetWidth;
        height = (oHeight > 0) ? oHeight : parent.offsetHeight;
    }

    style.width  = width + "px";
    style.height = height + "px";
    style['-webkit-user-select'] = "none";
};

/**
 * init canvas
 */
Stage.prototype.initCanvas = function ()
{
    var self = this;
    var style;
    var canvas    = self.$document.createElement("canvas");
    canvas.width  = 1;
    canvas.height = 1;

    style = canvas.style;

    // set css
    style.zIndex   = 0;
    style.position = "absolute";
    style.top      = 0;
    style.left     = 0;
    style.zoom     = 100 / self.ratio + "%";
    style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
    style.MozTransformOrigin = "0 0";
    style.MozTransform       = "scale(" + 1 / self.ratio + ")";

    if (self.$isAndroid) {
        canvas.addEventListener("touchcancel", function ()
        {
            self.touchEnd(self.$event);
        });
    }

    if (!self.$isTouch) {
        window.addEventListener("keydown", self.$keyDownAction);
        window.addEventListener("keyup", self.$keyUpAction);
        window.addEventListener("keyup", function (event)
        {
            Util.prototype.$keyEvent = event;
            self.touchEnd(event);
        });
    }

    // main canvas
    self.context = canvas.getContext("2d");
    self.context.imageSmoothingEnabled = false;
    self.canvas  = canvas;

    // pre canvas
    var preCanvas    = self.$document.createElement("canvas");
    preCanvas.width  = 1;
    preCanvas.height = 1;

    self.preContext = preCanvas.getContext("2d");
    self.preContext.imageSmoothingEnabled = false;

    // hit canvas
    var hitCanvas    = self.$document.createElement("canvas");
    hitCanvas.width  = 1;
    hitCanvas.height = 1;

    self.hitContext = hitCanvas.getContext("2d");
    self.hitContext.imageSmoothingEnabled = false;
};

/**
 * loading
 */
Stage.prototype.loading = function ()
{
    var div = this.$document.getElementById(this.getName());
    var loadingId = this.getName() + "_loading";
    var css = "<style>";
    css += "#" + loadingId + " {\n";
    css += "position: absolute;\n";
    css += "top: 50%;\n";
    css += "left: 50%;\n";
    css += "margin: -24px 0 0 -24px;\n";
    css += "width: 50px;\n";
    css += "height: 50px;\n";
    css += "border-radius: 50px;\n";
    css += "border: 8px solid #dcdcdc;\n";
    css += "border-right-color: transparent;\n";
    css += "box-sizing: border-box;\n";
    css += "-webkit-animation: " + loadingId + " 0.8s infinite linear;\n";
    css += "animation: " + loadingId + " 0.8s infinite linear;\n";
    css += "} \n";
    css += "@-webkit-keyframes " + loadingId + " {\n";
    css += "0% {-webkit-transform: rotate(0deg);}\n";
    css += "100% {-webkit-transform: rotate(360deg);}\n";
    css += "} \n";
    css += "@keyframes " + loadingId + " {\n";
    css += "0% {transform: rotate(0deg);}\n";
    css += "100% {transform: rotate(360deg);}\n";
    css += "} \n";
    css += "</style>";

    div.innerHTML  = css;
    var loadingDiv = this.$document.createElement("div");
    loadingDiv.id  = loadingId;

    // append
    div.appendChild(loadingDiv);
};

/**
 * @param url
 * @param options
 */
Stage.prototype.reload = function (url, options)
{
    this.stop();

    if (this.loadStatus === 4) {
        this.deleteNode();
    }

    this.loadStatus = 0;
    this.isLoad     = false;
    this.reset();

    var swf2js = window.swf2js;
    return swf2js.load(url, {
        optionWidth:  options.optionWidth  || this.optionWidth,
        optionHeight: options.optionHeight || this.optionHeight,
        callback:     options.callback     || this.callback,
        tagId:        options.tagId        || this.tagId,
        FlashVars:    options.FlashVars    || this.FlashVars,
        quality:      options.quality      || this.quality,
        bgcolor:      options.bgcolor      || this.bgcolor,
        stage:        this
    });
};

/**
 * @param url
 * @param frame
 * @param width
 * @param height
 * @returns {*}
 */
Stage.prototype.output = function (url, frame, width, height)
{
    if (!this.isLoad || this.stopFlag) {
        var retry = (function (self, url, frame, width, height)
        {
            return function () {
                self.output(url, frame, width, height);
            };
        })(this, url, frame, width, height);

        return this.$setTimeout.call(null, retry, 500);
    }

    this.stop();
    frame  = frame  || 1;
    width  = width  || this.getWidth();
    height = height || this.getHeight();

    // resize
    var mc = this.getParent();
    mc.reset();
    mc.gotoAndStop(frame);
    if (width !== this.getWidth() || height !== this.getHeight()) {
        this.optionWidth = width;
        this.optionHeight = height;
        this.resize();
    }

    // action
    mc.addActions();

    // backgroundColor
    var canvas = this.preContext.canvas;
    var style  = canvas.style;
    style.backgroundColor = this.backgroundColor;

    // render
    this.render();

    // output
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", url, true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.onreadystatechange = function ()
    {
        var readyState = xmlHttpRequest.readyState|0;
        if (readyState === 4) {
            var status = xmlHttpRequest.status|0;
            switch (status) {
                case 200:
                case 304:
                    console.log("OUTPUT SUCCESS");
                    break;
                default :
                    alert(xmlHttpRequest.statusText);
                    break;
            }
        }
    };

    var base64 = canvas.toDataURL();
    xmlHttpRequest.send("data=" + encodeURIComponent(base64));
};

/**
 * @param event
 */
Stage.prototype.hitCheck = function (event)
{
    this.isHit     = false;
    var buttonHits = this.buttonHits;
    var length     = buttonHits.length|0;
    if (!length) {
        return 0;
    }

    var div    = this.$document.getElementById(this.getName());
    var bounds = div.getBoundingClientRect();

    var x = window.pageXOffset + bounds.left;
    var y = window.pageYOffset + bounds.top;

    var touchX = 0;
    var touchY = 0;

    if (this.$isTouch) {
        var changedTouche = event.changedTouches[0];
        touchX            = changedTouche.pageX;
        touchY            = changedTouche.pageY;
    } else {
        touchX = event.pageX;
        touchY = event.pageY;
    }

    touchX = touchX - x;
    touchY = touchY - y;

    var scale = this.getScale();
    touchX    = touchX / scale;
    touchY    = touchY / scale;

    var ctx       = this.hitContext;
    var hitCanvas = ctx.canvas;
    var hitWidth  = hitCanvas.width;
    var hitHeight = hitCanvas.height;

    var chkX = touchX * scale * this.ratio;
    var chkY = touchY * scale * this.ratio;

    if (this.abcFlag) {
        var parent = this.getParent();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, hitWidth, hitHeight);
        var ret = parent.hitCheck(ctx, [1,0,0,1,0,0], this, chkX, chkY);
        return (typeof ret === "object") ? ret : false;
    }

    var i = length;
    while (i) {
        var idx = (i - 1)|0;

        if (!(idx in buttonHits)) {
            i = (i - 1)|0;
            continue;
        }

        var hitObj = buttonHits[idx];
        i = (i - 1)|0;

        if (hitObj === undefined) {
            continue;
        }

        var hit = false;
        if (touchX >= hitObj.xMin && touchX <= hitObj.xMax &&
            touchY >= hitObj.yMin && touchY <= hitObj.yMax
        ) {
            var matrix = hitObj.matrix;
            if (matrix) {
                var mc     = hitObj.parent;
                var button = hitObj.button;

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, hitWidth, hitHeight);
                if (button) {
                    hit = button.renderHitTest(ctx, matrix, this, chkX, chkY);
                } else {
                    hit = mc.renderHitTest(ctx, matrix, this, chkX, chkY);
                }
            } else {
                hit = true;
            }
        }

        if (hit) {
            event.preventDefault();
            this.isHit = true;
            return hitObj;
        }
    }

    return 0;
};

/**
 * @param actions
 * @param caller
 * @param event
 */
Stage.prototype.executeEventAction = function (actions, caller, event)
{
    var args = event || [];
    if (actions) {
        if (typeof actions === "function") {
            actions.apply(caller, args);
        } else {
            var length = actions.length|0;
            if (length) {
                var i = 0;
                while (i < length) {
                    var action = actions[i];
                    i = (i + 1)|0;
                    if (typeof action === "function") {
                        action.apply(caller, args);
                    }
                }
            }
        }
        this.executeAction();
    }
};

/**
 * @param event
 */
Stage.prototype.touchStart = function (event)
{
    if (this.touchStatus === "up") {
        this.touchStatus    = "down";
        this.isHit          = false;
        this.isTouchEvent   = true;
        this.touchEndAction = null;
        var downEventHits   = this.downEventHits;
        var length          = downEventHits.length|0;
        var mc, as;
        if (length) {
            event.preventDefault();

            var i = 0;
            while(i < length) {
                var obj = downEventHits[i];
                i = (i + 1)|0;

                mc = obj.mc;
                as = obj.as;
                if (!as) {
                    as = mc.variables.onMouseDown;
                }

                this.executeEventAction(as, obj.mc);
            }

            this.downEventHits = [];
        }

        var hitObj = this.hitCheck(event);
        if (this.isHit) {
            mc = hitObj.parent;
            if (mc.active) {
                mc.setButtonStatus("down");
                if (mc.getClassName() !== "TextField") {
                    this.executePress(mc, hitObj);
                } else {
                    this.appendTextArea(mc, hitObj);
                }
            }

            if (this.touchObj === null) {
                this.touchObj = hitObj;
            }
        }
    }
};

/**
 * @param mc
 * @param hitObj
 */
Stage.prototype.executePress = function (mc, hitObj)
{
    var events, press, onPress, rollOver, onRollOver;

    var isRender = false;

    var cEvent = new ClipEvent();

    events      = mc.events;
    var isTouch = this.$isTouch;
    if (isTouch) {
        rollOver = events.rollOver;
        if (rollOver) {
            cEvent.type   = "rollOver";
            cEvent.target = mc;
            isRender      = true;
            this.executeEventAction(rollOver, mc, [cEvent]);
        }

        onRollOver = mc.variables.onRollOver;
        if (typeof onRollOver === "function") {
            isRender = true;
            this.executeEventAction(onRollOver, mc);
        }
    }

    events = mc.events;
    press  = events.press;
    if (press) {
        cEvent.type   = "press";
        cEvent.target = mc;
        isRender      = true;
        this.executeEventAction(press, mc, [cEvent]);
    }

    onPress = mc.variables.onPress;
    if (typeof onPress === "function") {
        isRender = true;
        this.executeEventAction(onPress, mc);
    }

    var button = hitObj.button;
    if (button) {
        events = button.events;

        if (isTouch) {
            rollOver = events.rollOver;
            if (rollOver) {
                cEvent.type   = "rollOver";
                cEvent.target = button;
                this.executeEventAction(rollOver, button, [cEvent]);
            }

            onRollOver = button.variables.onRollOver;
            if (typeof onRollOver === "function") {
                this.executeEventAction(onRollOver, button);
            }
        }

        button.setButtonStatus("down");
        if (isTouch) {
            this.executeButtonAction(button, mc, "CondIdleToOverUp");
        }

        var actions = button.getActions();
        var length  = actions.length|0;
        if (length) {
            var touchObj = this.touchObj;

            var idx = 0;
            while (idx < length) {
                if (!(idx in actions)) {
                    idx = (idx + 1)|0;
                    continue;
                }

                var cond = actions[idx];
                if (cond.CondOverDownToOverUp && touchObj === null) {
                    this.touchEndAction = cond.ActionScript;
                    idx = (idx + 1)|0;
                    continue;
                }

                // enter
                var keyPress = cond.CondKeyPress|0;
                if (hitObj.CondKeyPress === 13 && hitObj.CondKeyPress !== keyPress) {
                    idx = (idx + 1)|0;
                    continue;
                }

                if (isTouch) {
                    if (keyPress === 13 ||
                        (keyPress >= 48 && keyPress <= 57) ||
                        cond.CondOverUpToOverDown
                    ) {
                        this.buttonAction(mc, cond.ActionScript);
                    }
                } else {
                    if (cond.CondOverUpToOverDown) {
                        this.buttonAction(mc, cond.ActionScript);
                    }
                }

                idx = (idx + 1)|0;
            }
        }

        press = events.press;
        if (press) {
            cEvent.type   = "press";
            cEvent.target = button;
            this.executeEventAction(press, button, [cEvent]);
        }

        onPress = button.variables.onPress;
        if (typeof onPress === "function") {
            this.executeEventAction(onPress, button);
        }

        var sprite = button.getSprite();
        sprite.startSound();

        button.addActions(this);
        this.executeAction();

        isRender = true;
    }

    if (isRender) {
        this.touchRender();
    }

};

/**
 * @param textField
 * @param hitObj
 */
Stage.prototype.appendTextArea = function (textField, hitObj)
{
    textField.inputActive = true;

    var element = this.$document.getElementById(textField.getTagName());
    if (!element) {
        var text;

        element = textField.input;

        var variable = textField.getProperty("variable");
        if (variable) {
            var mc = textField.getParent();
            text = mc.getProperty(variable);
            if (text === undefined) {
                text = textField.getVariable("text");
            }
        }

        if (text !== undefined) {
            element.value = text;
        }

        var maxLength = textField.getVariable("maxChars");
        if (maxLength) {
            element.maxLength = maxLength;
        }

        var border = textField.getVariable("border");
        if (border) {
            element.style.border = "1px solid black";
            var color = textField.getVariable("backgroundColor");
            element.style.backgroundColor = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
        }

        var scale  = this.getScale();
        var left   = hitObj.xMin;
        var top    = hitObj.yMin;
        var width  = hitObj.xMax - left;
        var height = hitObj.yMax - top;

        element.style.left   = this.$ceil(left * scale)   - 3 + "px";
        element.style.top    = this.$ceil(top * scale)    - 3 + "px";
        element.style.width  = this.$ceil(width * scale)  + 6 + "px";
        element.style.height = this.$ceil(height * scale) + 6 + "px";

        var div = this.$document.getElementById(this.getName());
        if (div) {
            div.appendChild(element);
            element.focus();
            var focus = function (el)
            {
                return function ()
                {
                    el.focus();
                };
            };
            this.$setTimeout.call(null, focus(element), 10);
        }
    }
};

/**
 * @param event
 */
Stage.prototype.touchMove = function (event)
{
    var mc, as, button, events;
    var dragOver, onDragOver, dragOut, onDragOut, rollOver, onRollOver, rollOut, onRollOut;

    var overObj       = this.overObj;
    var moveEventHits = this.moveEventHits;
    var cEvent        = new ClipEvent();

    var length = moveEventHits.length|0;
    if (length) {
        event.preventDefault();

        var i = 0;
        while (i < length) {
            var obj = moveEventHits[i];
            mc      = obj.mc;
            as      = obj.as;
            if (!as) {
                as = mc.variables.onMouseMove;
            }

            this.executeEventAction(as, mc);

            i = (i + 1)|0;
        }

        this.moveEventHits = [];
    }

    var isTouch = this.$isTouch;
    if (!isTouch || (isTouch && this.isTouchEvent)) {
        var hitObj   = null;
        var touchObj = this.touchObj;
        if (touchObj || this.touchStatus === "up") {
            hitObj = this.hitCheck(event);
        }

        var sprite;
        var isRender = false;
        if (!isTouch) {
            var canvas = this.canvas;
            if (this.isHit || touchObj) {
                canvas.style.cursor = (hitObj) ? "pointer" : "auto";
            } else {
                canvas.style.cursor = "auto";
            }
        }

        if (touchObj) {
            button = touchObj.button;
            mc     = touchObj.parent;

            if (mc.active) {
                this.overObj = hitObj;
                if (hitObj &&
                    hitObj.parent.instanceId === mc.instanceId &&
                    hitObj.button === button
                ) {
                    if (mc.getButtonStatus() === "up") {
                        mc.setButtonStatus("down");
                        events   = mc.events;
                        dragOver = events.dragOver;
                        if (dragOver) {
                            cEvent.type   = "dragOver";
                            cEvent.target = mc;
                            isRender      = true;
                            this.executeEventAction(dragOver, mc, [cEvent]);
                        }

                        onDragOver = mc.variables.onDragOver;
                        if (typeof onDragOver === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOver, mc);
                        }
                    }

                    if (button && button.getButtonStatus() === "up") {
                        button.setButtonStatus("down");

                        // sound
                        sprite = button.getSprite();
                        sprite.startSound();

                        events   = button.events;
                        dragOver = events.dragOver;
                        if (dragOver) {
                            cEvent.type   = "dragOver";
                            cEvent.target = button;
                            isRender      = true;
                            this.executeEventAction(dragOver, button, [cEvent]);
                        }

                        onDragOver = button.variables.onDragOver;
                        if (typeof onDragOver === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOver, button);
                        }

                        button.addActions(this);
                        this.executeAction();
                    }
                } else {
                    if (mc.getButtonStatus() === "down") {
                        events  = mc.events;
                        dragOut = events.dragOut;
                        if (dragOut) {
                            cEvent.type   = "dragOut";
                            cEvent.target = mc;
                            isRender      = true;
                            this.executeEventAction(dragOut, mc, [cEvent]);
                        }

                        onDragOut = mc.variables.onDragOut;
                        if (typeof onDragOut === "function") {
                            isRender = true;
                            this.executeEventAction(onDragOut, mc);
                        }
                    }
                    mc.setButtonStatus("up");

                    if (button) {
                        if (button.getButtonStatus() === "down") {
                            button.setButtonStatus("up");

                            events  = button.events;
                            dragOut = events.dragOut;
                            if (dragOut) {
                                cEvent.type   = "dragOut";
                                cEvent.target = button;
                                isRender      = true;
                                this.executeEventAction(dragOut, button, [cEvent]);
                            }

                            onDragOut = button.variables.onDragOut;
                            if (typeof onDragOut === "function") {
                                isRender = true;
                                this.executeEventAction(onDragOut, button);
                            }

                            button.addActions(this);
                            this.executeAction();
                        }
                    }
                }
            }
        } else if (hitObj) {

            if (overObj) {
                button = overObj.button;
                if (button && button !== hitObj.button) {
                    mc = overObj.parent;
                    if (mc.active) {
                        button.setButtonStatus("up");
                        this.executeButtonAction(button, mc, "CondOverUpToIdle");
                    }
                }
            }

            button = hitObj.button;
            mc     = hitObj.parent;
            if (!isTouch && mc.active) {
                if (!overObj || overObj.parent !== mc) {
                    events = mc.events;
                    rollOver = events.rollOver;
                    if (rollOver) {
                        cEvent.type   = "rollOver";
                        cEvent.target = mc;
                        isRender      = true;
                        this.executeEventAction(rollOver, mc, [cEvent]);
                    }

                    onRollOver = mc.variables.onRollOver;
                    if (typeof onRollOver === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOver, mc);
                    }
                }
            }

            if (button) {
                button.setButtonStatus("over");
                sprite = button.getSprite();
                sprite.startSound();
                if (!isTouch) {
                    if (!overObj || overObj.button !== button) {
                        isRender = true;
                        this.executeButtonAction(button, mc, "CondIdleToOverUp");

                        events   = button.events;
                        rollOver = events.rollOver;
                        if (rollOver) {
                            cEvent.type   = "rollOver";
                            cEvent.target = button;
                            isRender      = true;
                            this.executeEventAction(rollOver, button, [cEvent]);
                        }

                        onRollOver = button.variables.onRollOver;
                        if (typeof onRollOver === "function") {
                            this.executeEventAction(onRollOver, button);
                        }
                    }
                }

                button.addActions(this);
                this.executeAction();
            }

            this.overObj = hitObj;
        } else if (this.touchStatus === "up") {
            this.overObj = null;
        }

        // RollOut
        if (!touchObj && overObj) {
            button = overObj.button;
            mc     = overObj.parent;
            if (mc.active) {
                if (!hitObj || hitObj.parent !== mc) {
                    mc.setButtonStatus("up");

                    events = mc.events;
                    rollOut = events.rollOut;
                    if (rollOut) {
                        cEvent.type   = "rollOut";
                        cEvent.target = mc;
                        isRender      = true;
                        this.executeEventAction(rollOut, mc, [cEvent]);
                    }

                    onRollOut = mc.variables.onRollOut;
                    if (typeof onRollOut === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOut, mc);
                    }
                }

                if (button && (!hitObj || hitObj.button !== button)) {
                    button.setButtonStatus("up");
                    this.executeButtonAction(button, mc, "CondOverUpToIdle");

                    events = button.events;
                    rollOut = events.rollOut;
                    if (rollOut) {
                        cEvent.type   = "rollOut";
                        cEvent.target = button;
                        isRender      = true;
                        this.executeEventAction(rollOut, button, [cEvent]);
                    }

                    onRollOut = button.variables.onRollOut;
                    if (typeof onRollOut === "function") {
                        isRender = true;
                        this.executeEventAction(onRollOut, button);
                    }

                    button.addActions(this);
                    this.executeAction();
                }
            }
        }

        if (isRender) {
            this.touchRender();
        }
    }

    var dragMc = this.dragMc;
    if (dragMc) {
        event.preventDefault();
        dragMc.executeDrag();
        this.isHit = true;
    }
};

/**
 * @param event
 */
Stage.prototype.touchEnd = function (event)
{
    var button, mc, as, events, release, onRelease, releaseOutside, onReleaseOutside;

    var isTouch  = this.$isTouch;
    var cEvent   = new ClipEvent();
    var touchObj = this.touchObj;
    if (touchObj) {
        button = touchObj.button;
        if (button) {
            button.setButtonStatus("up");
        }
    }

    var upEventHits = this.upEventHits;
    var length = upEventHits.length|0;
    if (length) {
        event.preventDefault();

        var i = 0;
        while (i < length) {
            var obj = upEventHits[i];
            mc      = obj.mc;
            as      = obj.as;
            if (!as) {
                as = mc.variables.onMouseUp;
            }

            this.executeEventAction(as, obj.mc);

            i = (i + 1)|0;
        }

        this.upEventHits = [];
    }

    var hitObj = this.hitCheck(event);
    var dragMc = this.dragMc;
    if (dragMc) {
        hitObj = touchObj;
        this.isHit = true;
    }

    var isRender = false;
    if (touchObj) {
        mc = touchObj.parent;
        mc.setButtonStatus("up");
        button = touchObj.button;

        if (this.isHit) {
            var touchEndAction = this.touchEndAction;
            if (mc.active) {
                if (mc === hitObj.parent) {
                    if (touchEndAction !== null) {
                        isRender = true;
                        this.buttonAction(mc, touchEndAction);
                    }

                    events  = mc.events;
                    release = events.release;
                    if (release) {
                        isRender      = true;
                        cEvent.type   = "release";
                        cEvent.target = mc;
                        this.executeEventAction(release, mc, [cEvent]);

                    }
                    onRelease = mc.variables.onRelease;
                    if (typeof onRelease === "function") {
                        isRender = true;
                        this.executeEventAction(onRelease, mc);
                    }
                }

                if (button) {
                    if (button === hitObj.button) {
                        events  = button.events;
                        release = events.release;
                        if (release) {
                            cEvent.type   = "release";
                            cEvent.target = button;
                            this.executeEventAction(release, button, [cEvent]);
                        }

                        onRelease = button.variables.onRelease;
                        if (typeof onRelease === "function") {
                            this.executeEventAction(onRelease, button);
                        }
                    }

                    var status = "up";
                    if (!isTouch) {
                        if (hitObj && hitObj.button === button) {
                            status = "over";
                        }
                    }

                    button.setButtonStatus(status);

                    var sprite = button.getSprite("hit");
                    sprite.startSound();

                    button.addActions(this);
                    this.executeAction();

                    isRender = true;
                }
            }
        }

        if (mc.active && (!hitObj || mc !== hitObj.parent)) {
            events = mc.events;
            releaseOutside = events.releaseOutside;
            if (releaseOutside) {
                isRender      = true;
                cEvent.type   = "releaseOutside";
                cEvent.target = mc;
                this.executeEventAction(releaseOutside, mc, [cEvent]);

            }

            onReleaseOutside = mc.variables.onReleaseOutside;
            if (typeof onReleaseOutside === "function") {
                isRender = true;
                this.executeEventAction(onReleaseOutside, mc);
            }
        }

        if (button && (!hitObj || button !== hitObj.button)) {
            isRender = true;

            events = button.events;

            releaseOutside = events.releaseOutside;
            if (releaseOutside) {
                cEvent.type   = "releaseOutside";
                cEvent.target = button;
                this.executeEventAction(releaseOutside, button, [cEvent]);
            }

            onReleaseOutside = button.variables.onReleaseOutside;
            if (typeof onReleaseOutside === "function") {
                this.executeEventAction(onReleaseOutside, button);
            }

            button.setButtonStatus("up");
            button.addActions(this);
            this.executeAction();
        }
    }

    this.isHit        = false;
    this.isTouchEvent = false;
    this.touchObj     = null;
    this.touchStatus  = "up";

    if (!isTouch) {
        this.hitCheck(event);
        var canvas = this.canvas;
        canvas.style.cursor = (this.isHit) ? "pointer" : "auto";
    }

    if (hitObj) {
        var rollOver, onRollOver;

        mc = hitObj.parent;
        if (!touchObj || mc !== touchObj.parent) {
            events = mc.events;

            rollOver = events.rollOver;
            if (rollOver) {
                isRender      = true;
                cEvent.type   = "rollOver";
                cEvent.target = mc;
                this.executeEventAction(rollOver, mc, [cEvent]);
            }

            onRollOver = mc.variables.onRollOver;
            if (typeof onRollOver === "function") {
                isRender = true;
                this.executeEventAction(onRollOver, mc);
            }
        }

        button = hitObj.button;
        if (button) {
            if (!touchObj || button !== touchObj.button) {
                events = button.events;

                rollOver = events.rollOver;
                if (rollOver) {
                    isRender      = true;
                    cEvent.type   = "rollOver";
                    cEvent.target = button;
                    this.executeEventAction(rollOver, button, [cEvent]);
                }

                onRollOver = button.variables.onRollOver;
                if (typeof onRollOver === "function") {
                    isRender = true;
                    this.executeEventAction(onRollOver, button);
                }
            }
        }
    }

    if (isRender) {
        event.preventDefault();
        this.touchRender();
    }

    this.$keyEvent = null;
};

/**
 * @param button
 * @param mc
 * @param status
 */
Stage.prototype.executeButtonAction = function (button, mc, status)
{
    var actions = button.getActions();
    var length  = actions.length;
    if (length) {
        for (var idx in actions) {
            if (!actions.hasOwnProperty(idx)) {
                continue;
            }

            var cond = actions[idx];
            if (!cond[status]) {
                continue;
            }

            this.buttonAction(mc, cond.ActionScript);
        }
    }
};

/**
 * touchRender
 */
Stage.prototype.touchRender = function ()
{
    this.render();
    this.renderMain();
};
var AntiAliasType = function () {};

var CSMSettings = function () {};
var Font = function () {};
var FontStyle = function() {};
var FontType = function () {};
var GridFitType = function () {};

/**
 * @constructor
 */
var StaticText = function ()
{
    DisplayObject.call(this);
    this.data    = null;
    this.records = [];
};

/**
 * extends
 * @type {DisplayObject}
 */
StaticText.prototype = Object.create(DisplayObject.prototype);
StaticText.prototype.constructor = StaticText;

/**
 * dummy
 */
StaticText.prototype.initFrame   = function () {};
StaticText.prototype.addActions  = function () {};
StaticText.prototype.setHitRange = function () {};
/**
 * @returns {string}
 */
StaticText.prototype.getClassName = function ()
{
    return "StaticText";
};

/**
 * @returns {{}}
 */
StaticText.prototype.getBounds = function (matrix)
{
    if (matrix) {
        var bounds = this.boundsMatrix(this.bounds, matrix);
        for (var name in bounds) {
            if (!bounds.hasOwnProperty(name)) {
                continue;
            }
            var value    = +bounds[name];
            bounds[name] = +(value / 20);
        }
        return bounds;
    } else {
        return this.bounds;
    }
};

/**
 * @param bounds
 */
StaticText.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * @returns {Array}
 */
StaticText.prototype.getRecords = function ()
{
    return this.records;
};

/**
 * @param record
 */
StaticText.prototype.addRecord = function (record)
{
    var records = this.getRecords();
    records[records.length] = record;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 * @return {*}
 */
StaticText.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());

    var isVisible = this.$min(this.getVisible(), visible);
    var alpha     = +(rColorTransform[3] + (rColorTransform[7] / 255));
    var stageClip = stage.clipMc || stage.isClipDepth;
    if (!stageClip && (!alpha || !isVisible)) {
        return 0;
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj = this.preRender(ctx, m2, rColorTransform, stage, visible);
    var m3  = this.$multiplicationMatrix(stage.getMatrix(), obj.preMatrix);

    var xScale = +this.$sqrt(m3[0] * m3[0] + m3[1] * m3[1]);
    var yScale = +this.$sqrt(m3[2] * m3[2] + m3[3] * m3[3]);
    xScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(xScale) / this.$LN2_2 - this.$LOG1P));
    yScale = +this.$pow(this.$SQRT2, this.$ceil(this.$log(yScale) / this.$LN2_2 - this.$LOG1P));

    // render
    var bounds = this.getBounds();
    var xMax   = +bounds.xMax;
    var xMin   = +bounds.xMin;
    var yMax   = +bounds.yMax;
    var yMin   = +bounds.yMin;

    var W = this.$abs(this.$ceil((xMax - xMin) * xScale))|0;
    var H = this.$abs(this.$ceil((yMax - yMin) * yScale))|0;
    var isClipDepth = this.isClipDepth || stageClip;
    if (W > 0 && H > 0) {
        var cacheId  = this.getCharacterId() + "_" + this.getStage().getId();
        var cacheKey = this.$cacheStore.generateKey(cacheId, [xScale, yScale], rColorTransform);
        var cache    = this.$cacheStore.getCache(cacheKey);

        var canvas;
        if (!cache && !isClipDepth) {
            if (stage.getWidth() > W && stage.getHeight() > H && this.$cacheStore.size > W * H) {
                canvas        = this.$cacheStore.getCanvas();
                canvas.width  = W;
                canvas.height = H;
                cache         = canvas.getContext("2d");

                var cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
                cache.setTransform(cMatrix[0],cMatrix[1],cMatrix[2],cMatrix[3],cMatrix[4],cMatrix[5]);
                cache = this.executeRender(cache, cMatrix, rColorTransform, false, false);
                this.$cacheStore.setCache(cacheKey, cache);
            }
        }

        if (cache) {
            canvas = cache.canvas;
            var m4 = this.$multiplicationMatrix(m3, [1 / xScale, 0, 0, 1 / yScale, xMin, yMin]);
            ctx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

            if (this.$isAndroid4x && !this.$isChrome) {
                ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
                ctx.fillRect(0, 0, W, H);
            } else {
                ctx.drawImage(canvas, 0, 0, W, H);
            }
        } else {
            ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
            this.executeRender(ctx, m3, rColorTransform, isClipDepth, stageClip);
        }

        cacheKey += "_" + m3[4] + "_" + m3[5];
        if (obj.isFilter || obj.isBlend) {
            obj.cacheKey = cacheKey;
            this.postRender(ctx, matrix, rColorTransform, stage, obj);
        }

        return cacheKey;
    }

    return null;
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param isClipDepth
 * @param stageClip
 * @returns {*}
 */
StaticText.prototype.executeRender = function (ctx, matrix, colorTransform, isClipDepth, stageClip)
{
    var records = this.getRecords();
    var length  = records.length|0;
    if (!length) {
        return ctx;
    }

    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        var shapes      = record.getData();
        var shapeLength = shapes.length|0;
        if (!shapeLength) {
            continue;
        }

        var m2 = this.$multiplicationMatrix(matrix, record.getMatrix());
        ctx.setTransform(m2[0],m2[1],m2[2],m2[3],m2[4],m2[5]);

        var color     = record.getColor();
        color         = this.$generateColorTransform(color, colorTransform);
        ctx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";

        var idx = 0;
        while (idx < shapeLength) {
            var styleObj = shapes[idx];
            var cmd      = styleObj.cmd;

            if (!isClipDepth) {
                ctx.beginPath();
                cmd(ctx);
                ctx.fill();
            } else {
                cmd(ctx);
            }

            idx = (idx + 1)|0;
        }
    }

    if (isClipDepth && !stageClip) {
        ctx.clip();
    }

    ctx.globalAlpha = 1;
    return ctx;
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
StaticText.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var records = this.getRecords();
    var length  = records.length|0;
    if (!length) {
        return false;
    }

    var hit = false;
    var m2  = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3  = this.$multiplicationMatrix(stage.getMatrix(), m2);

    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        var shapes      = record.getData();
        var shapeLength = shapes.length|0;
        if (!shapeLength) {
            continue;
        }

        var m4 = this.$multiplicationMatrix(m3, record.getMatrix());
        ctx.setTransform(m4[0],m4[1],m4[2],m4[3],m4[4],m4[5]);

        var idx = 0;
        while (idx < shapeLength) {
            var styleObj = shapes[idx];
            var cmd      = styleObj.cmd;

            ctx.beginPath();
            cmd(ctx);

            hit = ctx.isPointInPath(x, y);
            if (hit) {
                return hit;
            }

            idx = (idx + 1)|0;
        }
    }

    return hit;
};
var StyleSheet = function () {};
var TextColorType = function () {};
var TextDisplayMode = function () {};
/**
 * @param name
 * @param depth
 * @param width
 * @param height
 * @constructor
 */
var TextField = function (name, depth, width, height)
{
    InteractiveObject.call(this);

    if (name) {
        this.setName(name);
    }

    if (depth) {
        this.setLevel(depth);
    }

    if (width === undefined) {
        width = 0;
    }
    width = width * 20;

    if (height === undefined) {
        height = 0;
    }
    height = height * 20;

    this.fontId      = 0;
    this.input       = null;
    this.inputActive = false;
    this.span        = null;
    this.bounds      = {xMin: 0, xMax: width, yMin: 0, yMax: height};
};

/**
 * extends
 * @type {InteractiveObject}
 */
TextField.prototype = Object.create(InteractiveObject.prototype);
TextField.prototype.constructor = TextField;

/**
 * properties
 */
Object.defineProperties(TextField.prototype, {
    text: {
        get: function () {
            return this.variables.text;
        },
        set: function (text) {
            this.variables.text = text;
        }
    },
    htmlText: {
        get: function () {
            return this.variables.text;
        },
        set: function (text) {
            this.variables.text = text;
        }
    },
    size: {
        get: function () {
            return this.variables.size;
        },
        set: function (size) {
            this.variables.size = size;
        }
    },
    font: {
        get: function () {
            return this.variables.font;
        },
        set: function (font) {
            this.variables.font = font;
        }
    },
    type: {
        get: function () {
            return this.variables.type;
        },
        set: function (type) {
            this.variables.type = type;
            if (type === "input") {
                this.setInputElement();
            }
        }
    },
    multiline: {
        get: function () {
            return this.variables.multiline;
        },
        set: function (multiline) {
            this.variables.multiline = multiline;
            if (multiline) {
                this.wordWrap = multiline;
            }
            if (this.type === "input") {
                this.setInputElement();
            }
        }
    },
    wordWrap: {
        get: function () {
            return this.variables.wordWrap;
        },
        set: function (wordWrap) {
            this.variables.wordWrap = wordWrap;
            if (this.type === "input") {
                this.setInputElement();
            }
        }
    },
    border: {
        get: function () {
            return this.variables.border;
        },
        set: function (border) {
            this.variables.border = border;
        }
    },
    borderColor: {
        get: function () {
            return this.variables.borderColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.borderColor = color;
        }
    },
    background: {
        get: function () {
            return this.variables.background;
        },
        set: function (background) {
            this.variables.background = background;
        }
    },
    backgroundColor: {
        get: function () {
            return this.variables.backgroundColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.backgroundColor = color;
        }
    },
    textColor: {
        get: function () {
            return this.variables.textColor;
        },
        set: function (color) {
            if (typeof color === "string") {
                color = this.$colorStringToInt(color);
            }
            color = this.$intToRGBA(color);
            this.variables.textColor = color;
        }
    },
    align: {
        get: function () {
            return this.variables.align;
        },
        set: function (align) {
            this.variables.align = align;
        }
    },
    autoSize: {
        get: function () {
            return this.variables.autoSize;
        },
        set: function (autoSize) {
            this.variables.autoSize = autoSize;
        }
    },
    onChanged: {
        get: function () {
            return this.variables.onChanged;
        },
        set: function (onChanged) {
            this.variables.onChanged = onChanged;
        }
    }
});

/**
 * @returns {string}
 */
TextField.prototype.getClassName = function ()
{
    return "TextField";
};

/**
 * @param int
 * @param alpha
 * @returns {{R: number, G: number, B: number, A: number}}
 */
TextField.prototype.intToRGBA = function (int, alpha)
{
    alpha = alpha || 100;
    return {
        R: (int & 0xff0000) >> 16,
        G: (int & 0x00ff00) >> 8,
        B: (int & 0x0000ff),
        A: (alpha / 100)
    };
};

/**
 * setInitParams
 */
TextField.prototype.setInitParams = function ()
{
    var obj = {};
    obj.antiAliasType     = null;
    obj.autoSize          = "none";
    obj.background        = 0;
    obj.backgroundColor   = {R: 255, G: 255, B: 255, A: 1};
    obj.border            = 0;
    obj.borderColor       = {R: 0, G: 0, B: 0, A: 1};
    obj.condenseWhite     = 0;
    obj.html              = 0;
    obj.password          = 0;
    obj.embedFonts        = 0;
    obj.gridFitType       = "none";
    obj.maxChars          = null;
    obj.mouseWheelEnabled = 0;
    obj.multiline         = 0;
    obj.selectable        = 0;
    obj.sharpness         = 0;
    obj.textColor         = 0;
    obj.thickness         = 0;
    obj.type              = "dynamic";
    obj.wordWrap          = 0;
    obj.text              = "";

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        this.setProperty(key, obj[key]);
    }

    this.setTextFormat(new TextFormat());
};

/**
 * @returns {string}
 */
TextField.prototype.getTagName = function ()
{
    return "__swf2js_input_element_" + this.instanceId;
};

/**
 * @param format
 */
TextField.prototype.setTextFormat = function (format)
{
    for (var name in format) {
        if (!format.hasOwnProperty(name)) {
            continue;
        }
        this.setProperty(name, format[name]);
    }
};

/**
 * @returns {*}
 */
TextField.prototype.getBounds = function (matrix)
{
    if (matrix) {
        var bounds = this.boundsMatrix(this.bounds, matrix);
        for (var name in bounds) {
            if (!bounds.hasOwnProperty(name)) {
                continue;
            }

            var value    = +bounds[name];
            bounds[name] = +(value / 20);
        }
        return bounds;
    } else {
        return this.bounds;
    }
};

/**
 * @param bounds
 */
TextField.prototype.setBounds = function (bounds)
{
    this.bounds = bounds;
};

/**
 * InputElemen
 */
TextField.prototype.setInputElement = function ()
{
    var variables = this.variables;
    var _root     = this.getDisplayObject("_root");
    var stage     = _root.getParentStage();
    var element   = this.$document.createElement("textarea");
    var multiline = variables.multiline;
    var align     = variables.align;

    var text = this.initialText;
    if (!text) {
        text = variables.text;
    }

    element.onkeypress = null;
    if (!multiline) {
        element.onkeypress = function (e)
        {
            if (e.keyCode === 13) {
                return false;
            }
        };
    }

    var style = element.style;

    style.position           = "absolute";
    style.webkitBorderRadius = "0px";
    style.padding            = "1px";
    style.margin             = "0px";
    style.webkitAppearance   = "none";
    style.resize             = "none";
    style.border             = "none";
    style.overflow           = "hidden";
    style.backgroundColor    = "transparent";
    style.zIndex             = 0x7fffffff;
    style.textAlign          = align;

    element.value = text;
    if (typeof text !== "string") {
        var str    = "";
        var length = 0 | text.length;

        var i = 0;
        while (i < length) {
            var txt = text[i];
            str    += txt.innerText;

            if ((i + 1) !== length) {
                str += "\n";
            }

            i = 0 | i + 1;
        }

        element.value = str;
    }

    element.id = this.getTagName();

    var self = this;
    var onBlur = function (stage, textField, el)
    {
        return function ()
        {
            textField.setProperty("text", el.value);
            textField.inputActive = false;

            var div = self.$document.getElementById(stage.getName());
            if (div) {
                var element = self.$document.getElementById(textField.getTagName());
                if (element) {
                    try {
                        div.removeChild(element);
                    } catch (e) {}
                }
            }
        };
    };

    element.onblur = onBlur(stage, this, element);
    this.input = element;
};

/**
 * @param matrix
 * @param stage
 * @param visible
 * @param mask
 */
TextField.prototype.setHitRange = function (matrix, stage, visible, mask)
{
    var type      = this.variables.type;
    var isVisible = this.$min(this.getVisible(), visible)|0;
    if (type === "input" && isVisible === 1) {
        var buttonHits = stage.buttonHits;

        var m2     = this.$multiplicationMatrix(matrix, this.getMatrix());
        var bounds = this.getBounds(m2);

        buttonHits[buttonHits.length] = {
            xMax:   +bounds.xMax,
            xMin:   +bounds.xMin,
            yMax:   +bounds.yMax,
            yMin:   +bounds.yMin,
            parent: this
        };
    }
};

/**
 * @param ctx
 * @param matrix
 * @param colorTransform
 * @param stage
 * @param visible
 */
TextField.prototype.render = function (ctx, matrix, colorTransform, stage, visible)
{
    stage.doneTags.unshift(this);

    // return "";

    // colorTransform
    var rColorTransform = this.$multiplicationColor(colorTransform, this.getColorTransform());
    var isVisible       = this.$min(this.getVisible(), visible);
    var stageClip       = stage.clipMc || stage.isClipDepth;
    var alpha           = rColorTransform[3] + (rColorTransform[7] / 255);
    if (!stageClip && (!alpha || !isVisible)) {
        return 0;
    }

    // matrix
    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());

    // pre render
    var obj       = this.preRender(ctx, m2, rColorTransform, stage, visible);
    var preCtx    = obj.preCtx;
    var preMatrix = obj.preMatrix;
    var m3        = this.$multiplicationMatrix(stage.getMatrix(), preMatrix);
    preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var textCacheKey = [];
    var variables    = this.variables;
    var text         = variables.text;
    var variable     = variables.variable;
    if (variable) {
        var parent = this.getParent();
        text       = parent.getProperty(variable);
        if (text === undefined) {
            text = variables.text;
        }
    }

    if (typeof text === "number") {
        text += "";
    }

    var html = variables.html;
    if (html && typeof text === "string") {
        if (text.indexOf("<sbr />") !== -1) {
            text = text.replace(new RegExp("<sbr />", "gi"), "\n");
        }
        if (text.indexOf("<b>") !== -1) {
            text = text.replace(new RegExp("<b>", "gi"), "");
            text = text.replace(new RegExp("</b>", "gi"), "");
        }

        var span = this.$document.createElement("span");
        span.innerHTML = text;

        var tags = span.getElementsByTagName("p");
        var domLength = tags.length;
        if (domLength) {
            var tagData = [];
            for (var d = 0; d < domLength; d++) {
                tagData[d] = tags[d];
            }
            text = tagData;
        } else {
            text = span.innerText;
        }
    }

    preCtx.textBaseline = "top";
    if (text === undefined) {
        text = "";
    }

    var bounds = this.getBounds();
    var xMax   = bounds.xMax;
    var xMin   = bounds.xMin;
    var yMax   = bounds.yMax;
    var yMin   = bounds.yMin;
    var W      = this.$abs(this.$ceil(xMax - xMin));
    var H      = this.$abs(this.$ceil(yMax - yMin));

    // auto size
    var i, txtObj, measureText;

    var scale          = stage.getScale();
    var autoSize       = variables.autoSize;
    var wordWrap       = variables.wordWrap;
    var splitData      = (typeof text === "string") ? text.split("\n") : text;
    var length         = 0 | splitData.length;
    var txtTotalWidth  = 0;
    var txtTotalHeight = 0;
    var isAutoSize     = false;
    var autoMode       = (typeof autoSize === "string") ? autoSize.toLowerCase() : autoSize;
    switch (autoMode) {
        default:
        case "none":
        case false:
        case 0:
            txtTotalWidth  = W;
            txtTotalHeight = H;
            break;
        case true:
        case 1:
        case "left":
        case "center":
        case "right":
            isAutoSize = true;
            break;
    }

    var fontData = this.getStage().getCharacter(this.fontId);
    if (isAutoSize) {
        if (variables.embedFonts) {
            var CodeTable        = fontData.CodeTable;
            var FontAdvanceTable = fontData.FontAdvanceTable;
            var fontScale        = this.fontScale;
            txtTotalWidth        = 0;
            txtTotalHeight       = (fontData.FontAscent * fontScale) + variables.leading;

            i = 0;
            while (i < length) {
                txtObj = splitData[i];
                i = 0 | i + 1;

                if (typeof txtObj !== "string") {
                    var firstChild = txtObj.firstChild;
                    txtTotalWidth  = this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
                } else {
                    var txtLength = 0 | txtObj.length;
                    var idx = 0;
                    while (idx < txtLength) {
                        var index = CodeTable.indexOf(txtObj[idx].charCodeAt(0));
                        idx = 0 | idx + 1;

                        if (index === -1) {
                            continue;
                        }

                        txtTotalWidth = 0 | (FontAdvanceTable[index] * fontScale) + txtTotalWidth;
                    }
                }
            }
        } else {
            var addH       = (variables.size * 20) + variables.leading;
            txtTotalHeight = (bounds.yMin + 80);
            if (wordWrap) {
                txtTotalWidth = W;

                i = 0;
                while (i < length) {
                    txtObj = splitData[i];
                    i = 0 | i + 1;

                    if (typeof txtObj === "string") {
                        measureText = preCtx.measureText(txtObj);
                        var checkW  = this.$ceil(measureText.width * 20);
                        if (checkW > W) {
                            txtTotalHeight += this.$ceil(this.$ceil(checkW / W) * addH);
                        }
                    }
                }
            } else {
                i = 0;
                while (i < length) {
                    txtObj = splitData[i];
                    i = 0 | i + 1;

                    if (typeof txtObj === "string") {
                        measureText     = preCtx.measureText(txtObj);
                        txtTotalWidth   = this.$max(txtTotalWidth, this.$ceil(measureText.width * 20));
                        txtTotalHeight += addH;
                    }
                }
            }

            txtTotalWidth = 0 | txtTotalWidth ;+ 80;
        }
    }

    var offsetX = 40;
    switch (autoMode) {
        case "center":
            offsetX = this.$ceil((this.$max(txtTotalWidth, W) - this.$min(txtTotalWidth, W)) / 2);
            break;
        case "right":
            offsetX = this.$ceil(this.$max(txtTotalWidth, W) - this.$min(txtTotalWidth, W));
            break;
    }

    W = txtTotalWidth;
    H = txtTotalHeight;

    if (W > 0 && H > 0) {
        var color;

        var isClipDepth = this.isClipDepth || stageClip;
        var rx          = xMin;
        var ry          = yMin;
        var m           = this._matrix;
        if (m) {
            rx = -xMin;
            ry = -yMin;
            var m4 = this.$multiplicationMatrix(preMatrix, [1, 0, 0, 1, xMin, yMin]);
            m3     = this.$multiplicationMatrix(stage.getMatrix(), m4);
            preCtx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);
        }

        // border
        var border = variables.border;
        if (border && !isClipDepth) {
            preCtx.beginPath();
            preCtx.rect(rx - offsetX, ry, W, H);

            color = this.$generateColorTransform(variables.borderColor, rColorTransform);

            textCacheKey[textCacheKey.length] = color;

            preCtx.strokeStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
            preCtx.lineWidth   = this.$min(20, 1 / this.$min(m3[0], m3[3]));
            preCtx.globalAlpha = 1;
            preCtx.fillStyle   = "rgba(0,0,0,0)";

            if (variables.background) {
                color = this.$generateColorTransform(variables.backgroundColor, rColorTransform);
                textCacheKey[textCacheKey.length] = color;
                preCtx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
            }

            preCtx.fill();
            preCtx.stroke();
        }

        var textColor = variables.textColor;
        var objRGBA   = textColor;
        if (typeof textColor === "number") {
            objRGBA = this.$intToRGBA(textColor, 100);
        }

        color         = this.$generateColorTransform(objRGBA, rColorTransform);
        var fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
        textCacheKey[textCacheKey.length] = fillStyle;

        preCtx.fillStyle = fillStyle;

        // font type
        var fontType = "";

        // italic
        if (variables.italic) {
            fontType += "italic ";
        }

        // bold
        if (variables.bold) {
            fontType += "bold ";
        }

        var fontStyle = fontType + variables.size + "px " + variables.font;
        textCacheKey[textCacheKey.length] = fontStyle.replace(/ /g , "_");
        preCtx.font = fontStyle;

        if (this.input !== null) {
            var input    = this.input;
            var fontSize = this.$ceil(variables.size * scale * this.$min(preMatrix[0], preMatrix[3]));

            input.style.font  = fontType + fontSize + "px " + variables.font;
            input.style.color = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";

            var as = variables.onChanged;
            if (as && !input.onchange) {
                var onChanged = function (stage, origin, clip, el)
                {
                    return function ()
                    {
                        if (clip.active) {
                            clip.setProperty("text", el.value);
                            origin.apply(clip, arguments);
                            stage.executeAction();
                        }
                    };
                };
                input.onchange = onChanged(stage, as, this, input);
            }
        }

        if (text && !isClipDepth) {
            preCtx.save();
            preCtx.beginPath();
            preCtx.rect(rx - offsetX, ry, W, (H-40));
            preCtx.clip();

            if (this.inputActive === false) {
                if (variables.embedFonts) {
                    this.renderOutLine(preCtx, fontData, splitData, m3, rx - offsetX, W, fillStyle);
                } else {
                    this.renderText(preCtx, splitData, m3, fontType, fillStyle);
                }
            }

            preCtx.restore();
            preCtx.globalAlpha = 1;
        }

        textCacheKey[textCacheKey.length] = text.replace(/ /g , "_");
        textCacheKey[textCacheKey.length] = this.getCharacterId();

        var cacheKey = this.$cacheStore.generateKey(
            textCacheKey.join("_"), m3, rColorTransform
        );

        obj.cacheKey = cacheKey;
        if (obj.isFilter || obj.isBlend) {
            this.postRender(ctx, matrix, rColorTransform, stage, obj);
        }

        return cacheKey;
    }

    return null;
};

/**
 * @param ctx
 * @param fontData
 * @param splitData
 * @param matrix
 * @param offset
 * @param width
 * @param fillStyle
 */
TextField.prototype.renderOutLine = function (ctx, fontData, splitData, matrix, offset, width, fillStyle)
{
    var idx, index;

    var variables        = this.variables;
    var fontScale        = this.fontScale;
    var leading          = (fontData.FontAscent + fontData.FontDescent) * fontScale;
    var rightMargin      = variables.rightMargin * fontScale;
    var leftMargin       = variables.leftMargin * fontScale;
    var indent           = variables.indent * fontScale;
    var align            = variables.align;
    var txt              = "";
    var CodeTable        = fontData.CodeTable;
    var GlyphShapeTable  = fontData.GlyphShapeTable;
    var FontAdvanceTable = fontData.FontAdvanceTable;
    var YOffset          = (fontData.FontAscent * fontScale);
    var cacheYOffset     = YOffset;
    var wordWrap         = variables.wordWrap;
    var multiline        = variables.multiline;
    var bounds           = this.getBounds();
    var areaWidth        = (this.$ceil((bounds.xMax) - (bounds.xMin)) - leftMargin - rightMargin);

    var length = 0 | splitData.length;
    var i = 0;
    while (i < length) {
        var obj = splitData[i];
        i = 0 | i + 1;

        var XOffset   = offset;
        var textWidth = 0;
        var txtLength = 0;
        var firstChild;
        if (typeof obj !== "string") {
            firstChild = obj.firstChild;
            if (!firstChild) {
                continue;
            }

            textWidth = 0 | this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
            txt       = obj.innerText;
            align     = variables.align;
            if (obj.align) {
                align = obj.align;
            }
        } else {
            txt       = obj;
            txtLength = txt.length;
            idx = 0;
            while (idx < txtLength) {
                index = CodeTable.indexOf(txt[idx].charCodeAt(0));
                idx   = 0 | idx + 1;

                if (index === -1) {
                    continue;
                }

                textWidth = 0 | (FontAdvanceTable[index] * fontScale) + textWidth;
            }
        }

        if (align === "right") {
            XOffset = 0 | (XOffset + width - rightMargin - textWidth - 40);
        } else if (align === "center") {
            XOffset = 0 | (XOffset + indent + leftMargin + 40 + ((width - indent - leftMargin - rightMargin - textWidth) / 2));
        } else {
            XOffset = 0 | (XOffset + indent + leftMargin + 40);
        }

        var cacheXOffset = XOffset;
        var wordWidth    = 0;
        if (typeof obj !== "string") {
            var gridData = {
                XOffset:      XOffset,
                YOffset:      YOffset,
                cacheXOffset: cacheXOffset,
                cacheYOffset: cacheYOffset,
                wordWidth:    wordWidth,
                addXOffset:   0,
                size:         firstChild.size,
                areaWidth:    areaWidth,
                matrix:       matrix
            };

            this.renderDomOutLine(
                ctx, firstChild, gridData, fillStyle,
                CodeTable, FontAdvanceTable, GlyphShapeTable
            );
        } else {
            for (idx = 0; idx < txtLength; idx++) {
                index = CodeTable.indexOf(txt[idx].charCodeAt(0));
                if (index === -1) {
                    continue;
                }

                var addXOffset = FontAdvanceTable[index] * fontScale;
                if (wordWrap && multiline) {
                    if (wordWidth + addXOffset > areaWidth) {
                        XOffset   = cacheXOffset;
                        YOffset  += cacheYOffset;
                        wordWidth = 0;
                    }
                }

                var m2 = this.$multiplicationMatrix(matrix, [fontScale, 0, 0, fontScale, XOffset, YOffset]);
                ctx.setTransform(m2[0],m2[1],m2[2],m2[3],m2[4],m2[5]);
                this.renderGlyph(GlyphShapeTable[index], ctx);

                XOffset   = XOffset   + addXOffset;
                wordWidth = wordWidth + addXOffset;
            }
        }

        YOffset = YOffset + leading;
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 * @param fillStyle
 * @param CodeTable
 * @param FontAdvanceTable
 * @param GlyphShapeTable
 */
TextField.prototype.renderDomOutLine = function (
    ctx, child, gridData, fillStyle,
    CodeTable, FontAdvanceTable, GlyphShapeTable
) {
    var variables  = this.variables;
    var wordWrap   = variables.wordWrap;
    var multiline  = variables.multiline;
    var stage      = this.getStage();
    var fonts      = stage.fonts;
    var face       = child.face;
    var fontData   = fonts[face];
    var codeTable  = CodeTable;
    var faTable    = FontAdvanceTable;
    var shapeTable = GlyphShapeTable;
    var color      = fillStyle;
    if (fontData) {
        codeTable  = fontData.CodeTable;
        faTable    = fontData.FontAdvanceTable;
        shapeTable = fontData.GlyphShapeTable;
    }

    if (child.color) {
        color = child.color;
    }

    if (child.size) {
        gridData.size = child.size;
    }

    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.renderDomOutLine(
                ctx, node, gridData, color,
                codeTable, faTable, shapeTable
            );
        } else {
            var size = gridData.size;
            var fontScale = size / 1024;
            var sTable;
            var values = node.nodeValue;
            if (!values) {
                continue;
            }
            var vLength = values.length;
            for (var idx = 0; idx < vLength; idx++) {
                var txt = values[idx];
                var index = codeTable.indexOf(txt.charCodeAt(0));
                if (index === -1) {
                    index = CodeTable.indexOf(txt.charCodeAt(0));
                    if (index === -1) {
                        continue;
                    }
                    color = fillStyle;
                    gridData.addXOffset = FontAdvanceTable[index] * fontScale;
                    sTable = GlyphShapeTable;
                } else  {
                    gridData.addXOffset = faTable[index] * fontScale;
                    sTable = shapeTable;
                }

                if (wordWrap && multiline) {
                    if (gridData.wordWidth + gridData.addXOffset > gridData.areaWidth) {
                        gridData.XOffset = gridData.cacheXOffset;
                        gridData.YOffset += gridData.cacheYOffset;
                        gridData.wordWidth = 0;
                    }
                }

                var m2 = [fontScale, 0, 0, fontScale, gridData.XOffset, gridData.YOffset];
                var m3 = this.$multiplicationMatrix(gridData.matrix, m2);
                ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
                ctx.fillStyle = color;
                this.renderGlyph(sTable[index], ctx);
                gridData.XOffset   += gridData.addXOffset;
                gridData.wordWidth += gridData.addXOffset;
            }
        }
    }
};

/**
 * @param child
 * @param CodeTable
 * @param FontAdvanceTable
 * @returns {number}
 */
TextField.prototype.getDomWidth = function (child, CodeTable, FontAdvanceTable)
{
    var fontScale = this.fontScale;
    var stage     = this.getStage();
    var fonts     = stage.fonts;
    var width     = 0;
    var face      = child.face;
    var fontData  = fonts[face];
    var codeTable = CodeTable;
    var faTable   = FontAdvanceTable;
    if (fontData) {
        codeTable = fontData.CodeTable;
        faTable   = fontData.FontAdvanceTable;
    }

    var childNodes = child.childNodes;
    var length     = childNodes.length;

    var i = 0;
    while (i < length) {
        var node = childNodes[i];
        i = 0 | i + 1;

        if (node instanceof HTMLFontElement) {
            var domWidth = 0 | this.getDomWidth(node, codeTable, faTable);
            width = 0 | width + domWidth;
        } else {
            var values = node.nodeValue;
            if (!values) {
                continue;
            }

            var vLength = values.length;
            var idx = 0;
            while (idx < vLength) {
                var txt = values[idx];
                idx = 0 | idx + 1;

                var index = codeTable.indexOf(txt.charCodeAt(0));
                if (index === -1) {
                    index = CodeTable.indexOf(txt.charCodeAt(0));
                    if (index === -1) {
                        continue;
                    }

                    width = 0 | (FontAdvanceTable[index] * fontScale) + width;
                } else  {
                    width = 0 | (faTable[index] * fontScale) + width;
                }
            }
        }
    }

    return width;
};

/**
 * @param records
 * @param ctx
 */
TextField.prototype.renderGlyph = function (records, ctx)
{
    if (!records.data) {
        records.data = this.$vtc.convert(records);
    }

    var shapes = records.data;
    var length = 0 | shapes.length;

    var idx = 0;
    while (idx < length) {
        var styleObj = shapes[idx];
        idx = 0 | idx + 1;

        var cmd = styleObj.cmd;
        ctx.beginPath();
        cmd(ctx);
        ctx.fill();
    }
};

/**
 * @param ctx
 * @param splitData
 * @param matrix
 * @param fontType
 * @param fillStyle
 */
TextField.prototype.renderText = function (ctx, splitData, matrix, fontType, fillStyle, _x)
{
    var variables   = this.variables;
    var wordWrap    = variables.wordWrap;
    var multiline   = variables.multiline;
    var leading     = variables.leading / 20;
    var rightMargin = variables.rightMargin / 20;
    var leftMargin  = variables.leftMargin / 20;
    var indent      = variables.indent / 20;
    var align       = variables.align;
    var bounds      = this.getBounds();
    var xMax        = bounds.xMax / 20;
    var xMin        = bounds.xMin / 20;
    var width       = this.$ceil(xMax - xMin);

    var m2     = [matrix[0] * 20, matrix[1] * 20, matrix[2] * 20, matrix[3] * 20, matrix[4], matrix[5]];
    var xScale = this.$sqrt(m2[0] * m2[0] + m2[1] * m2[1]);
    var yScale = this.$sqrt(m2[2] * m2[2] + m2[3] * m2[3]);
    var scale  = this.$max(xScale, yScale);
    ctx.setTransform(scale,m2[1],m2[2],scale,m2[4],m2[5]);

    var dx = xMin;
    var dy = (bounds.yMin / 20) + 2;
    if (align === "right") {
        ctx.textAlign = "end";
        dx += width - rightMargin - 2;
    } else if (align === "center") {
        ctx.textAlign = "center";
        dx += leftMargin + indent + ((width - leftMargin - indent - rightMargin) / 2);
    } else {
        dx += 2 + leftMargin + indent;
    }

    bounds        = this.getBounds(m2);
    var areaWidth = (bounds.xMax - bounds.xMin) - ((leftMargin - rightMargin) * xScale);
    areaWidth    /= scale;

    var size   = variables.size;
    var length = 0 | splitData.length;
    var i      = 0;
    while (i < length) {
        var txt = "";
        var obj = splitData[i];
        i = 0 | i + 1;

        if (typeof obj !== "string") {
            txt = obj.innerText;
        } else {
            txt = obj;
        }

        if (txt === "") {
            dy += leading + size;
            continue;
        }

        var measureText   = ctx.measureText(txt);
        var txtTotalWidth = measureText.width;
        if (typeof obj === "string") {
            if (wordWrap || multiline) {
                if (txtTotalWidth > areaWidth) {
                    var txtLength = 0 | txt.length;
                    var joinTxt   = "";
                    var joinWidth = 2 * scale;

                    var t = 0;
                    while (t < txtLength) {
                        var txtOne  = txt[t];
                        var textOne = ctx.measureText(txtOne);
                        joinWidth  += textOne.width;
                        joinTxt    += txtOne;
                        var nextOne = txt[t+1];
                        if (nextOne) {
                            textOne   = ctx.measureText(nextOne);
                            joinWidth = joinWidth + textOne.width;
                        }

                        if (joinWidth > areaWidth || (t + 1) === txtLength) {
                            ctx.fillText(joinTxt, dx, dy, this.$ceil(joinWidth));
                            joinWidth = 2 * scale;
                            joinTxt   = "";
                            dy        = dy + leading + size;
                        } else if (nextOne) {
                            joinWidth = joinWidth - textOne.width;
                        }

                        t = 0 | t + 1;
                    }
                } else {
                    ctx.fillText(txt, dx, dy, txtTotalWidth);
                    dy = dy + leading + size;
                }
            } else {
                ctx.fillText(txt, dx, dy, txtTotalWidth);
                dy = dy + leading + size;
            }
        } else {
            var firstChild = obj.firstChild;
            var gridData = {
                startDx:       dx,
                dx:            dx,
                cloneDy:       dy,
                dy:            dy,
                color:         fillStyle,
                fontType:      fontType,
                fillStyle:     fillStyle,
                size:          size,
                scale:         scale,
                originSize:    size,
                txtTotalWidth: txtTotalWidth,
                areaWidth:     areaWidth,
                joinWidth:     0,
                joinTxt:       "",
                offset:        0,
                offsetArray:   []
            };

            if (gridData.offsetArray.length === 0) {
                this.offsetDomText(ctx, firstChild, gridData);
            }

            // reset
            gridData.dx        = dx;
            gridData.dy        = dy;
            gridData.cloneDy   = dy;
            gridData.size      = size;
            gridData.joinWidth = 0;
            gridData.joinTxt   = "";
            gridData.offset    = 0;

            if (gridData.offsetArray.length > 0) {
                var offsetY = gridData.offsetArray[0];
                if (offsetY) {
                    gridData.dy     += offsetY;
                    gridData.cloneDy = gridData.dy;
                }
            }

            this.renderDomText(ctx, firstChild, gridData);

            dy = gridData.dy;
        }
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 */
TextField.prototype.offsetDomText = function(ctx, child, gridData)
{
    var variables = this.variables;
    var wordWrap  = variables.wordWrap;
    var multiline = variables.multiline;
    var leading   = variables.leading / 20;
    if (child.face) {
        gridData.face = child.face;
    }

    if (child.size) {
        var size = child.size|0;
        var changeSize = gridData.originSize - size;
        if (changeSize) {
            gridData.dy += changeSize;
            if (changeSize > 0) {
                gridData.dy -= 4;
            } else {
                var offsetArray = gridData.offsetArray;
                var offset = gridData.offset;
                var offsetSize = offsetArray[offset];
                if (offsetSize) {
                    offsetArray[offset] = this.$max(offsetSize, ~changeSize);
                } else {
                    offsetArray[offset] = ~changeSize;
                }
                gridData.dy += 6;
            }
        }
        gridData.size = size;
    }

    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.offsetDomText(ctx, node, gridData);
        } else {
            var txt = node.nodeValue;
            if (wordWrap && multiline) {
                if (gridData.txtTotalWidth > gridData.areaWidth) {
                    var txtLength = txt.length;
                    for (var t = 0; t < txtLength; t++) {
                        var textOne = ctx.measureText(txt[t]);
                        gridData.joinWidth += textOne.width;
                        gridData.joinTxt += txt[t];
                        var isOver = (gridData.joinWidth > gridData.areaWidth);
                        if (isOver || (t + 1) === txtLength) {
                            if ((gridData.dx + textOne.width) > gridData.areaWidth) {
                                gridData.dx = gridData.startDx;
                                gridData.dy += leading + gridData.size;
                                gridData.cloneDy = gridData.dy;
                                gridData.joinWidth = 2 * gridData.scale;
                                isOver = false;
                                gridData.offset++;
                            }

                            gridData.joinTxt = "";
                            if (isOver) {
                                gridData.dx = gridData.startDx;
                                gridData.joinWidth = 22 * gridData.scale;
                                gridData.dy += leading + gridData.size;
                                gridData.cloneDy = gridData.dy;
                                gridData.offset++;
                            }
                        }
                    }
                } else {
                    gridData.dy += leading + gridData.size;
                    gridData.cloneDy = gridData.dy;
                    gridData.offset++;
                }
            } else {
                gridData.dy += leading + gridData.size;
                gridData.cloneDy = gridData.dy;
                gridData.offset++;
            }

            var mText = ctx.measureText(txt);
            gridData.dx += mText.width;
            gridData.size = gridData.originSize;
            gridData.dy = gridData.cloneDy;
        }
    }
};

/**
 * @param ctx
 * @param child
 * @param gridData
 */
TextField.prototype.renderDomText = function(ctx, child, gridData)
{
    var variables = this.variables;

    var wordWrap  = variables.wordWrap;
    var multiline = variables.multiline;
    var leading   = variables.leading / 20;

    if (child.face) {
        gridData.face = child.face;
    }

    if (child.color) {
        gridData.color = child.color;
    }

    if (child.size) {
        var size = 0 | child.size;
        var changeSize = 0 | gridData.originSize - size;
        if (changeSize) {
            gridData.dy += changeSize;
            if (changeSize > 0) {
                gridData.dy -= 4;
            } else {
                gridData.dy += 8;
            }
        }
        gridData.size = size;
    }

    var offsetY;
    var childNodes = child.childNodes;
    var length = childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = childNodes[i];
        if (node instanceof HTMLFontElement) {
            this.renderDomText(ctx, node, gridData);
        } else {
            ctx.fillStyle = gridData.color;
            ctx.font = gridData.fontType + gridData.size + "px " + gridData.face;

            var text = node.nodeValue;
            var splits = text.split("\n");
            var sLen= splits.length;
            for (var idx = 0; idx < sLen; idx++) {
                gridData.dx = gridData.startDx;
                var txt = splits[idx];

                if (wordWrap && multiline) {
                    if (gridData.txtTotalWidth > gridData.areaWidth) {
                        var txtLength = txt.length;
                        for (var t = 0; t < txtLength; t++) {
                            var textOne = ctx.measureText(txt[t]);
                            gridData.joinWidth += textOne.width;
                            gridData.joinTxt += txt[t];
                            var isOver = (gridData.joinWidth > gridData.areaWidth);
                            if (isOver || (t + 1) === txtLength) {
                                if ((gridData.dx + textOne.width) > gridData.areaWidth) {
                                    isOver = 0;
                                    gridData.joinWidth = gridData.size;
                                    gridData.dx = gridData.startDx;
                                    gridData.offset++;
                                    gridData.dy += leading + gridData.size;
                                    if (gridData.offsetArray.length > 0) {
                                        offsetY = gridData.offsetArray[gridData.offset];
                                        if (offsetY) {
                                            gridData.dy += offsetY;
                                        }
                                    }
                                    gridData.cloneDy = gridData.dy;
                                }

                                ctx.fillText(gridData.joinTxt, gridData.dx, gridData.dy, _ceil(gridData.joinWidth));
                                gridData.joinTxt = "";
                                if (isOver) {
                                    gridData.dx = gridData.startDx;
                                    gridData.joinWidth = gridData.size;
                                    gridData.offset++;
                                    gridData.dy += leading + gridData.size;
                                    if (gridData.offsetArray.length > 0) {
                                        offsetY = gridData.offsetArray[gridData.offset];
                                        if (offsetY) {
                                            gridData.dy += offsetY;
                                        }
                                    }
                                    gridData.cloneDy = gridData.dy;
                                }
                            }
                        }
                    } else {
                        ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
                        gridData.offset++;
                        gridData.dy += leading + gridData.size;
                        if (gridData.offsetArray.length > 0) {
                            offsetY = gridData.offsetArray[gridData.offset];
                            if (offsetY) {
                                gridData.dy += offsetY;
                            }
                        }
                        gridData.cloneDy = gridData.dy;
                    }
                } else {
                    ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
                    gridData.offset++;
                    gridData.dy += leading + gridData.size;
                    if (gridData.offsetArray.length > 0) {
                        offsetY = gridData.offsetArray[gridData.offset];
                        if (offsetY) {
                            gridData.dy += offsetY;
                        }
                    }
                    gridData.cloneDy = gridData.dy;
                }

                var mText = ctx.measureText(txt);
                gridData.dx += mText.width;
                gridData.color = gridData.fillStyle;
                gridData.size = gridData.originSize;
                gridData.dy = gridData.cloneDy;
            }
        }
    }
};

/**
 * @param stage
 * @param clipEvent
 */
TextField.prototype.putFrame = function (stage, clipEvent)
{
    this.active = true;
    if (this.inputActive === false) {
        this.dispatchEvent(clipEvent, stage);
    }
};

/**
 * @param ctx
 * @param matrix
 * @param stage
 * @param x
 * @param y
 * @returns {boolean}
 */
TextField.prototype.renderHitTest = function (ctx, matrix, stage, x, y)
{
    var bounds = this.getBounds();
    var xMax   = bounds.xMax;
    var xMin   = bounds.xMin;
    var yMax   = bounds.yMax;
    var yMin   = bounds.yMin;
    var width  = this.$ceil(xMax - xMin);
    var height = this.$ceil(yMax - yMin);

    var m2 = this.$multiplicationMatrix(matrix, this.getMatrix());
    var m3 = this.$multiplicationMatrix(stage.getMatrix(), m2);

    ctx.setTransform(m3[0],m3[1],m3[2],m3[3],m3[4],m3[5]);

    var m = this._matrix;
    if (m) {
        xMin = -xMin;
        yMin = -yMin;
        var m4 = this.$multiplicationMatrix(m2, [1, 0, 0, 1, xMin, yMin]);
        var m5 = this.$multiplicationMatrix(stage.getMatrix(), m4);
        ctx.setTransform(m5[0],m5[1],m5[2],m5[3],m5[4],m5[5]);
    }

    ctx.beginPath();
    ctx.rect(xMin, yMin, width, height);

    return ctx.isPointInPath(x, y);
};

// dummy
TextField.prototype.initFrame  = function () {};
TextField.prototype.addActions = function () {};
TextField.prototype.getTags    = function () { return undefined; };
var TextFieldAutoSize = function () {};
var TextFieldType = function () {};
/**
 * @constructor
 */
var TextFormat = function ()
{
    this.align         = "left";
    this.font          = "'HiraKakuProN-W3', 'sans-serif'";
    this.size          = 8;
    this.color         = {R: 0, G: 0, B: 0, A: 1};
    this.bold          = 0;
    this.italic        = 0;
    this.underline     = 0;
    this.bullet        = 0;
    this.kerning       = 0;
    this.blockIndent   = 0;
    this.indent        = 0;
    this.leading       = 80;
    this.leftMargin    = 0;
    this.rightMargin   = 0;
    this.letterSpacing = 0;
    this.tabStops      = [];
    this.url           = null;
    this.target        = null;
};
var TextFormatAlign = function () {};
var TextLineMetrics = function () {};
/**
 * @constructor
 */
var TextRecord = function ()
{
    this.color  = null;
    this.matrix = null;
};

/**
 * @returns {*}
 */
TextRecord.prototype.getColor = function ()
{
    return this.color;
};

/**
 * @param color
 */
TextRecord.prototype.setColor = function (color)
{
    this.color = color;
};

/**
 * @returns {*}
 */
TextRecord.prototype.getMatrix = function ()
{
    return this.matrix;
};

/**
 * @param matrix
 */
TextRecord.prototype.setMatrix = function (matrix)
{
    this.matrix = matrix;
};

/**
 * @returns {Array}
 */
TextRecord.prototype.getData = function ()
{
    return this.data;
};

/**
 * @param data
 */
TextRecord.prototype.setData = function (data)
{
    this.data = data;
};
var TextRenderer = function () {};
/**
 * @constructor
 */
var TextSnapshot = function ()
{
    this.charCount = 0;
};

/**
 * @param beginIndex
 * @param textToFind
 * @param caseSensitive
 */
TextSnapshot.prototype.findText = function (beginIndex, textToFind, caseSensitive)
{

};

/**
 * @param beginIndex
 * @param endIndex
 */
TextSnapshot.prototype.getSelected = function (beginIndex, endIndex)
{

};

/**
 * @param includeLineEndings
 */
TextSnapshot.prototype.getSelectedText = function (includeLineEndings)
{

};

TextSnapshot.prototype.getText = function (beginIndex, endIndex, includeLineEndings)
{

};

/**
 * @param beginIndex
 * @param endIndex
 */
TextSnapshot.prototype.getTextRunInfo = function (beginIndex, endIndex)
{

};

/**
 * @param x
 * @param y
 * @param maxDistance
 */
TextSnapshot.prototype.hitTestTextNearPos = function (x, y, maxDistance)
{

};

/**
 * @param hexColor
 */
TextSnapshot.prototype.setSelectColor = function (hexColor)
{

};

/**
 * @param beginIndex
 * @param endIndex
 * @param select
 */
TextSnapshot.prototype.setSelected = function (beginIndex, endIndex, select)
{

};
var AVNetworkingParams = function () {};
var AVURLLoader = function () {};
var AVURLStream = function () {};
var Camera = function () {};
var ID3Info = function () {};
var Microphone = function () {};
/**
 * @constructor
 */
var Sound = function ()
{
    this.variables  = {};
    this.sounds     = [];
    this.volume     = 100;
    this.pan        = 0;
    this.transform  = {ll: 100, lr: 100, rl: 100, rr: 100};
    this.isStreamin = false;
    this.movieClip  = null;
};

/**
 * properties
 */
Object.defineProperties(Sound.prototype,
    {
        onLoad: {
            get: function () {
                return this.getProperty("onLoad");
            },
            set: function (onLoad) {
                this.setProperty("onLoad", onLoad);
            }
        },
        onSoundComplete: {
            get: function () {
                return this.getProperty("onSoundComplete");
            },
            set: function (onSoundComplete) {
                this.setProperty("onSoundComplete", onSoundComplete);
            }
        }
    });

/**
 * @param name
 * @returns {*}
 */
Sound.prototype.getProperty = function (name)
{
    return this.variables[name];
};

/**
 * @param name
 * @param value
 */
Sound.prototype.setProperty = function (name, value)
{
    this.variables[String(name)] = value;
};

/**
 * @param currentTime
 * @param loopCount
 */
Sound.prototype.start = function (currentTime, loopCount)
{
    var sounds = this.sounds;

    var init = function (audio, time)
    {
        return function ()
        {
            audio.currentTime = time;
        };
    };

    var end = function (audio, sound)
    {
        return function ()
        {
            var volume = sound.volume;
            audio.loopCount--;
            if (audio.loopCount > 0) {
                audio.volume = volume / 100;
                audio.currentTime = 0;
                audio.play();
            }

            var onSoundComplete = sound.onSoundComplete;
            if (onSoundComplete) {
                onSoundComplete.apply(sound, [true]);
            }
        };
    };

    var audio;
    for (var id in sounds) {
        if (!sounds.hasOwnProperty(id)) {
            continue;
        }
        audio = sounds[id];
        audio.load();

        if (currentTime) {
            audio.addEventListener("canplay", init(audio, currentTime));
        }
        if (typeof loopCount === "number" && loopCount > 0) {
            audio.loopCount = loopCount;
            audio.addEventListener("ended", end(audio, this));
        }

        audio.play();
    }
};

/**
 * stop
 */
Sound.prototype.stop = function (id)
{
    var sounds = this.sounds;
    var audio;
    if (id) {
        audio = sounds[id];
        if (audio) {
            audio.pause();
        }
    } else {
        for (var key in sounds) {
            if (!sounds.hasOwnProperty(key)) {
                continue;
            }
            audio = sounds[key];
            audio.pause();
        }
    }
};

/**
 * @param url
 * @param bool
 */
Sound.prototype.loadSound = function (url, bool)
{
    this.isStreamin = bool;

    var sounds = this.sounds;
    var audio  = this.$document.createElement("audio");
    audio.src  = url;
    sounds[0]  = audio;

    var onLoad = (function (audio, sound)
    {
        return function() {
            audio.load();
            audio.preload = "auto";
            audio.autoplay = false;
            audio.loop = false;
            var onLoad = sound.onLoad;
            if (typeof onLoad === "function") {
                onLoad.apply(sound, [true]);
            }
        };
    })(audio, this);
    audio.addEventListener("canplaythrough", onLoad);

    var onError = (function (audio, sound)
    {
        return function() {
            var onLoad = sound.onLoad;
            if (typeof onLoad === "function") {
                onLoad.apply(sound, [false]);
            }
        };
    })(audio, this);
    audio.addEventListener("error", onError);
};

/**
 * @param id
 */
Sound.prototype.attachSound = function (id)
{
    var sounds = this.sounds;
    if (!(id in sounds)) {
        var movieClip    = this.movieClip;
        var stage        = movieClip.getStage();
        var exportAssets = stage.exportAssets;
        if (id in exportAssets) {
            var characterId = exportAssets[id];

            var tag = stage.sounds[characterId];
            if (tag) {
                var audio = this.$document.createElement("audio");
                audio.onload = function ()
                {
                    this.load();
                    this.preload = "auto";
                    this.autoplay = false;
                    this.loop = false;
                };
                audio.src  = tag.base64;
                sounds[id] = audio;
            }
        }
    }
};

/**
 *
 * @returns {number}
 */
Sound.prototype.getVolume = function ()
{
    return this.volume;
};

/**
 *
 * @param volume
 */
Sound.prototype.setVolume = function (volume)
{
    var sounds  = this.sounds;
    this.volume = volume;
    for (var id in sounds) {
        if (!sounds.hasOwnProperty(id)) {
            continue;
        }

        var audio    = sounds[id];
        audio.volume = volume / 100;
    }
};

/**
 * @returns {number|*}
 */
Sound.prototype.getPan = function ()
{
    return this.pan;
};

/**
 * @param pan
 */
Sound.prototype.setPan = function (pan)
{
    this.pan = pan;
};

/**
 * @param object
 */
Sound.prototype.setTransform = function (object)
{
    var transform = this.transform;
    for (var name in object) {
        if (!object.hasOwnProperty(name)) {
            continue;
        }
        switch (name) {
            case "ll":
            case "lr":
            case "rl":
            case "rr":
                transform[name] = object[name];
                break;
        }
    }
};

/**
 * @returns {{ll: number, lr: number, rl: number, rr: number}|*}
 */
Sound.prototype.getTransform = function ()
{
    return this.transform;
};

/**
 * @returns {number}
 */
Sound.prototype.getBytesLoaded = function ()
{
    return 1;
};

/**
 * @returns {number}
 */
Sound.prototype.getBytesTotal = function ()
{
    return 1;
};
var SoundChannel = function () {};
var SoundCodec = function () {};
var SoundLoaderContext = function () {};
var SoundMixer = function () {};
/**
 * @constructor
 */
var SoundTransform = function ()
{
    this._leftToLeft = 0;
    this._leftToRight = 1;
    this._pan = 0;
    this._rightToLeft = 0;
    this._rightToRight = 1;
    this._volume = 1;
};

/**
 * properties
 */
Object.defineProperties(SoundTransform.prototype,
    {
        leftToLeft: {
            get: function () {
                return this.getLeftToLeft();
            },
            set: function (leftToLeft) {
                this.setLeftToLeft(leftToLeft);
            }
        },
        leftToRight: {
            get: function () {
                return this.getLeftToRight();
            },
            set: function (leftToRight) {
                this.setLeftToRight(leftToRight);
            }
        },
        pan: {
            get: function () {
                return this.getPan();
            },
            set: function (pan) {
                this.setPan(pan);
            }
        },
        rightToLeft: {
            get: function () {
                return this.getRightToLeft();
            },
            set: function (rightToLeft) {
                this.setRightToLeft(rightToLeft);
            }
        },
        rightToRight: {
            get: function () {
                return this.getRightToRight();
            },
            set: function (rightToRight) {
                this.setRightToRight(rightToRight);
            }
        },
        volume: {
            get: function () {
                return this.getVolume();
            },
            set: function (volume) {
                this.setVolume(volume);
            }
        }
    });

/**
 * @returns {number}
 */
SoundTransform.prototype.getLeftToLeft = function ()
{
    return this._leftToLeft;
};

/**
 * @param leftToLeft
 */
SoundTransform.prototype.setLeftToLeft = function (leftToLeft)
{
    this._leftToLeft = leftToLeft | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getLeftToRight = function ()
{
    return this._leftToRight;
};

/**
 * @param leftToRight
 */
SoundTransform.prototype.setLeftToRight = function (leftToRight)
{
    this._leftToRight = leftToRight | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getPan = function ()
{
    return this._pan;
};

/**
 * @param pan
 */
SoundTransform.prototype.setPan = function (pan)
{
    this._pan = pan | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getRightToLeft = function ()
{
    return this._rightToLeft;
};

/**
 * @param rightToLeft
 */
SoundTransform.prototype.setRightToLeft = function (rightToLeft)
{
    this._rightToLeft = rightToLeft | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getRightToRight = function ()
{
    return this._rightToRight;
};

/**
 * @param rightToRight
 */
SoundTransform.prototype.setRightToRight = function (rightToRight)
{
    this._rightToRight = rightToRight | 0;
};

/**
 * @returns {number}
 */
SoundTransform.prototype.getVolume = function ()
{
    return this._volume;
};

/**
 * @param volume
 */
SoundTransform.prototype.setVolume = function (volume)
{
    this._volume = volume | 0;
};

/**
 * @param vol
 * @param panning
 */
SoundTransform.prototype.SoundTransform = function (vol, panning)
{
    this.volume = vol | 0;
    this.pan    = panning | 0;
};
var StageVideo = function () {};
var StageVideoAvailability = function () {};
var StageVideoAvailabilityReason = function () {};
var Video = function () {};
var VideoStatus = function () {};
var FileFilter = function () {};
var FileReference = function () {};
var FileReferenceList = function () {};
var GroupSpecifier = function () {};
var LocalConnection = function () {};
var NetConnection = function () {};
var NetGroup = function () {};
var NetGroupInfo = function () {};
var NetGroupReceiveMode = function () {};

var NetGroupReplicationStrategy = function () {};
var NetGroupSendMode = function () {};
var NetGroupSendResult = function () {};
var NetStream = function () {};
var NetStreamAppendBytesAction = function () {};
var NetStreamInfo = function () {};
var NetStreamMulticastInfo = function () {};
var NetStreamPlayOptions = function () {};
var NetStreamPlayTransitions = function () {};
var ObjectEncoding = function () {};
var Responder = function () {};
var SecureSocket = function () {};
var SharedObjectFlushStatus = function () {};
var Socket = function () {};
var URLLoader = function () {};
var URLLoaderDataFormat = function () {};
/**
 * @constructor
 */
var URLRequest = function (url)
{
    this._url = url;
    this._authenticate  = true;
    this._cacheResponse = true;
    this._contentType   = "_application/x-www-form-urlencoded";
    this._data          = null;
};

/**
 * properties
 */
Object.defineProperties(Xml.prototype, {
    url: {
        get: function () {
            return this.getURL();
        },
        set: function (url) {
            this.setURL(url);
        }
    },
    contentType: {
        get: function () {
            return this.getContentType();
        },
        set: function (contentType) {
            this.setContentType(contentType);
        }
    },
    authenticate: {
        get: function () {
            return this.getAuthenticate();
        },
        set: function (authenticate) {
            this.setAuthenticate(authenticate);
        }
    }
});

/**
 * @returns {string}
 */
URLRequest.prototype.getURL = function ()
{
    return this._url;
};

/**
 *  @param url
 */
URLRequest.prototype.setURL = function (url)
{
    this._url = url;
};

/**
 * @returns {string}
 */
URLRequest.prototype.getContentType = function ()
{
    return this._contentType;
};

/**
 * @param contentType
 */
URLRequest.prototype.setContentType = function (contentType)
{
    this._contentType = contentType;
};

/**
 * @returns {boolean}
 */
URLRequest.prototype.getAuthenticate = function ()
{
    return this._authenticate;
};

/**
 * @param authenticate
 */
URLRequest.prototype.setAuthenticate = function (authenticate)
{
    this._authenticate = authenticate;
};

var URLRequestHeader = function () {};
var URLRequestMethod = function () {};
var URLStream = function () {};
var URLVariables = function () {};
var XMLSocket = function () {};
/**
 * @param data
 * @param constantPool
 * @param register
 * @param initAction
 * @constructor
 */
var ActionScript = function (data, constantPool, register, initAction)
{
    this.cache        = [];
    this.params       = [];
    this.constantPool = constantPool || [];
    this.register     = register || [];
    this.variables    = {};
    this.initAction   = (initAction) ? true : false;
    this.scope        = null;
    this.parent       = null;
    this.arg          = null;
    this.version      = 7;
    this.superClass   = null;

    if (data.length) {
        this.initialize(data);
    }

    this.initParam();
};

/**
 * util
 */
ActionScript.prototype = Object.create(Util.prototype);
ActionScript.prototype.constructor = ActionScript;

/**
 * reset
 */
ActionScript.prototype.reset = function ()
{
    this.arg       = null;
    this.variables = {};
    this.initParam();
};

/**
 * initParam
 */
ActionScript.prototype.initParam = function ()
{
    var register = this.register;
    var params   = [];
    var length   = 0 | register.length;

    var i = 0;
    while (i < length) {
        var obj = register[i];
        params[obj.register] = (obj.name === null) ? obj.value : obj.name;
        i = 0 | i + 1;
    }

    this.params = params;
};

/**
 * @param values
 */
ActionScript.prototype.initVariable = function (values)
{
    this.arg      = values;
    var register  = this.register;
    var length    = 0 | register.length;
    var variables = this.variables;

    var key = 0;
    var i   = 0;
    while (i < length) {
        var obj = register[i];
        i = 0 | i + 1;

        if (obj.name === null) {
            continue;
        }

        variables[obj.name] = values[key];
        key = 0 | key + 1;
    }

    this.variables = variables;
    this.initParam();
};

/**
 * @returns {{}}
 */
ActionScript.prototype.getSuperClass = function ()
{
    var superClass = this.superClass;
    if (!superClass) {
        var parent = this.parent;
        if (parent) {
            superClass = parent.getSuperClass();
        }
    }
    return superClass;
};

/**
 * @param name
 * @param value
 */
ActionScript.prototype.setVariable = function (name, value)
{
    var finish = false;
    if (name in this.variables) {
        this.variables[name] = value;
        finish = true;
    }

    if (!finish) {
        var parent = this.parent;
        if (parent) {
            finish = parent.setVariable(name, value);
        }
    }

    return finish;
};

/**
 * @param name
 * @returns {*}
 */
ActionScript.prototype.getVariable = function (name)
{
    var value, parent;
    switch (name) {
        case "this":
            value = this.variables["this"];
            break;
        case "arguments":
            value = this.arg;
            break;
        default:
            value = this.variables[name];
            if (value === undefined) {
                parent = this.parent;
                if (parent) {
                    value = parent.getVariable(name);
                }
            }
            break;
    }
    return value;
};

/**
 * @param value
 * @returns {string}
 */
ActionScript.prototype.valueToString = function (value)
{
    if (typeof value !== "string") {
        value += "";
    }
    return value;
};

/**
 * @param str
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.stringToObject = function(str, mc)
{
    var object = this.getVariable(str);
    if (object === undefined) {
        object = mc.getProperty(str);
    }
    return object;
};

/**
 * @param data
 */
ActionScript.prototype.initialize = function (data)
{
    var asData, register, values, NumParams, payloadLength;

    var isEnd        = false;
    var obj          = {};
    var i            = 0;
    var idx          = 0;
    var cache        = [];
    var indexes      = [];
    var withEndPoint = 0;

    var bitio = new BitIO();
    bitio.setData(data);

    var pBitio   = new BitIO();
    var endPoint = data.length;

    this.initParam();

    while (bitio.byte_offset < endPoint) {
        var startOffset = bitio.byte_offset;
        obj = {};

        if (withEndPoint > 0 && withEndPoint === bitio.byte_offset) {
            withEndPoint        = 0;
            obj.actionCode      = 0x94;
            obj.Size            = 0;
            cache[cache.length] = obj;
            continue;
        }

        var actionCode = bitio.getUI8();
        obj.actionCode = actionCode;

        var payload = null;
        if (actionCode >= 0x80) {
            payloadLength = bitio.getUI16();
            payload       = bitio.getData(payloadLength);

            pBitio.setData(payload);
            pBitio.setOffset(0, 0);
        }

        switch (actionCode) {
            // GotoFrame
            case 0x81:
                obj.frame = 0 | pBitio.getUI16() + 1;
                break;
            // WaitForFrame
            case 0x8A:
                obj.frame     = pBitio.getUI16();
                obj.skipCount = pBitio.getUI8();
                break;
            // SetTarget
            case 0x8B:
                obj.targetName = pBitio.getDataUntil("\0");
                break;
            // GoToLabel
            case 0x8C:
                obj.label = pBitio.getDataUntil("\0");
                break;
            case 0x83:
                var len = payload.length - 1;
                var urls = [[]];

                idx = 0;
                i   = 0;
                while (i < len) {
                    var str = this.$fromCharCode(payload[i]);
                    i  = 0 | i + 1;

                    if (payload[i] === 0) {
                        idx = 0 | idx + 1;
                        urls[idx] = [];
                        continue;
                    }
                    urls[idx] += str;
                }

                var urlString = urls[0];
                if (typeof urlString === "string") {
                    var splitUrl = urlString.split("?");
                    if (2 in splitUrl) {
                        urlString  = splitUrl[0];
                        urlString += "?" + splitUrl[1];

                        var paramLength = 0 | splitUrl.length;
                        i = 2;
                        while (i < paramLength) {
                            urlString += "&" + splitUrl[i];
                            i = 0 | i + 1;
                        }
                    }
                }

                obj.url    = urlString;
                obj.target = urls[1];
                break;
            // Push
            case 0x96:
                values = [];
                while (pBitio.byte_offset < payloadLength) {
                    var type = pBitio.getUI8();
                    switch (type) {
                        case 0: // String
                            values[values.length] = String(pBitio.getDataUntil("\0"));
                            break;
                        case 1: // Float
                            values[values.length] = pBitio.getFloat32();
                            break;
                        case 2: // null
                            values[values.length] = null;
                            break;
                        case 3: // undefined
                            values[values.length] = undefined;
                            break;
                        case 4: // RegisterNumber
                            values[values.length] = {"key": pBitio.getUI8()};
                            break;
                        case 5: // Boolean
                            values[values.length] = (pBitio.getUI8()) ? true : false;
                            break;
                        case 6: // Double
                            values[values.length] = pBitio.getFloat64();
                            break;
                        case 7: // Integer
                            values[values.length] = pBitio.getUI32();
                            break;
                        case 8: // Constant8
                            values[values.length] = this.constantPool[pBitio.getUI8()];
                            break;
                        case 9: // Constant16
                            values[values.length] = this.constantPool[pBitio.getUI16()];
                            break;
                        default:
                            break;
                    }
                }
                obj.values = values;
                break;
            // If
            case 0x9D:
                obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
                break;
            // Jump
            case 0x99:
                obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
                break;
            // GetURL2
            case 0x9A:
                obj.LoadVariablesFlag = pBitio.getUIBits(1); // 0=none, 1=LoadVariables
                obj.LoadTargetFlag    = pBitio.getUIBits(1); // 0=web,  1=Sprite
                pBitio.getUIBits(4); // Reserved
                obj.SendVarsMethod    = pBitio.getUIBits(2); // 0=NONE, 1=GET, 2=POST
                break;
            // GoToFrame2
            case 0x9F:
                pBitio.getUIBits(6); // Reserved
                obj.SceneBiasFlag = pBitio.getUIBit();
                obj.PlayFlag      = pBitio.getUIBit();// 0=stop, 1=play
                if (obj.SceneBiasFlag === 1) {
                    obj.SceneBias = pBitio.getUI16();
                }
                break;
            // WaitForFrame2
            case 0x8D:
                obj.skipCount = pBitio.getUI8();
                break;
            // ConstantPool
            case 0x88:
                var count = pBitio.getUI16();
                var constantPool = [];
                if (count > 0) {
                    while (count) {
                        count = 0 | count - 1;
                        constantPool[constantPool.length] = pBitio.getDataUntil("\0");
                    }
                }

                obj.constantPool  = constantPool;
                this.constantPool = constantPool;
                break;
            // ActionDefineFunction
            case 0x9b:
                obj.FunctionName = pBitio.getDataUntil("\0");

                NumParams = pBitio.getUI16();
                register  = [];
                if (NumParams > 0) {
                    idx = 1;
                    while (NumParams) {
                        NumParams = 0 | NumParams - 1;
                        register[register.length] = {
                            register: idx,
                            name:     pBitio.getDataUntil("\0"),
                            value:    null
                        };
                    }
                }

                asData = bitio.getData(pBitio.getUI16());
                obj.ActionScript = new ActionScript(asData, this.constantPool, register, this.initAction);

                break;
            // ActionWith
            case 0x94:
                obj.Size     = pBitio.getUI16();
                withEndPoint = obj.Size + bitio.byte_offset;
                break;
            // ActionStoreRegister
            case 0x87:
                obj.RegisterNumber = pBitio.getUI8();
                break;
            // SWF 7 ***********************************
            // ActionDefineFunction2
            case 0x8e:
                register = [];
                values   = [];

                obj.FunctionName          = pBitio.getDataUntil("\0");
                NumParams                 = pBitio.getUI16();
                var RegisterCount         = pBitio.getUI8();
                obj.PreloadParentFlag     = pBitio.getUIBits(1);
                obj.PreloadRootFlag       = pBitio.getUIBits(1);
                obj.SuppressSuperFlag     = pBitio.getUIBits(1);
                obj.PreloadSuperFlag      = pBitio.getUIBits(1);
                obj.SuppressArgumentsFlag = pBitio.getUIBits(1);
                obj.PreloadArgumentsFlag  = pBitio.getUIBits(1);
                obj.SuppressThisFlag      = pBitio.getUIBits(1);
                obj.PreloadThisFlag       = pBitio.getUIBits(1);
                pBitio.getUIBits(7); // Reserved
                obj.PreloadGlobalFlag     = pBitio.getUIBits(1);

                if (obj.PreloadThisFlag) {
                    values[values.length] = "this";
                }

                if (obj.PreloadArgumentsFlag) {
                    values[values.length] = "arguments";
                }

                if (obj.PreloadSuperFlag) {
                    values[values.length] = "super";
                }

                if (obj.PreloadRootFlag) {
                    values[values.length] = "_root";
                }

                if (obj.PreloadParentFlag) {
                    values[values.length] = "_parent";
                }

                if (obj.PreloadGlobalFlag) {
                    values[values.length] = "_global";
                }

                idx = 1;
                while ( idx < RegisterCount) {
                    var rIdx = idx - 1;
                    if (!(rIdx in values)) {
                        idx = 0 | idx + 1;
                        continue;
                    }

                    register[register.length] = {
                        register: idx,
                        name:     null,
                        value:    values[rIdx]
                    };

                    idx = 0 | idx + 1;
                }

                if (NumParams > 0) {
                    while (NumParams) {
                        NumParams = 0 | NumParams - 1;
                        var Register  = pBitio.getUI8();
                        var ParamName = pBitio.getDataUntil("\0");
                        register[register.length] = {
                            register: Register,
                            name:     ParamName,
                            value:    null
                        };
                    }
                }

                asData = bitio.getData(pBitio.getUI16());
                obj.ActionScript = new ActionScript(asData, this.constantPool, register, this.initAction);
                break;
            // ActionTry
            case 0x8f:
                pBitio.getUIBits(5); // Reserved
                var CatchInRegisterFlag = pBitio.getUIBits(1);
                obj.FinallyBlockFlag    = pBitio.getUIBits(1);
                obj.CatchBlockFlag      = pBitio.getUIBits(1);

                var TrySize     = pBitio.getUI16();
                var CatchSize   = pBitio.getUI16();
                var FinallySize = pBitio.getUI16();

                var CatchName;
                if (!CatchInRegisterFlag) {
                    CatchName = pBitio.getDataUntil("\0");
                } else {
                    CatchName = pBitio.getUI8();
                }

                i = 0;
                var TryBody = [];
                if (TrySize) {
                    while (TrySize) {
                        TryBody[TryBody.length] = bitio.getUI8();
                        TrySize = 0 | TrySize - 1;
                    }
                }

                obj.try = (function (data)
                {
                    var as = new ActionScript(data);
                    return function ()
                    {
                        as.reset();
                        as.variables["this"] = this;
                        return as.execute(this);
                    };
                })(TryBody);

                if (obj.CatchBlockFlag) {
                    var CatchBody = [];
                    if (CatchSize) {
                        while (CatchSize) {
                            CatchBody[CatchBody.length] = bitio.getUI8();
                            CatchSize = 0 | CatchSize - 1;
                        }
                    }

                    obj.catch = (function (data, catchName)
                    {
                        var as = new ActionScript(data);
                        return function ()
                        {
                            as.reset();
                            as.variables["this"] = this;
                            as.variables[catchName] = arguments[0];
                            return as.execute(this);
                        };
                    })(CatchBody, CatchName);
                }

                if (obj.FinallyBlockFlag) {
                    var FinallyBody = [];
                    if (FinallySize) {
                        while (FinallySize) {
                            FinallyBody[FinallyBody.length] = bitio.getUI8();
                            FinallySize = 0 | FinallySize - 1;
                        }
                    }

                    obj.finally = (function (data)
                    {
                        var as = new ActionScript(data);
                        return function ()
                        {
                            as.reset();
                            as.variables["this"] = this;
                            return as.execute(this);
                        };
                    })(FinallyBody);
                }

                break;
            case 0x00:
                isEnd = true;
                break;
        }

        indexes[startOffset] = cache.length;
        cache[cache.length]  = obj;

        if (isEnd) {
            break;
        }
    }

    // If and Jump
    var length = 0 | cache.length;
    i = 0;

    while (i < length) {
        obj = cache[i];
        i = 0 | i + 1;

        var code = obj.actionCode;
        switch (code) {
            case 0x9D:
            case 0x99:
                var index = indexes[obj.offset];

                obj.offset  = (index !== undefined) ? 0 | index - 1 : 0 | length - 1;
                break;
            default:
                break;
        }
    }

    this.cache = cache;
};

/**
 * @param value
 * @returns {*}
 */
ActionScript.prototype.calc = function (value)
{
    var calc;
    switch (typeof value) {
        case "boolean":
            calc = (value) ? 1 : 0;
            break;
        case "object":
            if (value === null) {
                calc = 0;
            } else if (value instanceof Array) {
                calc = value.length;
            } else if (value instanceof Object) {
                calc = 1;
            }
            break;
        default:
            calc = +value;
            break;
    }

    if (this.$isNaN(calc)) {
        calc = 0;
    }

    return calc;
};

/**
 * @param value
 * @returns {*}
 */
ActionScript.prototype.logicValue = function (value)
{
    var calc;
    switch (typeof value) {
        case "boolean":
            calc = (value) ? 1 : 0;
            break;
        case "object":
            if (value === null) {
                calc = 0;
            } else if (value instanceof Array) {
                calc = value.length;
            } else if (value instanceof Object) {
                calc = 1;
            }
            break;
        case "string":
            if (value === "") {
                calc = 0;
            } else {
                calc = 1;
            }
            break;
        case "function":
            calc = 1;
            break;
        default:
            calc = +value;
            if (this.$isNaN(calc)) {
                calc = 0;
            }
            break;
    }
    return calc;
};

/**
 * @param stack
 * @returns {Number}
 */
ActionScript.prototype.operationValue = function (stack)
{
    var value = +stack.pop();
    if (this.$isNaN(value)) {
        value = 0;
    }
    return value;
};

/**
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.execute = function (mc)
{
    var scope = this.scope;
    var movieClip = (scope instanceof MovieClip) ? scope : mc;
    if (!movieClip.active) {
        return undefined;
    }
    var stage = movieClip.getStage();
    if (stage) {
        this.version = stage.getVersion();
    }

    var stack   = [];
    var cache   = this.cache;
    var cLength = 0 | cache.length;
    var cIdx    = 0;

    while(cIdx < cLength) {
        // if (!(cIdx in cache)) {
        //     cIdx = 0 | cIdx + 1;
        //     continue;
        // }

        var aScript    = cache[cIdx];
        var actionCode = 0 | aScript.actionCode;
        if (actionCode === 0) {
            break;
        }

        switch (actionCode) {
            // ********************************************
            // SWF 3
            // ********************************************
            case 0x81:
                this.ActionGotoFrame(movieClip, aScript.frame);
                break;
            case 0x04:
                this.ActionNextFrame(movieClip);
                break;
            case 0x05:
                this.ActionPreviousFrame(movieClip);
                break;
            case 0x06:
                this.ActionPlay(movieClip);
                break;
            case 0x07:
                this.ActionStop(movieClip);
                break;
            case 0x08: // ActionToggleQuality
            case 0x8A: // ActionWaitForFrame
                break;
            case 0x09:
                this.ActionStopSounds(movieClip);
                break;
            case 0x8B:
                movieClip = this.ActionSetTarget(movieClip, mc, aScript.targetName);
                break;
            case 0x8C:
                this.ActionGoToLabel(movieClip, aScript.label);
                break;
            case 0x83:
                this.ActionGetURL(movieClip, aScript.url, aScript.target);
                break;

            // ********************************************
            // SWF 4
            // ********************************************
            case 0x0A: // ActionAdd
                this.ActionOperation(stack, 0);
                break;
            case 0x0B: // ActionSubtract
                this.ActionOperation(stack, 1);
                break;
            case 0x0C: // ActionMultiply
                this.ActionOperation(stack, 2);
                break;
            case 0x0D: // ActionDivide
                this.ActionOperation(stack, 3);
                break;
            case 0x0E:
                this.ActionEquals(stack);
                break;
            case 0x0F:
                this.ActionLess(stack);
                break;
            case 0x10:
                this.ActionAnd(stack);
                break;
            case 0x11:
                this.ActionOr(stack);
                break;
            case 0x12:
                this.ActionNot(stack);
                break;
            case 0x13:
                this.ActionStringEquals(stack);
                break;
            case 0x14: // ActionStringLength
            case 0x31: // ActionMBStringLength
                this.ActionStringLength(stack);
                break;
            case 0x21:
                this.ActionStringAdd(stack);
                break;
            case 0x15:// ActionStringExtract
            case 0x35:// ActionMBStringExtract
                this.ActionStringExtract(stack);
                break;
            case 0x29:
                this.ActionStringLess(stack);
                break;
            case 0x17: // ActionPop
                stack.pop();
                break;
            case 0x96:
                this.ActionPush(stack, movieClip, aScript.values);
                break;
            case 0x33: // ActionAsciiToChar
            case 0x37: // ActionMBAsciiToChar
                this.ActionAsciiToChar(stack);
                break;
            case 0x36: // ActionMBCharToAscii
            case 0x32: // ActionCharToAscii
                this.ActionCharToAscii(stack);
                break;
            case 0x18:
                this.ActionToInteger(stack);
                break;
            case 0x9E:
                this.ActionCall(stack, movieClip);
                break;
            case 0x9D:
                cIdx = 0 | this.ActionIf(stack, aScript.offset, cIdx);
                break;
            case 0x99: // ActionJump
                cIdx = 0 | aScript.offset;
                break;
            case 0x1C:
                this.ActionGetVariable(stack, movieClip);
                break;
            case 0x1D:
                this.ActionSetVariable(stack, movieClip);
                break;
            case 0x9A:
                this.ActionGetURL2(stack, aScript, movieClip);
                break;
            case 0x22:
                this.ActionGetProperty(stack, movieClip);
                break;
            case 0x9F:
                this.ActionGoToFrame2(stack, aScript, movieClip);
                break;
            case 0x20:
                movieClip = this.ActionSetTarget2(stack, movieClip, mc);
                break;
            case 0x23:
                this.ActionSetProperty(stack, movieClip);
                break;
            case 0x27:
                this.ActionStartDrag(stack, movieClip);
                break;
            case 0x8D: // ActionWaitForFrame2
                stack.pop();
                break;
            case 0x24:
                this.ActionCloneSprite(stack, movieClip);
                break;
            case 0x25:
                this.ActionRemoveSprite(stack, movieClip);
                break;
            case 0x28:
                this.ActionEndDrag(movieClip);
                break;
            case 0x34:
                this.ActionGetTime(stack);
                break;
            case 0x30:
                this.ActionRandomNumber(stack);
                break;
            case 0x26:
                this.ActionTrace(stack);
                break;
            case 0x00:
                break;
            case 0x2D:
                this.ActionFsCommand2(stack, movieClip);
                break;

            // ********************************************
            // SWF 5
            // ********************************************
            case 0x52:
                this.ActionCallMethod(stack, movieClip);
                break;
            case 0x88: // ActionConstantPool
                this.constantPool = aScript.constantPool;
                break;
            case 0x3d:
                this.ActionCallFunction(stack, movieClip);
                break;
            case 0x9b:
                this.ActionDefineFunction(stack, aScript, movieClip);
                break;
            case 0x3c:
                this.ActionDefineLocal(stack, movieClip);
                break;
            case 0x41:
                this.ActionDefineLocal2(stack, movieClip);
                break;
            case 0x3a:
                this.ActionDelete(stack, movieClip);
                break;
            case 0x3b:
                this.ActionDelete2(stack, movieClip);
                break;
            case 0x46:
                this.ActionEnumerate(stack, movieClip);
                break;
            case 0x49:
                this.ActionEquals2(stack);
                break;
            case 0x4e:
                this.ActionGetMember(stack, movieClip);
                break;
            case 0x42:
                this.ActionInitArray(stack);
                break;
            case 0x43:
                this.ActionInitObject(stack);
                break;
            case 0x53:
                this.ActionNewMethod(stack, movieClip);
                break;
            case 0x40:
                this.ActionNewObject(stack, movieClip);
                break;
            case 0x4f:
                this.ActionSetMember(stack, movieClip);
                break;
            case 0x45:
                this.ActionTargetPath(stack);
                break;
            case 0x94:
                movieClip = this.ActionWith(stack, aScript.Size, mc);
                break;
            case 0x4a:
                this.ActionToNumber(stack);
                break;
            case 0x4b:
                this.ActionToString(stack);
                break;
            case 0x44:
                this.ActionTypeOf(stack);
                break;
            case 0x47:
                this.ActionAdd2(stack);
                break;
            case 0x48:
                this.ActionLess2(stack);
                break;
            case 0x3f:
                this.ActionModulo(stack);
                break;
            case 0x60:
                this.ActionBitAnd(stack);
                break;
            case 0x63:
                this.ActionBitLShift(stack);
                break;
            case 0x61:
                this.ActionBitOr(stack);
                break;
            case 0x64:
                this.ActionBitRShift(stack);
                break;
            case 0x65:
                this.ActionBitURShift(stack);
                break;
            case 0x62:
                this.ActionBitXor(stack);
                break;
            case 0x51:
                this.ActionDecrement(stack);
                break;
            case 0x50:
                this.ActionIncrement(stack);
                break;
            case 0x4c:
                this.ActionPushDuplicate(stack);
                break;
            case 0x3e: // ActionReturn
                return stack.pop();
            case 0x4d:
                this.ActionStackSwap(stack);
                break;
            case 0x87:
                this.ActionStoreRegister(stack, aScript.RegisterNumber);
                break;

            // ********************************************
            // SWF 6
            // ********************************************
            case 0x54:
                this.ActionInstanceOf(stack);
                break;
            case 0x55:
                this.ActionEnumerate(stack, movieClip);
                break;
            case 0x66:
                this.ActionStrictEquals(stack);
                break;
            case 0x67: // ActionGreater
            case 0x68: // ActionStringGreater
                this.ActionGreater(stack);
                break;

            // ********************************************
            // SWF 7
            // ********************************************
            case 0x8e: // ActionDefineFunction2
                this.ActionDefineFunction(stack, aScript, movieClip);
                break;
            case 0x69:
                this.ActionExtends(stack);
                break;
            case 0x2b:
                this.ActionCastOp(stack);
                break;
            case 0x2c:
                this.ActionImplementsOp(stack);
                break;
            case 0x8f:
                this.ActionTry(aScript, movieClip);
                break;
            case 0x2a:
                this.ActionThrow(stack);
                break;

            default:
                console.log("[ActionScript Error] Code: " + actionCode);
                break;
        }

        cIdx = 0 | cIdx + 1;
    }
};

/**
 * @type {{}}
 */
ActionScript.prototype.methods = {
    gotoandstop: "gotoAndStop",
    gotoandplay: "gotoAndPlay",
    play: "play",
    stop: "stop",
    duplicatemovieclip: "duplicateMovieClip",
    getproperty: "getProperty",
    removemovieclip: "removeMovieClip",
    setproperty: "setProperty",
    startdrag: "startDrag",
    stopdrag: "stopDrag",
    targetpath: "targetPath",
    updateafterevent: "updateAfterEvent",
    nextframe: "nextFrame",
    nextscene: "nextScene",
    prevframe: "prevFrame",
    prevscene: "prevScene",
    stopallsounds: "stopAllSounds",
    setmask: "setMask",
    geturl: "getURL",
    loadmovie: "loadMovie",
    loadmovienum: "loadMovieNum",
    loadvariables: "loadVariables",
    loadvariablesnum: "loadVariablesNum",
    unloadmovie: "unloadMovie",
    unloadmovienum: "unloadMovieNum",
    swapdepths: "swapDepths",
    getinstanceatdepth: "getInstanceAtDepth",
    attachmovie: "attachMovie",
    attachaudio: "attachAudio",
    attachbitmap: "attachBitmap",
    getnexthighestdepth: "getNextHighestDepth",
    getbytesloaded: "getBytesLoaded",
    getbytestotal: "getBytesTotal",
    assetpropflags: "ASSetPropFlags",
    linestyle: "lineStyle",
    linegradientstyle: "lineGradientStyle",
    beginfill: "beginFill",
    begingradientfill: "beginGradientFill",
    beginbitmapfill: "beginBitmapFill",
    clear: "clear",
    moveto: "moveTo",
    lineto: "lineTo",
    curveto: "curveTo",
    endfill: "endFill",
    hittest: "hitTest",
    getdepth: "getDepth",
    createemptymovieclip: "createEmptyMovieClip",
    createtextfield: "createTextField",
    getbounds: "getBounds",
    getrect: "getRect",
    getswfversion: "getSWFVersion",
    gettextsnapshot: "getTextSnapshot",
    globaltolocal: "globalToLocal",
    localtoglobal: "localToGlobal"
};

/**
 * @param method
 * @returns {*}
 */
ActionScript.prototype.checkMethod = function (method)
{
    if (!method || typeof method !== "string") {
        return method;
    }

    var lowerMethod = method.toLowerCase();
    return this.methods[lowerMethod] || null;
};

/**
 * @param mc
 * @param frame
 */
ActionScript.prototype.ActionGotoFrame = function (mc, frame)
{
    if (mc !== undefined) {
        mc.stop();
        mc.setNextFrame(frame);
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionNextFrame = function (mc)
{
    if (mc !== undefined) {
        mc.nextFrame();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionPreviousFrame = function (mc)
{
    if (mc !== undefined) {
        mc.prevFrame();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionPlay = function (mc)
{
    if (mc !== undefined) {
        mc.play();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionStop = function (mc)
{
    if (mc !== undefined) {
        mc.stop();
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionStopSounds = function (mc)
{
    if (mc !== undefined) {
        mc.stopAllSounds();
    }
};

/**
 * @param movieClip
 * @param mc
 * @param target
 * @returns {*}
 */
ActionScript.prototype.ActionSetTarget = function (movieClip, mc, target)
{
    if (target !== "") {
        var targetMc = movieClip;
        if (!targetMc) {
            targetMc = mc;
        }
        return targetMc.getDisplayObject(target);
    } else {
        if (mc.active) {
            return mc;
        } else {
            return undefined;
        }
    }
};

/**
 * @param mc
 * @param label
 */
ActionScript.prototype.ActionGoToLabel = function (mc, label)
{
    if (mc !== undefined) {
        var frame = mc.getLabel(label);
        mc.stop();

        if (typeof frame === "number" && frame) {
            mc.setNextFrame(frame);
        }
    }
};

/**
 * @param mc
 * @param url
 * @param target
 */
ActionScript.prototype.ActionGetURL = function (mc, url, target)
{
    if (mc !== undefined) {
        mc.getURL(url, target);
    }
};

/**
 * @param stack
 * @param operation
 */
ActionScript.prototype.ActionOperation = function (stack, operation)
{
    var a = 0 | this.operationValue(stack);
    var b = 0 | this.operationValue(stack);
    var value;
    switch (operation) {
        case 0:
            value = b + a;
            break;
        case 1:
            value = b - a;
            break;
        case 2:
            value = b * a;
            break;
        case 3:
            value = b / a;
            break;
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionEquals = function (stack)
{
    var a = this.calc(stack.pop());
    var b = this.calc(stack.pop());
    if (this.version > 4) {
        stack[stack.length] = (a === b);
    } else {
        stack[stack.length] = (a === b) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionLess = function (stack)
{
    var a = this.calc(stack.pop());
    var b = this.calc(stack.pop());
    if (this.version > 4) {
        stack[stack.length] = (b < a);
    } else {
        stack[stack.length] = (b < a) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAnd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        b = this.logicValue(b);
        stack[stack.length] = (a !== 0 && b !== 0);
    } else {
        a = this.calc(a);
        b = this.calc(b);
        stack[stack.length] = (a !== 0 && b !== 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionOr = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        b = this.logicValue(b);
        stack[stack.length] = (a !== 0 || b !== 0);
    } else {
        a = this.calc(a);
        b = this.calc(b);
        stack[stack.length] = (a !== 0 || b !== 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionNot = function (stack)
{
    var a = stack.pop();
    if (this.version > 4) {
        a = this.logicValue(a);
        stack[stack.length] = (a === 0);
    } else {
        a = this.calc(a);
        stack[stack.length] = (a === 0) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringEquals = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();

    if (a instanceof MovieClip) {
        a = a.getTarget();
    } else {
        a += "";
    }

    if (b instanceof MovieClip) {
        b = b.getTarget();
    } else {
        b += "";
    }

    if (this.version > 4) {
        stack[stack.length] = (b === a);
    } else {
        stack[stack.length] = (b === a) ? 1 : 0;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringLength = function (stack)
{
    var value  = stack.pop();
    value      = this.valueToString(value);
    var sLen   = value.length;

    var length = 0;
    var i      = 0;
    while (i < sLen) {
        var code = 0 | value.charCodeAt(i);
        i = (i + 1)|0;

        length = (length + 1)|0;
        if (255 > code) {
            continue;
        }

        // jp string
        length = (length + 1)|0;
    }

    stack[stack.length] = length;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringAdd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();

    if (a === null || a === undefined) {
        a = "";
    }

    if (b === null || b === undefined) {
        b = "";
    }

    stack[stack.length] = b + a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringExtract = function (stack)
{
    var count  = stack.pop();
    var index  = stack.pop();
    var string = stack.pop();
    string = this.valueToString(string);

    index -= 1;
    if (index < 0) {
        index = 0;
    }

    stack[stack.length] = (count < 0) ? string.substr(index) : string.substr(index, count);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStringLess = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    if (this.version > 4) {
        stack[stack.length] = (b < a);
    } else {
        stack[stack.length] = (b < a) ? 1 : 0;
    }
};

/**
 * @param stack
 * @param mc
 * @param values
 */
ActionScript.prototype.ActionPush = function (stack, mc, values)
{
    var length = 0 | values.length;
    var params = this.params;

    var i = 0;
    while (i < length) {
        var value = values[i];
        i = 0 | i + 1;

        if (this.version > 4 && value instanceof Object) {
            var key = value.key;
            value   = undefined;
            if (key in params) {
                var name = params[key];
                if (typeof name === "string") {
                    value = this.getVariable(name);
                    if (value === undefined && !(name in this.variables)) {
                        value = name;
                    }
                } else {
                    value = name;
                }
            }
        }

        stack[stack.length] = value;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAsciiToChar = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = this.$fromCharCode(value);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionCharToAscii = function (stack)
{
    var value = stack.pop();
    value     = this.valueToString(value);
    stack[stack.length] = value.charCodeAt(0);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToInteger = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = 0 | value;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCall = function (stack, mc)
{
    var value = stack.pop();
    if (mc !== undefined) {
        var frame;

        value = this.valueToString(value);

        var splitData = value.split(":");
        var label     = splitData[0];
        var targetMc  = mc;

        if (splitData.length > 1) {
            targetMc = mc.getDisplayObject(splitData[0]);
            label    = splitData[1];
        }

        if (targetMc !== undefined) {
            frame = (typeof label === "string") ? targetMc.getLabel(label) : label;
            targetMc.executeActions(frame);
        }
    }
};

/**
 * @param stack
 * @param offset
 * @param index
 * @returns {*}
 */
ActionScript.prototype.ActionIf = function (stack, offset, index)
{
    var condition = stack.pop();
    switch (typeof condition) {
        case "boolean":
            break;
        case "string":
            if (!this.$isNaN(condition)) {
                condition = +condition;
            }
            break;
    }

    if (condition) {
        return offset;
    }

    return index;
};

/**
 * @param stack
 * @param mc
 * @returns {undefined}
 */
ActionScript.prototype.ActionGetVariable = function (stack, mc)
{
    var name = stack.pop();
    var value;
    if (name instanceof MovieClip) {
        value = name;
    } else {
        value = this.getNativeClass(name);
        if (value === undefined) {
            value = this.getVariable(name);
            if (value === undefined && mc) {
                value = mc.getProperty(name);
            }
        }
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetVariable = function (stack, mc)
{
    var value = stack.pop();
    var name  = stack.pop();
    if (!this.setVariable(name, value)) {
        mc.setProperty(name, value);
    }
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionGetURL2 = function (stack, aScript, mc)
{
    var target = stack.pop();
    var value  = stack.pop();

    var LoadVariablesFlag = aScript.LoadVariablesFlag; // 0=none, 1=LoadVariables
    var LoadTargetFlag    = aScript.LoadTargetFlag;    // 0=web,  1=Sprite
    var SendVarsMethod    = aScript.SendVarsMethod;    // 0=NONE, 1=GET, 2=POST

    var method = "GET";
    if (SendVarsMethod === 2) {
        method = "POST";
    }

    var url;
    if (mc instanceof MovieClip) {
        if (value) {
            value = this.valueToString(value);

            var urls  = value.split("?");
            var uLen  = 0 | urls.length;
            var query = "";
            if (uLen === 1) {
                query = "?";
            }

            if (uLen > 2) {
                url = urls[0] + "?";
                url = url + urls[1];

                var u = 2;
                while (u < uLen) {
                    var params = urls[u];
                    u = 0 | u + 1;
                    url = url + "&" + params;
                }
            } else {
                url = value;
            }

            // local variables
            if (SendVarsMethod) {
                var variables   = mc.variables;
                var queryString = "";
                for (var key in variables) {
                    if (!variables.hasOwnProperty(key)) {
                        continue;
                    }

                    var val = variables[key];
                    if (val === null) {
                        val = "";
                    }

                    if (typeof val !== "string") {
                        var typeText = typeof val;
                        typeText = typeText.replace(/^[a-z]/g, function (str)
                        {
                            return str.toUpperCase();
                        });
                        val = "%5Btype+" + typeText + "%5D";
                    }

                    queryString += "&" + key + "=" + val;
                }

                if (query !== "" && queryString !== "") {
                    queryString = query + queryString.slice(1);
                }
                url += queryString;
            }

            if (LoadVariablesFlag) {
                mc.loadVariables(url, target, method);
            } else if (LoadTargetFlag) {
                if (target instanceof MovieClip) {
                    target.loadMovie(url, null, SendVarsMethod);
                } else {
                    mc.loadMovie(url, target, SendVarsMethod);
                }
            } else {
                mc.getURL(url, target, method);
            }
        } else {
            mc.unloadMovie(target);
        }
    }
};

/**
 * @param stack
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionGetProperty = function (stack, mc)
{
    var index  = stack.pop();
    var target = stack.pop();

    if (!this.$isNaN(index)) {
        index = this.$floor(index);
    }

    var value = this.getVariable(index);
    if (value === undefined && mc) {
        var targetMc = mc;
        if (target) {
            target  += "";
            targetMc = mc.getDisplayObject(target);
        }

        if (targetMc instanceof MovieClip) {
            value = targetMc.getProperty(index);
        }
    }

    stack[stack.length] = value;
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionGoToFrame2 = function (stack, aScript, mc)
{
    var SceneBiasFlag = aScript.SceneBiasFlag;
    var PlayFlag      = aScript.PlayFlag; // 0=stop, 1=play

    if (SceneBiasFlag === 1) {
        var SceneBias = aScript.SceneBias;
        console.log("SceneBias", SceneBias);
    }

    var frame = stack.pop();
    if (frame && mc) {
        if (this.$isNaN(frame)) {
            var splitData = frame.split(":");
            if (splitData.length > 1) {
                var targetMc = mc.getDisplayObject(splitData[0]);
                if (targetMc) {
                    frame = targetMc.getLabel(splitData[1]);
                }
            } else {
                frame = mc.getLabel(splitData[0]);
            }
        }

        if (typeof frame === "string") {
            frame |= 0;
        }

        if (typeof frame === "number" && frame > 0) {
            mc.setNextFrame(frame);
            if (PlayFlag) {
                mc.play();
            } else {
                mc.stop();
            }
        }
    }
};

/**
 * @param stack
 * @param movieClip
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionSetTarget2 = function (stack, movieClip, mc)
{
    var target = stack.pop();
    if (!movieClip) {
        movieClip = mc;
    }
    return movieClip.getDisplayObject(target);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetProperty = function (stack, mc)
{
    var value  = stack.pop();
    var index  = stack.pop();
    var target = stack.pop();

    if (!this.$isNaN(index)) {
        index = this.$floor(index);
    }

    if (mc) {
        var targetMc = mc;
        if (target !== undefined) {
            targetMc = mc.getDisplayObject(target);
        }

        if (targetMc !== undefined && targetMc.getClassName() === "MovieClip") {
            targetMc.setProperty(index, value);
        }
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionStartDrag = function (stack, mc)
{
    var target = stack.pop();
    var lock = stack.pop();
    var constrain = stack.pop();
    var y2 = null;
    var x2 = null;
    var y1 = null;
    var x1 = null;
    if (constrain) {
        y2 = stack.pop();
        x2 = stack.pop();
        y1 = stack.pop();
        x1 = stack.pop();
    }

    var targetMc = mc;
    if (target instanceof MovieClip) {
        targetMc = target;
    }

    if (typeof target === "string" && target) {
        targetMc = mc.getDisplayObject(target);
    }

    if (targetMc instanceof MovieClip) {
        targetMc.startDrag(lock, x1, y1, x2, y2);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCloneSprite = function (stack, mc)
{
    var depth = +stack.pop();
    var target = stack.pop();
    var source = stack.pop();
    if (mc) {
        mc.duplicateMovieClip(target, source, depth);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionRemoveSprite = function (stack, mc)
{
    var target = stack.pop();
    if (mc) {
        mc.removeMovieClip(target);
    }
};

/**
 * @param mc
 */
ActionScript.prototype.ActionEndDrag = function (mc)
{
    if (mc) {
        mc.stopDrag();
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionGetTime = function (stack)
{
    var now = new Date();
    stack[stack.length] = now.getTime() - this.$Date.getTime();
};

/**
 * @param stack
 */
ActionScript.prototype.ActionRandomNumber = function (stack)
{
    var maximum = stack.pop();
    stack[stack.length] = this.$floor(this.$random() * maximum);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTrace = function (stack)
{
    var value = stack.pop();
    if (value instanceof DisplayObject && value.removeFlag) {
        value = "";
    }
    if (value && typeof value === "object") {
        if ("callee" in value) {
            value = Array.prototype.slice.call(value);
        }
        value = value.toString();
    }
    console.log("[trace] " + value);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionFsCommand2 = function (stack, mc)
{
    stack.pop(); // count
    var method = stack.pop();
    var now = new Date();
    switch (method.toLowerCase()) {
        case "getdateyear":
            stack[stack.length] = now.getFullYear();
            break;
        case "getdatemonth":
            stack[stack.length] = now.getMonth() + 1;
            break;
        case "getdateday":
            stack[stack.length] = now.getDate();
            break;
        case "getdateweekday":
            stack[stack.length] = now.getDay();
            break;
        case "gettimehours":
            stack[stack.length] = now.getHours();
            break;
        case "gettimeminutes":
            stack[stack.length] = now.getMinutes();
            break;
        case "gettimeseconds":
            stack[stack.length] = now.getSeconds();
            break;
        case "startvibrate":
            stack.pop();
            stack.pop();
            stack.pop();
            stack[stack.length] = -1;
            break;
        case "gettimezoneoffset":
            mc.setVariable(stack.pop(), now.toUTCString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocalelongdate":
            mc.setVariable(stack.pop(), now.toLocaleDateString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocaleshortdate":
            mc.setVariable(stack.pop(), now.toDateString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getlocaletime":
            mc.setVariable(stack.pop(), now.toLocaleTimeString());
            mc.setVariable(stack.pop(), 0);
            break;
        case "getnetworkname":
        case "getdevice":
        case "getdeviceid":
            mc.setVariable(stack.pop(), "");
            mc.setVariable(stack.pop(), -1);
            break;
        case "getlanguage":
            var language = this.$navigator.userLanguage ||
                this.$navigator.language ||
                this.$navigator.browserLanguage ||
                "ja-JP";
            mc.setVariable(stack.pop(), language);
            mc.setVariable(stack.pop(), 0);
            break;
        case "setsoftkeys":
            stack.pop();
            stack.pop();
            stack[stack.length] = -1;
            break;
        case "fullscreen":
            stack.pop(); // bool
            stack[stack.length] = -1;
            break;
        case "setquality":
        case "getfreestagememory":
        case "gettotalstagememory":
            stack.pop();
            stack[stack.length] = -1;
            break;
        default:
            stack[stack.length] = -1;
            break;
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCallMethod = function (stack, mc)
{
    var method = stack.pop();
    var object = stack.pop();
    var count = +stack.pop();

    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    if (typeof object === "string" && object[method] === undefined) {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }

        if (object === "super") {
            var caller     = this.variables["this"];
            var SuperClass = this.getSuperClass();
            if (!method && SuperClass) {
                var sc = new SuperClass();
                switch (SuperClass) {
                    case MovieClip:
                        var loadStage = mc.getStage();
                        sc.setStage(loadStage);
                        sc.setParent(mc);
                        sc._extend = true;
                        break;
                }

                var proto = Object.getPrototypeOf(caller);
                proto.constructor = SuperClass;
                Object.setPrototypeOf(proto, sc);
                Object.setPrototypeOf(caller, proto);
            } else {
                object = caller;
            }
        }
    }

    var value;
    if (object && method) {
        var func;
        if (typeof object === "object") {
            var variables = object.variables;
            if (variables) {
                func = variables[method];
                if (!func && variables.registerClass) {
                    func = variables.registerClass[method];
                }
            }
        }

        if (!func) {
            var originMethod = this.checkMethod(method);
            if (originMethod) {
                func = object[originMethod];
            }
        }

        if (!func) {
            func = object[method];
        }

        if (!func && object instanceof MovieClip) {
            func = object.getVariable(method);
        }

        if (!func && object instanceof Global) {
            func = window[method];
            if (func) {
                params = this.ActionNativeFunction(params, mc);
                object = window;
            }
        }

        if (method === "call" || method === "apply") {
            func = object;
            object = params.shift();
            if (method === "apply") {
                var args = params.shift();
                params = [];
                if (args) {
                    params = Array.prototype.slice.call(args);
                }
            }
        }

        if (func && typeof func === "function") {
            switch (true) {
                case object instanceof MovieClipLoader:
                    if (method === "loadClip" && typeof params[1] === "string") {
                        var targetStr = params[1];
                        params[1] = mc.getDisplayObject(targetStr);
                    }
                    break;
            }
            value = func.apply(object, params);
        }

        if (!func && object instanceof Object && typeof method === "string") {
            switch (method.toLowerCase()) {
                case "registerclass":
                    value = false;
                    var _root = mc.getDisplayObject("_root");
                    var stage = _root.getStage();
                    var characterId = stage.exportAssets[params[0]];
                    if (characterId) {
                        stage.registerClass[characterId] = params[1];
                        value = true;
                    }
                    break;
                case "addproperty":
                    this.addProperty(object, params);
                    break;
            }
        }
    } else {
        if (!method && typeof object === "function") {
            value = object.apply(this.variables["this"], params);
        }
    }

    stack[stack.length] = value;
};

/**
 * @param target
 * @param params
 * @returns {boolean}
 */
ActionScript.prototype.addProperty = function (target, params)
{
    var property = params[0];
    if (typeof property !== "string" || property === "") {
        return false;
    }

    var getter = params[1];
    if (!getter) {
        getter = function () {};
    }
    var setter = params[2];
    if (!setter) {
        setter = function () {};
    }

    if (typeof getter !== "function" || typeof setter !== "function") {
        return false;
    }

    Object.defineProperty(target, property,
        {
            get: getter,
            set: setter
        });

    return true;
};

/**
 * @param args
 * @param mc
 * @returns {Array}
 */
ActionScript.prototype.ActionNativeFunction = function (args, mc)
{
    var targetMc = mc;
    var params   = args;
    if (args[0] instanceof MovieClip) {
        // setInterval, setTimeout
        targetMc = args.shift();
        if (args.length > 0) {
            var obj = args.shift();
            var as;
            if (typeof obj === "string") {
                as = this.getVariable(obj);
                if (typeof as !== "function") {
                    as = targetMc.getVariable(obj);
                }
            }
            if (typeof as === "function") {
                var time = args.shift();
                var action = (function (script, mc, args)
                {
                    return function ()
                    {
                        script.apply(mc, args);
                    };
                })(as, targetMc, args);
                params = [];
                params[params.length] = action;
                params[params.length] = time;
            } else {
                console.log("DEBUG: ", params);
                args.unshift(obj);
                params = args;
            }
        }
    }
    return params;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionCallFunction = function (stack, mc)
{
    var name  = stack.pop();
    var count = +stack.pop();

    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    if (mc) {
        var caller = mc;
        var func;
        var method = this.checkMethod(name);
        if (method) {
            func = mc[method];
        } else {
            func = mc.variables[name];
            if (!func) {
                var registerClass = mc.variables.registerClass;
                if (registerClass && typeof registerClass === "object") {
                    func = registerClass[name];
                }

                if (!func) {
                    if (window[name]) {
                        caller = window;
                        params = this.ActionNativeFunction(params, mc);
                        func   = window[name];
                    } else {
                        func = mc.getVariable(name);
                    }
                }
            }
        }
        stack[stack.length] = (func) ? func.apply(caller, params) : undefined;
    }
};

/**
 * @param stack
 * @param aScript
 * @param mc
 */
ActionScript.prototype.ActionDefineFunction = function (stack, aScript, mc)
{
    var action = mc.createActionScript2(aScript.ActionScript, this);
    var name   = aScript.FunctionName;
    if (name !== "") {
        mc.setVariable(name, action);
    } else {
        stack[stack.length] = action;
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDefineLocal = function (stack, mc)
{
    var value = stack.pop();
    var name  = stack.pop();

    if (this.parent) {
        this.variables[name] = value;
    } else {
        mc.setVariable(name, value);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDefineLocal2 = function (stack, mc)
{
    var name = stack.pop();
    if (this.parent) {
        this.variables[name] = undefined;
    } else {
        mc.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDelete = function (stack, mc)
{
    var name   = stack.pop();
    var object = stack.pop();

    if (typeof object === "string") {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }
    }

    if (object instanceof MovieClip) {
        object.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionDelete2 = function (stack, mc)
{
    var name = stack.pop();
    if (mc) {
        mc.setVariable(name, undefined);
    }
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionEnumerate = function (stack, mc)
{
    var object = stack.pop();
    stack[stack.length] = null;

    if (typeof object === "string") {
        object = this.stringToObject(object, mc);
    }

    if (object instanceof Object) {
        var name;
        switch (true) {
            case object instanceof DisplayObject:
                var container = object.getTags();
                var stage = object.getStage();
                for (name in container) {
                    if (!container.hasOwnProperty(name)) {
                        continue;
                    }
                    var id = container[name];
                    var instance = stage.getInstance(id);
                    var prop = "instance" + id;
                    if (instance.getName()) {
                        prop = instance.getName();
                    }
                    stack[stack.length] = prop;
                }
                var variables = object.variables;
                for (name in variables) {
                    if (!variables.hasOwnProperty(name)) {
                        continue;
                    }
                    stack[stack.length] = name;
                }
                break;
            default:
                for (name in object) {
                    if (!object.hasOwnProperty(name)) {
                        continue;
                    }
                    stack[stack.length] = name;
                }
                break;
        }
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionEquals2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    var A = a;
    var B = b;
    if (a instanceof MovieClip) {
        A = a.getTarget();
    }
    if (b instanceof MovieClip) {
        B = b.getTarget();
    }
    stack[stack.length] = (B == A);
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionGetMember = function (stack, mc)
{
    var property;
    var name   = stack.pop();
    var object = stack.pop();

    if (typeof object === "string") {
        var target = this.stringToObject(object, mc);
        if (target) {
            object = target;
        }
    }

    if (object) {
        switch (true) {
            default:
                property = object[name];
                break;
            case object instanceof DisplayObject:
            case object instanceof Global:
                if (!object._extend) {
                    property = object.getProperty(name, false);
                    if (property === undefined &&
                        typeof name === "string" &&
                        name.substr(0, 8) === "instance"
                    ) {
                        var stage = object.getStage();
                        var id = name.split("instance")[1];
                        property = stage.getInstance(id);
                    }

                    if (property === undefined && this.checkMethod(name)) {
                        property = object[name];
                    }

                } else {
                    property = object[name];
                }
                break;
            case object instanceof Element && name === "childNodes":
                var childNodes = object[name];
                var length = childNodes.length;
                property = [];
                if (length) {
                    for (var i = 0; i < length; i++) {
                        var node = childNodes[i];
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        property[property.length] = node;
                    }
                }
                break;
            case object instanceof window.NamedNodeMap:
                var item = object.getNamedItem(name);
                property = item.value;
                break;
        }
    }
    stack[stack.length] = property;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInitArray = function (stack)
{
    var number = stack.pop();
    var array  = [];
    if (number > 0) {
        while (number) {
            number = 0 | number - 1;
            array[array.length] = stack.pop();
        }
    }
    stack[stack.length] = array;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInitObject = function (stack)
{
    var number = stack.pop();
    var object = {};
    if (number > 0) {
        while (number) {
            number = 0 | number - 1;

            var value    = stack.pop();
            var property = stack.pop();

            object[property] = value;
        }
    }
    stack[stack.length] = object;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionNewMethod = function (stack, mc)
{
    var method = stack.pop();
    var object = stack.pop();
    var number = stack.pop();
    var params = [];
    if (number > 0) {
        while (number--) {
            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    var constructor;
    if (method === "") {
        constructor = object.apply(object, params);
    }
    if (!constructor && method in object) {
        constructor = this.CreateNewActionScript(object[method], mc, params);
    }
    if (!constructor && method in window) {
        if (method === "CSSStyleDeclaration") {
            constructor = undefined;
        } else {
            constructor = this.CreateNewActionScript(window[method], mc, params);
        }
    }
    stack[stack.length] = constructor;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionNewObject = function (stack, mc)
{
    var object  = stack.pop();
    var numArgs = +stack.pop();
    var params = [];
    if (numArgs > 0) {
        while (numArgs) {
            numArgs = 0 | numArgs - 1;

            var param = stack.pop();
            if (param && typeof param === "object" && "callee" in param) {
                param = Array.prototype.slice.call(param);
            }
            params[params.length] = param;
        }
    }

    var obj = {};
    if (object in window) {
        params.unshift(window[object]);
        obj = new (Function.prototype.bind.apply(window[object], params))();
    } else {
        switch (object) {
            case "Object":
                obj = {};
                break;
            case "MovieClip":
                obj = new MovieClip();
                var stage = mc.getStage();
                obj.setStage(stage);
                obj.setParent(mc);
                break;
            case "Sound":
                obj = new Sound(mc);
                obj.movieClip = mc;
                break;
            case "XML":
                obj = new Xml();
                break;
            case "LoadVars":
                obj = new LoadVars();
                break;
            case "Color":
                obj = new Color(params[0]);
                break;
            case "TextFormat":
                obj = new TextFormat();
                break;
            case "MovieClipLoader":
                obj = new MovieClipLoader();
                break;
            default:
                if (mc) {
                    var self = this;
                    var func = self.getVariable(object) || mc.getVariable(object);
                    obj      = self.CreateNewActionScript(func, mc, params);
                }
                break;
        }
    }
    stack[stack.length] = obj;
};

/**
 * @param name
 * @returns {*}
 */
ActionScript.prototype.getNativeClass = function (name)
{
    var value;
    switch (name) {
        case "MovieClip":
            value = MovieClip;
            break;
        case "Sprite":
            value = Sprite;
            break;
        case "SimpleButton":
            value = SimpleButton;
            break;
        case "TextField":
            value = TextField;
            break;
        case "Shape":
            value = Shape;
            break;
        case "Sound":
            value = Sound;
            break;
        case "XML":
            value = Xml;
            break;
        case "LoadVars":
            value = LoadVars;
            break;
        case "Color":
            value = Color;
            break;
        case "TextFormat":
            value = TextFormat;
            break;
        case "MovieClipLoader":
            value = MovieClipLoader;
            break;
    }
    return value;
};

/**
 * @param Constr
 * @param mc
 * @param params
 * @returns {*}
 */
ActionScript.prototype.CreateNewActionScript = function (Constr, mc, params)
{
    if (Constr) {
        params.unshift(Constr);
        return new (Function.prototype.bind.apply(Constr, params))();
    }
    return undefined;
};

/**
 * @param stack
 * @param mc
 */
ActionScript.prototype.ActionSetMember = function (stack, mc)
{
    var value  = stack.pop();
    var name   = stack.pop();
    var object = stack.pop();
    if (object) {
        if (typeof object === "string") {
            var target = this.stringToObject(object, mc);
            if (target) {
                object = target;
            }
        }

        if (typeof object === "object" || typeof object === "function") {
            switch (true) {
                default:
                case object === MovieClip.prototype:
                case object === TextField.prototype:
                case object === SimpleButton.prototype:
                case object === Sprite.prototype:
                case object === Shape.prototype:
                    object[name] = value;
                    break;
                case object instanceof DisplayObject:
                case object instanceof Global:
                    if (!object._extend) {
                        object.setProperty(name, value, false);
                    } else {
                        object[name] = value;
                    }
                    break;
            }
        }
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTargetPath = function (stack)
{
    console.log("ActionTargetPath");
    var object = stack.pop();
    var path   = null;
    if (object instanceof MovieClip) {
        path = object.getName();
        if (path !== null) {
            while (true) {
                var parent = object.getParent();
                if (parent === null) {
                    path = "/" + path;
                    break;
                }

                var name = parent.getName();
                if (name === null) {
                    path = null;
                    break;
                }

                path = name + "/" + path;
            }
        }
    }
    stack[stack.length] = path;
};

/**
 * @param stack
 * @param size
 * @param mc
 * @returns {*}
 */
ActionScript.prototype.ActionWith = function (stack, size, mc)
{
    var object = mc;
    if (size) {
        object = stack.pop();
    }
    return object;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToNumber = function (stack)
{
    var object = +stack.pop();
    stack[stack.length] = object;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionToString = function (stack)
{
    var object = stack.pop();
    stack[stack.length] = this.valueToString(object);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionTypeOf = function (stack)
{
    var object = stack.pop();
    var str    = "";
    switch (true) {
        case object instanceof MovieClip:
            str = "movieclip";
            break;
        default:
            str = typeof object;
            break;
    }
    stack[stack.length] = str;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionAdd2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b + a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionLess2 = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b < a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionModulo = function (stack)
{
    var y = stack.pop();
    var x = stack.pop();
    stack[stack.length] = x % y;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitAnd = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b & a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitLShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b << a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitOr = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b | a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitRShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b >> a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitURShift = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = b >> a;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionBitXor = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = a ^ b;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionDecrement = function (stack)
{
    var value = stack.pop();
    value     = 0 | value - 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionIncrement = function (stack)
{
    var value = stack.pop();
    value     = 0 | value + 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionPushDuplicate = function (stack)
{
    var length    = stack.length;
    stack[length] = stack[length - 1];
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStackSwap = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = a;
    stack[stack.length] = b;
};

/**
 * @param stack
 * @param number
 */
ActionScript.prototype.ActionStoreRegister = function (stack, number)
{
    this.params[number] = stack[stack.length - 1];
};

/**
 * @param stack
 */
ActionScript.prototype.ActionInstanceOf = function (stack)
{
    var constr = stack.pop();
    var object = stack.pop();
    stack[stack.length] = (object instanceof constr);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionStrictEquals = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b === a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionGreater = function (stack)
{
    var a = stack.pop();
    var b = stack.pop();
    stack[stack.length] = (b > a);
};

/**
 * @param stack
 */
ActionScript.prototype.ActionExtends = function (stack)
{
    var SuperClass = stack.pop();
    var SubClass   = stack.pop();
    if (SuperClass && SubClass) {
        this.superClass = SuperClass;
    }
};

/**
 * @param stack
 */
ActionScript.prototype.ActionCastOp = function (stack)
{
    var object = stack.pop();
    var func   = stack.pop();
    stack[stack.length] = (typeof func === "function" &&
    object instanceof func.prototype.constructor) ? object : null;
};

/**
 * @param stack
 */
ActionScript.prototype.ActionImplementsOp = function (stack)
{
    console.log("ActionImplementsOp");
    var func = stack.pop();
    console.log(func);

    var count  = 0 | stack.pop();
    var params = [];
    if (count > 0) {
        while (count) {
            count = 0 | count - 1;
            params[params.length] = stack.pop();
        }
    }
    stack[stack.length] = null;
};

/**
 * @param script
 * @param mc
 */
ActionScript.prototype.ActionTry = function (script, mc)
{
    try {
        script.try.apply(mc);
    } catch (e) {
        if (script.CatchBlockFlag) {
            script.catch.apply(mc,[e]);
        }
    } finally {
        if (script.FinallyBlockFlag) {
            script.finally.apply(mc);
        }
    }
};

/**
 * ActionThrow
 */
ActionScript.prototype.ActionThrow = function (stack)
{
    var value = stack.pop();
    throw value.message;
};
/**
 * @param data
 * @param id
 * @param ns
 * @param stage
 * @constructor
 */
var ActionScript3 = function (data, id, ns, stage)
{
    // params
    this.id           = id;
    this.caller       = null;
    this.parent       = null;
    this.activation   = null;
    this.scopeStack   = [];
    this.currentIndex = 0;
    this.stage        = stage;
    this.args         = [];
    this.variables    = {};

    // ABC code and info
    var methodBody = data.methodBody[id];

    this.body  = methodBody;
    this.codes = methodBody.codes;
    this.info  = data.method[methodBody.method];

    // pool and data
    this.names = data.names;
    this.data  = data;

    // ns
    this.ns = ns;

    // register
    this.AVM2        = this.getAVM2();
    this.register    = this.AVM2["__swf2js__:"+ns].register;
    this.register[0] = this.AVM2;

    // trait
    var trait = methodBody.trait;

    var length = trait.length|0;
    var i = 0;
    while (i < length) {
        var obj = trait[i];
        i = (i + 1)|0;

        var kind = obj.kind;
        switch (kind) {
            case 0:
                // var key = _this.names[obj.name];

                break;
        }
    }
};

/**
 * util
 */
ActionScript3.prototype = Object.create(Util.prototype);
ActionScript3.prototype.constructor = ActionScript3;

/**
 * @type {{}}
 */
ActionScript3.prototype.methods = {
    gotoAndStop: 1,
    gotoAndPlay: 1,
    play: 1,
    stop: 1,
    duplicateMovieClip: 1,
    getProperty: 1,
    removeMovieClip: 1,
    setProperty: 1,
    startDrag: 1,
    stopDrag: 1,
    targetPath: 1,
    updateAfterEvent: 1,
    nextFrame: 1,
    nextScene: 1,
    prevFrame: 1,
    prevScene: 1,
    stopAllSounds: 1,
    setMask: 1,
    getURL: 1,
    loadMovie: 1,
    loadMovieNum: 1,
    loadVariables: 1,
    loadVariablesNum: 1,
    unloadMovie: 1,
    unloadMovieNum: 1,
    swapDepths: 1,
    getInstanceAtDepth: 1,
    attachMovie: 1,
    attachAudio: 1,
    attachBitmap: 1,
    getNextHighestDepth: 1,
    getBytesLoaded: 1,
    getBytesTotal: 1,
    ASSetPropFlags: 1,
    lineStyle: 1,
    lineGradientStyle: 1,
    beginFill: 1,
    beginGradientFill: 1,
    beginBitmapFill: 1,
    graphics: 1,
    buttonMode: 1,
    clear: 1,
    moveTo: 1,
    lineTo: 1,
    curveTo: 1,
    endFill: 1,
    hitTest: 1,
    getDepth: 1,
    createEmptyMovieClip: 1,
    createTextField: 1,
    getBounds: 1,
    getRect: 1,
    getSWFVersion: 1,
    getTextSnapshot: 1,
    globalToLocal: 1,
    localToGlobal: 1,
    addFrameScript: 1,
    trace: 1,
    addEventListener: 1,
    removeEventListener: 1,
    x: 1,
    y: 1,
    alpha: 1,
    name: 1,
    blendMode: 1,
    filters: 1,
    visible: 1,
    rotation: 1,
    height: 1,
    width: 1,
    scaleX: 1,
    scaleY: 1,
    mouseX: 1,
    mouseY: 1,
    mask: 1,
    mouseEnabled: 1,
    parent: 1
};

/**
 * @returns {*}
 */
ActionScript3.prototype.getAVM2 = function ()
{

    var ns     = this.ns;
    var caller = this.caller;
    if (caller) {
        var AVM2 = caller.avm2;
        if (AVM2 && "__swf2js__:"+ns in AVM2) {
            return AVM2;
        }
    }

    var stage     = this.stage;
    var values    = ns.split(":");
    var className = values.pop();

    var classObj = stage.avm2;

    var nLen = values.length|0;
    var i = 0;
    while (i < nLen) {
        classObj = classObj[values[i]];
        i = (i + 1)|0;
    }

    return classObj[className];
};

/**
 * @returns {*}
 */
ActionScript3.prototype.getBuilder = function ()
{
    return this.AVM2["__swf2js__::builder"];
};

/**
 * @returns {*}
 */
ActionScript3.prototype.getSuperClass = function ()
{
    var _this = this;
    return _this.AVM2["__swf2js__:"+_this.ns].superClass;
};

/**
 * @returns {*}
 */
ActionScript3.prototype.getParent = function ()
{
    return this.parent;
};

/**
 * @param name
 * @returns {*}
 */
ActionScript3.prototype.getProperty = function (name)
{
    var stage = this.stage;
    var value;

    // local1
    if (this.activation) {
        value = this.activation[name];
    }

    // parent
    if (value === undefined) {
        var parent = this.getParent();
        if (parent) {
            value = parent.getProperty(name);
        }
    }

    // property
    if (value === undefined) {
        var builder = this.getBuilder();
        if (builder) {
            if (name in this.methods) {
                value = builder[name];
            }

            if (value === undefined) {
                value = builder.getProperty(name);
            }
        }
    }

    // local2
    if (value === undefined && name.indexOf("::") !== -1) {
        var values    = name.split("::");
        var className = values.pop();
        var path      = values.pop();
        if (path !== "private") {
            var pathArr  = path.split(".");

            var classObj = stage.avm2;

            var pLen = pathArr.length;
            var pIdx = 0;
            while (pIdx < pLen) {
                classObj = classObj[pathArr[pIdx]];
                pIdx = (pIdx + 1)|0;
            }

            value = classObj[className];

            if (value === undefined) {
                value = this.AVM2[className];
            }
        } else {
            value = this.AVM2["private::"+ className];
        }
    }

    return value;
};

/**
 * setOptions
 */
ActionScript3.prototype.setOptions = function ()
{
    var info = this.info;

    var paramCount = info.paramCount|0;
    if (paramCount) {
        var data      = this.data;
        var options   = info.options;
        var paramType = info.paramType;
        var stage     = this.stage;
        var i = 0;
        while (i < paramCount) {
            var value = undefined;

            if (i in options) {
                var option = options[i];
                var val    = option.val;
                switch (option.kind|0) {
                    case 0x01: // string
                        value = data.string[val];
                        break;
                    default:
                        console.log("options", option);
                        break;
                }
            }

            if (i in paramType) {
                var pType = paramType[i];
                if (pType) {
                    var mName = data.multiname_info[pType];
                    var className = null;
                    var path = "";
                    switch (mName.kind) {
                        case 0x07: // QName
                            var ns = data.namespace[mName.ns];
                            switch (ns.kind) {
                                case 0x16:
                                    path = data.string[ns.name];
                                    break;
                                default:
                                    console.log("SetOptions", ns);
                                    break;
                            }

                            className = data.string[mName.name];
                            break;
                    }

                    if (path) {
                        var values = path.split(".");
                        var classObj = stage.avm2;

                        var pLen = values.length|0;
                        var idx = 0;
                        while (idx < pLen) {
                            classObj = classObj[values[idx]];
                            idx = (idx + 1)|0;
                        }

                        value = classObj[className];
                    }
                }
            }

            if (this.args[i] === undefined) {
                this.args[i] = value;
            }

            i = (i + 1)|0;
        }
    }
};

/**
 * execute
 */
ActionScript3.prototype.execute = function ()
{
    var stack = [];
    this.scopeStack = [];

    // register
    this.AVM2 = this.getAVM2();
    this.register[0] = this.AVM2;

    var i = 0;
    var offset = 0;
    var codes  = this.codes;
    var length = codes.length|0;

    this.setOptions();

    while(i < length) {
        var obj  = codes[i];
        var code = obj.code|0;
        switch (code) {
            case 0xa0:
                this.ActionAdd(stack);
                break;
            case 0xc5:
                this.ActionAddI(stack);
                break;
            case 0x86:
                this.ActionAsType(stack, obj.value1);
                break;
            case 0x87:
                this.ActionAsTypeLate(stack);
                break;
            case 0xa8:
                this.ActionBitAnd(stack);
                break;
            case 0x97:
                this.ActionBitNot(stack);
                break;
            case 0xa9:
                this.ActionBitOr(stack);
                break;
            case 0xaa:
                this.ActionBitXOr(stack);
                break;
            case 0x41:
                this.ActionCall(stack, obj.value1);
                break;
            case 0x43:
                this.ActionCallMethod(stack, obj.value1, obj.value2);
                break;
            case 0x46:
                this.ActionCallProperty(stack, obj.value1, obj.value2);
                break;
            case 0x4c:
                this.ActionCallPropLex(stack, obj.value1, obj.value2);
                break;
            case 0x4f:
                this.ActionCallPropVoid(stack, obj.value1, obj.value2);
                break;
            case 0x44:
                this.ActionCallStatic(stack, obj.value1, obj.value2);
                break;
            case 0x45:
                this.ActionCallSuper(stack, obj.value1, obj.value2);
                break;
            case 0x4e:
                this.ActionCallSuperVoid(stack, obj.value1, obj.value2);
                break;
            case 0x78:
                this.ActionCheckFilter(stack);
                break;
            case 0x80:
                this.ActionCoerce(stack, obj.value1);
                break;
            case 0x82:
                this.ActionCoerceA(stack);
                break;
            case 0x85:
                this.ActionCoerceS(stack);
                break;
            case 0x42:
                this.ActionConstruct(stack, obj.value1);
                break;
            case 0x4a:
                this.ActionConstructProp(stack, obj.value1, obj.value2);
                break;
            case 0x49:
                this.ActionConstructSuper(stack, obj.value1);
                break;
            case 0x76:
                this.ActionConvertB(stack);
                break;
            case 0x73:
                this.ActionConvertI(stack);
                break;
            case 0x75:
                this.ActionConvertD(stack);
                break;
            case 0x77:
                this.ActionConvertO(stack);
                break;
            case 0x74:
                this.ActionConvertU(stack);
                break;
            case 0x70:
                this.ActionConvertS(stack);
                break;
            case 0xef:
                this.ActionDebug(stack, obj.value1, obj.value2, obj.value3, obj.value4);
                break;
            case 0xf1:
                this.ActionDebugFile(stack, obj.value1);
                break;
            case 0xf0:
                this.ActionDebugLine(stack);
                break;
            case 0x94:
                this.ActionDecLocal(stack, obj.value1);
                break;
            case 0xc3:
                this.ActionDecLocalI(stack, obj.value1);
                break;
            case 0x93:
                this.ActionDecrement(stack);
                break;
            case 0xc1:
                this.ActionDecrementI(stack);
                break;
            case 0x6a:
                this.ActionDeleteProperty(stack, obj.value1);
                break;
            case 0xa3:
                this.ActionDivide(stack);
                break;
            case 0x2a:
                this.ActionDup(stack);
                break;
            case 0x06:
                this.ActionDxns(stack, obj.value1);
                break;
            case 0x07:
                this.ActionDxnsLate(stack);
                break;
            case 0xab:
                this.ActionEquals(stack);
                break;
            case 0x72:
                this.ActionEscXAttr(stack);
                break;
            case 0x71:
                this.ActionEscXElem(stack);
                break;
            case 0x5e:
                this.ActionFindProperty(stack, obj.value1);
                break;
            case 0x5d:
                this.ActionFindPropStrict(stack, obj.value1);
                break;
            case 0x59:
                this.ActionGetDescendAnts(stack, obj.value1);
                break;
            case 0x64:
                this.ActionGetGlobalScope(stack);
                break;
            case 0x6e:
                this.ActionGetGlobalsLot(stack, obj.value1);
                break;
            case 0x60:
                this.ActionGetLex(stack, obj.value1);
                break;
            case 0x62:
                this.ActionGetLocal(stack, obj.value1);
                break;
            case 0xd0:
                this.ActionGetLocal0(stack);
                break;
            case 0xd1:
                this.ActionGetLocal1(stack);
                break;
            case 0xd2:
                this.ActionGetLocal2(stack);
                break;
            case 0xd3:
                this.ActionGetLocal3(stack);
                break;
            case 0x66:
                this.ActionGetProperty(stack, obj.value1);
                break;
            case 0x65:
                this.ActionGetScopeObject(stack, obj.value1);
                break;
            case 0x6c:
                this.ActionGetSlot(stack, obj.value1);
                break;
            case 0x04:
                this.ActionGetSuper(stack, obj.value1);
                break;
            case 0xb0:
                this.ActionGreaterEquals(stack);
                break;
            case 0xaf:
                this.ActionGreaterThan(stack);
                break;
            case 0x1f:
                this.ActionHasNext(stack);
                break;
            case 0x32:
                this.ActionHasNext2(stack, obj.value1, obj.value2);
                break;
            case 0x12:
                offset = this.ActionIfFalse(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x18:
                offset = this.ActionIfGe(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x17:
                offset = this.ActionIfGt(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x16:
                offset = this.ActionIfLe(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x15:
                offset = this.ActionIfLt(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x0f:
                offset = this.ActionIfNge(stack, obj.value1);
                i += offset;
                break;
            case 0x0e:
                offset = this.ActionIfNgt(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x0d:
                offset = this.ActionIfNle(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x0c:
                offset = this.ActionIfNlt(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x14:
                offset = this.ActionIfNe(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x19:
                offset = this.ActionIfStrictEq(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x1a:
                offset = this.ActionIfStrictNe(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0x11:
                offset = this.ActionIfTrue(stack, obj.value1);
                i = (i + offset)|0;
                break;
            case 0xb4:
                this.ActionIn(stack, obj.value1);
                break;
            case 0x92:
                this.ActionIncLocal(stack, obj.value1);
                break;
            case 0xc2:
                this.ActionIncLocalI(stack, obj.value1);
                break;
            case 0x91:
                this.ActionIncrement(stack);
                break;
            case 0xc0:
                this.ActionIncrementI(stack);
                break;
            case 0x68:
                this.ActionInitProperty(stack, obj.value1);
                break;
            case 0xb1:
                this.ActionInstanceOf(stack);
                break;
            case 0xb2:
                this.ActionIsType(stack, obj.value1);
                break;
            case 0xb3:
                this.ActionIsTypeLate(stack);
                break;
            case 0x10: // ActionJump
                i = (i + obj.value1)|0;
                break;
            case 0x08:
                this.ActionKill(stack, obj.value1);
                break;
            case 0x09:
                this.ActionLabel(stack);
                break;
            case 0xae:
                this.ActionLessEquals(stack);
                break;
            case 0xad:
                this.ActionLessThan(stack);
                break;
            case 0x1b:
                this.ActionLookupSwitch(stack, obj.value1, obj.value1, obj.value3);
                break;
            case 0xa5:
                this.ActionLShift(stack);
                break;
            case 0xa4:
                this.ActionModulo(stack);
                break;
            case 0xa2:
                this.ActionMultiply(stack);
                break;
            case 0xc7:
                this.ActionMultiplyI(stack);
                break;
            case 0x90:
                this.ActionNeGate(stack);
                break;
            case 0xc4:
                this.ActionNeGateI(stack);
                break;
            case 0x57:
                this.ActionNewActivation(stack);
                break;
            case 0x56:
                this.ActionNewArray(stack, obj.value1);
                break;
            case 0x5a:
                this.ActionNewCatch(stack, obj.value1);
                break;
            case 0x58:
                this.ActionNewClass(stack, obj.value1);
                break;
            case 0x40:
                this.ActionNewFunction(stack, obj.value1);
                break;
            case 0x55:
                this.ActionNewObject(stack, obj.value1);
                break;
            case 0x1e:
                this.ActionNextName(stack);
                break;
            case 0x23:
                this.ActionNextValue(stack);
                break;
            case 0x02:
                this.ActionNop(stack);
                break;
            case 0x96:
                this.ActionNot(stack);
                break;
            case 0x29:
                this.ActionPop(stack);
                break;
            case 0x1d:
                this.ActionPopScope();
                break;
            case 0x24:
                this.ActionPushByte(stack, obj.value1);
                break;
            case 0x2f:
                this.ActionPushDouble(stack, obj.value1);
                break;
            case 0x27:
                this.ActionPushFalse(stack, obj.value1);
                break;
            case 0x2d:
                this.ActionPushInt(stack, obj.value1);
                break;
            case 0x31:
                this.ActionPushNameSpace(stack, obj.value1);
                break;
            case 0x28:
                this.ActionPushNan(stack);
                break;
            case 0x20:
                this.ActionPushNull(stack);
                break;
            case 0x30:
                this.ActionPushScope(stack);
                break;
            case 0x25:
                this.ActionPushShort(stack, obj.value1);
                break;
            case 0x2c:
                this.ActionPushString(stack, obj.value1);
                break;
            case 0x26:
                this.ActionPushTrue(stack);
                break;
            case 0x2e:
                this.ActionPushUInt(stack, obj.value1);
                break;
            case 0x21:
                this.ActionPushUndefined(stack);
                break;
            case 0x1c:
                this.ActionPushWith(stack);
                break;
            case 0x48: // ActionReturnValue
                return stack.pop();
            case 0x47: // ReturnVoid
                return undefined;
            case 0xa6:
                this.ActionRShift(stack);
                break;
            case 0x63:
                this.ActionSetLocal(stack, obj.value1);
                break;
            case 0xd4:
                this.ActionSetLocal0(stack);
                break;
            case 0xd5:
                this.ActionSetLocal1(stack);
                break;
            case 0xd6:
                this.ActionSetLocal2(stack);
                break;
            case 0xd7:
                this.ActionSetLocal3(stack);
                break;
            case 0x6f:
                this.ActionSetGlobalSlot(stack, obj.value1);
                break;
            case 0x61:
                this.ActionSetProperty(stack, obj.value1);
                break;
            case 0x6d:
                this.ActionSetSlot(stack, obj.value1);
                break;
            case 0x05:
                this.ActionSetSuper(stack, obj.value1);
                break;
            case 0xac:
                this.ActionStrictEquals(stack);
                break;
            case 0xa1:
                this.ActionSubtract(stack);
                break;
            case 0xc6:
                this.ActionSubtractI(stack);
                break;
            case 0x2b:
                this.ActionSwap(stack);
                break;
            case 0x03:
                this.ActionThrow(stack);
                break;
            case 0x95:
                this.ActionTypeof(stack);
                break;
            case 0xa7:
                this.ActionURShift(stack);
                break;
        }

        i = (i + obj.offset + 1)|0;
    }
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionAdd = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 + value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionAddI = function (stack)
{
    var value2 = +stack.pop();
    var value1 = +stack.pop();
    stack[stack.length] = value1 + value2;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionAsType = function (stack, index)
{
    var type = this.names[index];
    var value = stack.pop();
    stack[stack.length] = (typeof value === type) ? true : null;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionAsTypeLate = function (stack)
{
    var cValue = stack.pop(); // class
    var value = stack.pop();
    stack[stack.length] = (typeof cValue === value) ? true : null;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionBitAnd = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 & value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionBitNot = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = ~value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionBitOr = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 | value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionBitXOr = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 ^ value2;
};

/**
 * @param stack
 * @param argCount
 */
ActionScript3.prototype.ActionCall = function (stack, argCount)
{
    var params = [];
    for (var i = argCount; i--;) {
        params[i] = stack.pop();
    }
    var receiver = stack.pop();
    var func = stack.pop();

    var value;
    if (typeof func === "function") {
        value = func.apply(receiver, params);
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallMethod = function (stack, index, argCount)
{
    var params = [];
    for (var i = 0; i < argCount; i++) {
        params[params.length] = stack.pop();
    }
    var receiver = stack.pop();
    var value;
    if (typeof receiver === "function") {
        value = receiver.apply(this.caller, params);
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallProperty = function (stack, index, argCount)
{
    var _this = this;
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }
    var prop = _this.names[index];
    var obj = stack.pop();

    var value;
    if (obj) {
        var func = null;
        if (obj instanceof DisplayObject) {
            if (prop in _this.methods) {
                func = obj[prop];
            }

            if (!func) {
                func = obj.getProperty(prop);
            }
        } else {
            func = obj[prop];
        }

        if (func) {
            value = func.apply(_this.caller, params);
        }
    }

    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallPropLex = function (stack, index, argCount)
{
    var _this = this;
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }

    var prop = _this.names[index];
    var obj = stack.pop();

    var value;
    if (obj) {
        value = obj[prop].apply(_this.getBuilder(), params);
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallPropVoid = function (stack, index, argCount)
{
    var _this = this;
    var params = [];
    for (var i = argCount; i--;) {
        params[i] = stack.pop();
    }

    var obj = stack.pop();
    var name = _this.names[index];

    var values = name.split("::"); // implements
    var prop = values.pop();
    var ns = values.pop();
    if (ns) {
        // console.log(ns, obj, prop);
    }

    var func = obj[prop];
    if (!func && obj instanceof MovieClip) {
        var stage = obj.getStage();
        var symbol = stage.symbols[obj.getCharacterId()];
        if (symbol) {
            var names = symbol.split(".");
            var classMethod = names.pop();
            var length = names.length;
            var classObj = stage.avm2;
            for (i = 0; i < length; i++) {
                classObj = classObj[names[i]];
            }

            if (classObj) {
                var AVM2 = classObj[classMethod];
                while (true) {
                    func = AVM2[prop];
                    if (func) {
                        break;
                    }
                    AVM2 = AVM2.super;
                    if (!AVM2 || AVM2 instanceof MovieClip) {
                        break;
                    }
                }
            }
        }
    }

    if (!func) {
        while (true) {
            var SuperClass = obj.super;
            if (!SuperClass) {
                break;
            }

            if (SuperClass instanceof MovieClip) {
                obj = _this.caller;
                func = obj[prop];
                break;
            }

            func = SuperClass[prop];
            if (func) {
                break;
            }

            obj = SuperClass;
        }
    }

    // fscommand
    if (prop === "fscommand") {
        obj = _this.stage;
    }

    if (this.id==151) {
        console.log(obj, params,this)
    }

    if (func) {
        func.apply(obj, params);
    }
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallStatic = function (stack, index, argCount)
{
    console.log("ActionCallStatic");
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }
    var receiver = stack.pop();
    var value;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallSuper = function (stack, index, argCount)
{
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }
    var porp = this.names[index];
    var receiver = stack.pop();

};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionCallSuperVoid = function (stack, index, argCount)
{
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }
    var porp = this.names[index];
    var receiver = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionCheckFilter = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionCoerce = function (stack, index)
{
    var value = stack.pop();
    var str = this.names[index];
    stack[stack.length] = str;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionCoerceA = function(stack)
{
    var value = stack.pop();
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionCoerceS = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = String(value);
};

/**
 * @param stack
 * @param argCount
 */
ActionScript3.prototype.ActionConstruct = function (stack, argCount)
{
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }
    var obj = stack.pop();
    stack[stack.length] = obj.construct.apply(obj, params);
};

/**
 * @param stack
 * @param index
 * @param argCount
 */
ActionScript3.prototype.ActionConstructProp = function (stack, index, argCount)
{
    var _this = this;
    var params = [];
    for (var i = argCount; i--;) {
        params[params.length] = stack.pop();
    }

    var prop = _this.names[index];
    var obj = stack.pop();

    var value;
    var stage = _this.stage;
    var DoABC = stage.abc[prop];
    if (DoABC) {
        var builder = _this.getBuilder();
        var AVM2 = new DoABC(builder);
        stage.avm2[prop] = AVM2;
        AVM2[prop].apply(builder, params);
        value = AVM2;
    } else {
        value = new (Function.prototype.bind.apply(obj[prop], params))();
    }

    stack[stack.length] = value;
};

/**
 * @param stack
 * @param argCount
 */
ActionScript3.prototype.ActionConstructSuper = function (stack, argCount)
{
    var _this = this;
    var params = [];
    for (var i = argCount; i--;) {
        params[i] = stack.pop();
    }

    var obj = stack.pop();
    var SuperClassName = obj["__swf2js__:"+_this.ns].extends;
    var values = SuperClassName.split("::");
    var prop = values.pop();
    var ns = values.pop();
    var stage = _this.stage;
    var abcObj = stage.abc;
    var avmObj = stage.avm2;

    if (ns) {
        var names = ns.split(".");
        var length = names.length;
        for (i = 0; i < length; i++) {
            abcObj = abcObj[names[i]];
            avmObj = avmObj[names[i]];
        }
    }

    var sClass = null;
    var SuperClass = abcObj[prop];
    var builder = _this.getBuilder();
    switch (SuperClass) {
        case MovieClip:
            sClass = new MovieClip();
            sClass.setStage(stage);
            sClass._extend = true;
            break;
        case Sound:
            sClass = new Sound();
            sClass.movieClip = builder;
            break;
        default:
            if (SuperClass in window) { // Object
                sClass = new (Function.prototype.bind.apply(window[SuperClassName], params))();
            } else {
                sClass = new SuperClass(builder);
                avmObj[prop] = sClass;
                sClass[prop].apply(builder, params);
            }
            break;
    }

    obj["super"] = sClass;
    obj["__swf2js__:"+_this.ns].superClass = sClass;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertB = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = (value) ? true : false;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertI = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = value|0;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertD = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = +value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertO = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = (typeof value === "object") ? value : null;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertU = function (stack)
{
    var value = stack.pop();
    value = value|0;
    if (value < 0) {
        value *= -1;
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionConvertS = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = String(value);
};

/**
 * @param stack
 * @param type
 * @param index
 * @param reg
 * @param extra
 */
ActionScript3.prototype.ActionDebug = function (stack, type, index, reg, extra)
{


};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionDebugFile = function (stack, index)
{


};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDebugLine = function (stack)
{


};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionDecLocal = function (stack, index)
{

};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionDecLocalI = function (stack, index)
{

};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDecrement = function (stack)
{
    var value = stack.pop();
    value -= 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDecrementI = function (stack)
{
    var value = stack.pop();
    value -= 1;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionDeleteProperty = function (stack, index)
{
    var prop = this.name[index];
    var obj = stack.pop();
    if (obj) {
        if (prop in obj) {
            delete obj[prop];
        } else {
            // TODO
            console.log("ActionDeleteProperty");
        }
    }
    stack[stack.length] = true;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDivide = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 / value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDup = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = value;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionDxns = function (stack, index)
{

};

/**
 * @param stack
 */
ActionScript3.prototype.ActionDxnsLate = function (stack)
{
    var value = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionEquals = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = (value1 == value2);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionEscXAttr = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = String(value);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionEscXElem = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = String(value);
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionFindProperty = function (stack, index)
{
    var prop = this.names[index];
    var obj;
    stack[stack.length] = obj;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionFindPropStrict = function (stack, index)
{
    var _this = this;
    var name = _this.names[index];
    var values = name.split("::");
    var prop = values.pop();
    var ns = values.pop();
    var obj = null;

    var AVM2 = _this.AVM2;
    if (ns) {
        var names = ns.split(".");
        var length = names.length;
        if (length > 1) {
            var avmObj = _this.stage.avm2;
            for (var i = 0; i < length; i++) {
                avmObj = avmObj[names[i]];
            }
            AVM2 = avmObj;
        }
    }

    // local
    if (prop in AVM2) {
        obj = AVM2;
    }

    // find avm
    if (!obj) {
        var avm2s = _this.stage.avm2;
        if (prop in avm2s) {
            obj = avm2s[prop];
        }
    }

    // parent
    if (!obj) {
        var parent = _this.parent;
        if (parent) {
            while (true) {
                var pBuilder = parent.getBuilder();
                if (pBuilder) {
                    if (pBuilder instanceof MovieClip) {
                        if (prop in _this.methods) {
                            obj = pBuilder;
                        }

                        if (pBuilder.getProperty() !== undefined) {
                            obj = pBuilder;
                        }
                    }
                } else {
                    var pCaller = parent.caller;
                    if (pCaller instanceof MovieClip) {
                        if (prop in _this.methods) {
                            obj = pCaller;
                        }

                        if (pBuilder.getProperty() !== undefined) {
                            obj = pCaller;
                        }
                    }
                }

                if (obj) {
                    break;
                }

                parent = parent.parent;
                if (!parent) {
                    break;
                }
            }
        }
    }

    // builder
    if (!obj) {
        var builder = _this.getBuilder();
        if (builder) {
            if (builder instanceof MovieClip) {
                if (prop in _this.methods) {
                    obj = builder;
                }

                if (builder.getProperty() !== undefined) {
                    obj = builder;
                }
            }
        }
    }

    // caller
    if (!obj) {
        var caller = _this.caller;
        if (caller) {
            if (caller instanceof MovieClip) {
                if (prop in _this.methods) {
                    obj = caller;
                }

                if (caller.getProperty() !== undefined) {
                    obj = caller;
                }
            } else {
                if (name in caller) {
                    obj = caller;
                }
                if (!obj && "__swf2js__::builder" in caller) {
                    caller = caller["__swf2js__::builder"];
                    if (prop in _this.methods) {
                        obj = caller;
                    }

                    if (caller.getProperty() !== undefined) {
                        obj = caller;
                    }
                }
            }
        }
    }

    if (!obj) {
        // console.log("ActionFindPropStrict::ERROR", name, AVM2, this);
    }

    stack[stack.length] = obj;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetDescendAnts = function (stack, index)
{
    console.log("ActionGetDescendAnts");
    var porp = this.names[index];
    var obj;
    stack[stack.length] = obj;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGetGlobalScope = function (stack)
{
    var _this = this;
    var scopeStack = _this.scopeStack;
    stack[stack.length] = scopeStack[scopeStack.length - 1];
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetGlobalsLot = function (stack, index)
{
    console.log("ActionGetGlobalsLot");
    var value;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetLex = function (stack, index)
{
    var _this = this;
    var name = _this.names[index];
    stack[stack.length] = _this.getProperty(name);
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetLocal = function (stack, index)
{
    var _this = this;
    var value = _this.args[index - 1];
    if (value === undefined) {
        value = _this.register[index];
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGetLocal0 = function (stack)
{
    stack[stack.length] = this.register[0];
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGetLocal1 = function (stack)
{
    var _this = this;
    var value = _this.args[0];
    if (value === undefined) {
        value = _this.register[1];
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGetLocal2 = function (stack)
{
    var _this = this;
    var value = _this.args[1];
    if (value === undefined) {
        value = _this.register[2];
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGetLocal3 = function (stack)
{
    var _this = this;
    var value = _this.args[2];
    if (value === undefined) {
        value = _this.register[3];
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetProperty = function (stack, index)
{
    var _this = this;
    var prop = _this.names[index];
    if (prop === null) {
        prop = stack.pop();
    }
    var obj = stack.pop();

    var value;
    if (obj && prop) {
        if (obj instanceof DisplayObject) {
            if (prop in _this.methods) {
                value = obj[prop];
            }
            if (!value) {
                value = obj.getProperty(prop);
            }
        } else {
            value = obj[prop];
        }

        if (value === undefined) {
            value = _this.getProperty(prop);
        }
    }
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetScopeObject = function (stack, index)
{
    var activation = this.activation;
    if (!index) {
        stack[stack.length] = activation;
    } else {
        stack[stack.length] = (index in activation) ? activation : null;
    }
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetSlot = function (stack, index)
{
    var obj = stack.pop();
    var name = obj[index];
    stack[stack.length] = this.activation[name];
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionGetSuper = function (stack, index)
{
    var prop = this.prop;
    var obj = stack.pop();
    var value;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGreaterEquals = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = (value1 >= value2);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionGreaterThan = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = (value1 > value2);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionHasNext = function (stack)
{
    var currentIndex = stack.pop();
    var obj = stack.pop();

    currentIndex++;
    var result = 0;
    if (obj) {
        var index = 0;
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            if (index === currentIndex) {
                result = currentIndex;
                break;
            }
            index++;
        }
    }

    stack[stack.length] = result;
};

/**
 * @param stack
 * @param objectReg
 * @param indexReg
 */
ActionScript3.prototype.ActionHasNext2 = function (stack, objectReg, indexReg)
{
    var _this = this;
    var obj = _this.register[objectReg];
    var currentIndex = _this.currentIndex;

    var value = false;
    var index = 0;
    if (obj) {
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            if (index === currentIndex) {
                value = true;
                currentIndex++;
                break;
            }

            index++;
        }
    }

    if (!value) {
        currentIndex = 0;
    }

    _this.currentIndex = currentIndex;
    _this.register[indexReg] = index;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfFalse = function (stack, index)
{
    var value = stack.pop();
    return (value === false) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfGe = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 < value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfGt = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 > value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfLe = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value2 < value1) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfLt = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 < value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfNge = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 < value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfNgt = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value2 < value1) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfNle = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value2 < value1) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfNlt = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 < value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfNe = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 == value2) ? 0 : index;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfStrictEq  = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 === value2) ? index : 0;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfStrictNe  = function (stack, index)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    return (value1 === value2) ? 0 : index;
};

/**
 * @param stack
 * @param index
 * @returns {number}
 */
ActionScript3.prototype.ActionIfTrue = function (stack, index)
{
    var value = stack.pop();
    return (value === true) ? index : 0;
};


/**
 * @param stack
 */
ActionScript3.prototype.ActionIn = function (stack)
{
    var obj = stack.pop();
    var name = stack.pop();
    stack[stack.length] = (name in obj);
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionIncLocal = function (stack, index)
{
    this.register[index]+=1;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionIncLocalI = function (stack, index)
{
    this.register[index]+=1;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionIncrement = function (stack)
{
    var value = stack.pop();
    value++;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionIncrementI = function (stack)
{
    var value = stack.pop();
    value++;
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionInitProperty = function (stack, index)
{
    var value = stack.pop();
    var prop = this.names[index];
    var obj = stack.pop();
    if (this.id==148) {
        console.log(prop, obj, this)
    }
    if (obj) {
        if (obj instanceof DisplayObject) {
            obj.setProperty(prop, value);
        } else {
            obj[prop] = value;
        }
    }
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionInstanceOf = function (stack)
{
    var type = stack.pop();
    var value = stack.pop();
    stack[stack.length] = (value instanceof type);
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionIsType = function (stack, index)
{
    var value = stack.pop();
    var type = this.name[index];
    stack[stack.length] = (value == type);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionIsTypeLate = function (stack)
{
    var type = stack.pop();
    var value = stack.pop();
    stack[stack.length] = (value == type);
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionKill = function (stack, index)
{
    delete this.register[index];
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionLabel = function (stack)
{

};

/**
 * @param stack
 */
ActionScript3.prototype.ActionLessEquals = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] =  (value1 <= value2);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionLessThan = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] =  (value1 < value2);
};

/**
 * @param stack
 * @param offset
 * @param count
 * @param array
 */
ActionScript3.prototype.ActionLookupSwitch = function (stack, offset, count, array)
{
    var index = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionLShift = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 << value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionModulo = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 % value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionMultiply = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 * value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionMultiplyI = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 * value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNeGate = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = -value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNeGateI = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = -value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNewActivation = function (stack)
{
    var _this = this;
    var trait = _this.body.trait;
    var length = trait.length;
    var activation = new Activation();
    for (var i = 0; i < length; i++) {
        var obj = trait[i];
        var kind = obj.kind;
        switch (kind) {
            case 0:
                activation[i + 1] = _this.names[obj.name];
                break;
        }
    }

    _this.activation = activation;
    stack[stack.length] = activation;
};

/**
 * @param stack
 * @param argCount
 */
ActionScript3.prototype.ActionNewArray = function (stack, argCount)
{
    var array = [];
    for (var i = argCount; i--;) {
        array[i] = stack.pop();
    }
    stack[stack.length] = array;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionNewCatch = function (stack, index)
{
    var catchScope;
    stack[stack.length] = catchScope;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionNewClass = function (stack, index)
{
    var basetype = stack.pop();
    var data = this.data;
    var classInfo = data.class[index];
    var id = classInfo.cinit;

    stack[stack.length] = basetype;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionNewFunction = function (stack, index)
{
    stack[stack.length] = (function (self, id)
    {
        return function ()
        {
            var as3 = new ActionScript3(self.data, id, self.ns, self.stage);
            as3.caller = this;
            as3.parent = self;
            as3.args = arguments;
            return as3.execute();
        };
    })(this, index);
};

/**
 * @param stack
 * @param argCount
 */
ActionScript3.prototype.ActionNewObject = function (stack, argCount)
{
    var obj = {};
    for (var i = argCount; i--;) {
        var value = stack.pop();
        var prop = stack.pop();
        obj[prop] = value;
    }
    stack[stack.length] = obj;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNextName = function (stack)
{
    var index = +stack.pop();
    var obj = stack.pop();

    var name;
    if (obj) {
        var count = 0;
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }

            if (count === index) {
                name = prop;
                break;
            }
            count++;
        }
    }
    stack[stack.length] = name;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNextValue = function (stack)
{
    var index = stack.pop();
    var obj = stack.pop();
    var value;
    stack[stack.length] = value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNop = function (stack)
{


};

/**
 * @param stack
 */
ActionScript3.prototype.ActionNot = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = (!value);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPop = function (stack)
{
    stack.pop();
};

/**
 *
 */
ActionScript3.prototype.ActionPopScope = function ()
{
    this.scopeStack.pop();
};

/**
 * @param stack
 * @param value
 */
ActionScript3.prototype.ActionPushByte = function (stack, value)
{
    stack[stack.length] = value|0;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionPushDouble = function (stack, index)
{
    var data = this.data;
    var double = data.double;
    var value = double[index];
    stack[stack.length] = +value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushFalse = function (stack)
{
    stack[stack.length] = false;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionPushInt = function (stack, index)
{
    var data = this.data;
    var integer = data.integer;
    var value = integer[index];
    stack[stack.length] = +value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionPushNameSpace = function (stack, index)
{
    var data = this.data;
    var names = data.names;
    var value = names[index];
    stack[stack.length] = +value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushNan = function (stack)
{
    stack[stack.length] = NaN;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushNull = function (stack)
{
    stack[stack.length] = null;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushScope = function (stack)
{
    var scope = stack.pop();
    if (scope) {
        var scopeStack = this.scopeStack;
        scopeStack[scopeStack.length] = scope;
    }
};

/**
 * @param stack
 * @param value
 */
ActionScript3.prototype.ActionPushShort = function (stack, value)
{
    stack[stack.length] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionPushString = function (stack, index)
{
    var data = this.data;
    var string = data.string;
    stack[stack.length] = ""+string[index];
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushTrue = function (stack)
{
    stack[stack.length] = true;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionPushUInt = function (stack, index)
{
    var data = this.data;
    var uinteger = data.uinteger;
    stack[stack.length] = uinteger[index];
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushUndefined = function (stack)
{
    stack[stack.length] = undefined;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionPushWith = function (stack)
{
    var obj = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionRShift = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 >> value2;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionSetLocal = function (stack, index)
{
    this.register[index] = stack.pop();
};


/**
 * @param stack
 */
ActionScript3.prototype.ActionSetLocal0 = function (stack)
{
    this.register[0] = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSetLocal1 = function (stack)
{
    this.register[1] = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSetLocal2 = function (stack)
{
    this.register[2] = stack.pop();
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSetLocal3 = function (stack)
{
    this.register[3] = stack.pop();
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionSetGlobalSlot = function (stack, index)
{
    var value = stack.pop();
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionSetProperty = function (stack, index)
{
    var _this = this;
    var value = stack.pop();
    var prop = _this.names[index];
    var obj = stack.pop();

    if (obj) {
        if (obj instanceof DisplayObject) {
            if (prop in _this.methods) {
                obj[prop] = value;
            } else {
                console.log("ActionSetProperty", prop);
            }
        } else if (prop in obj) {
            obj[prop] = value;
        } else {
            var builder = _this.getBuilder();
            var caller = _this.caller;
            if (caller instanceof MovieClip) {
                builder = caller;
            }

            if (builder instanceof DisplayObject) {
                if (prop in _this.methods) {
                    builder[prop] = value;
                } else {
                    obj[prop] = value;
                }
            }
        }
    }
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionSetSlot = function (stack, index)
{
    var value = stack.pop();
    var obj = stack.pop();
    var name = obj[index];
    this.activation[name] = value;
};

/**
 * @param stack
 * @param index
 */
ActionScript3.prototype.ActionSetSuper = function (stack, index)
{
    var value = stack.pop();
    var prop = this.names[index];
    var obj = stack.pop();

};

/**
 * @param stack
 */
ActionScript3.prototype.ActionStrictEquals = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = (value1 === value2);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSubtract = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value1 - value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSubtractI = function (stack)
{
    var value2 = +stack.pop();
    var value1 = +stack.pop();
    stack[stack.length] = value1 - value2;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionSwap = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value2;
    stack[stack.length] = value1;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionThrow = function (stack)
{
    var value = stack.pop();
    console.log(value);
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionTypeof = function (stack)
{
    var value = stack.pop();
    stack[stack.length] = typeof value;
};

/**
 * @param stack
 */
ActionScript3.prototype.ActionURShift = function (stack)
{
    var value2 = stack.pop();
    var value1 = stack.pop();
    stack[stack.length] = value2 >> value1;
};
/**
 * @constructor
 */
var Activation = function () {};

/**
 * @constructor
 * @param stage
 */
var Packages = function (stage)
{
    this.stage = stage;
};

/**
 * @type {*}
 */
Packages.prototype = {
    "flash": {
        "display": {
            "MovieClip": MovieClip,
            "Sprite": Sprite,
            "DisplayObjectContainer": DisplayObjectContainer,
            "InteractiveObject": InteractiveObject,
            "DisplayObject": DisplayObject,
            "Graphics": Graphics
        },
        "events": {
            "Event": Event,
            "EventDispatcher": EventDispatcher,
            "MouseEvent": Util.prototype.$clipEvent
        },
        "text": {
            "AntiAliasType": AntiAliasType,
            "CSMSettings": CSMSettings,
            "Font": Font,
            "FontStyle": FontStyle,
            "FontType": FontType,
            "GridFitType": GridFitType,
            "StaticText": StaticText,
            "StyleSheet": StyleSheet,
            "TextColorType": TextColorType,
            "TextDisplayMode": TextDisplayMode,
            "TextField": TextField,
            "TextFieldAutoSize": TextFieldAutoSize,
            "TextFieldType": TextFieldType,
            "TextFormat": TextFormat,
            "TextFormatAlign": TextFormatAlign,
            "TextLineMetrics": TextLineMetrics,
            "TextRenderer": TextRenderer,
            "TextSnapshot": TextSnapshot
        },
        "media": {
            "AVNetworkingParams": AVNetworkingParams,
            "AVURLLoader": AVURLLoader,
            "AVURLStream": AVURLStream,
            "Camera": Camera,
            "ID3Info": ID3Info,
            "Microphone": Microphone,
            "Sound": Sound,
            "SoundChannel": SoundChannel,
            "SoundCodec": SoundCodec,
            "SoundLoaderContext": SoundLoaderContext,
            "SoundMixer": SoundMixer,
            "SoundTransform": SoundTransform,
            "StageVideo": StageVideo,
            "StageVideoAvailability": StageVideoAvailability,
            "StageVideoAvailabilityReason": StageVideoAvailabilityReason,
            "Video": Video,
            "VideoStatus": VideoStatus
        },
        "filters": {
            "BevelFilter": BevelFilter,
            "BitmapFilter": BitmapFilter,
            "BitmapFilterQuality": BitmapFilterQuality,
            "BitmapFilterType": BitmapFilterType,
            "BlurFilter": BlurFilter,
            "ColorMatrixFilter": ColorMatrixFilter,
            "ConvolutionFilter": ConvolutionFilter,
            "DisplacementMapFilter": DisplacementMapFilter,
            "DisplacementMapFilterMode": DisplacementMapFilterMode,
            "DropShadowFilter": DropShadowFilter,
            "GlowFilter": GlowFilter,
            "GradientBevelFilter": GradientBevelFilter,
            "GradientGlowFilter": GradientGlowFilter,
            "ShaderFilter": ShaderFilter
        },
        "net": {
            "FileFilter": FileFilter,
            "FileReference": FileReference,
            "FileReferenceList": FileReferenceList,
            "GroupSpecifier": GroupSpecifier,
            "LocalConnection": LocalConnection,
            "NetConnection": NetConnection,
            "NetGroup": NetGroup,
            "NetGroupInfo": NetGroupInfo,
            "NetGroupReceiveMode": NetGroupReceiveMode,
            "NetGroupReplicationStrategy": NetGroupReplicationStrategy,
            "NetGroupSendMode": NetGroupSendMode,
            "NetGroupSendResult": NetGroupSendResult,
            "NetStream": NetStream,
            "NetStreamAppendBytesAction": NetStreamAppendBytesAction,
            "NetStreamInfo": NetStreamInfo,
            "NetStreamMulticastInfo": NetStreamMulticastInfo,
            "NetStreamPlayOptions": NetStreamPlayOptions,
            "NetStreamPlayTransitions": NetStreamPlayTransitions,
            "ObjectEncoding": ObjectEncoding,
            "Responder": Responder,
            "SecureSocket": SecureSocket,
            "SharedObject": SharedObject,
            "SharedObjectFlushStatus": SharedObjectFlushStatus,
            "Socket": Socket,
            "URLLoader": URLLoader,
            "URLLoaderDataFormat": URLLoaderDataFormat,
            "URLRequest": URLRequest,
            "URLRequestHeader": URLRequestHeader,
            "URLRequestMethod": URLRequestMethod,
            "URLStream": URLStream,
            "URLVariables": URLVariables,
            "XMLSocket": XMLSocket
        },
        "system": {
            "fscommand": function ()
            {
                var command = arguments[0];
                var args    = arguments[1];
                if (args === undefined) {
                    args = "";
                }

                switch (command) {
                    case "quit":
                    case "fullscreen":
                    case "allowscale":
                    case "showmenu":
                    case "exec":
                    case "trapallkeys":
                        break;
                    default:
                        if (command) {
                            var method    = (this.tagId) ? this.tagId : this.getName();
                            var body      = method +"_DoFSCommand(command, args);";
                            var fscommand = new Func("command", "args", body);
                            fscommand(command, args);
                        }
                        break;
                }

                return true;
            }
        }
    }
};
/*jshint bitwise: false*/
/**
 * @constructor
 */
var BitIO = function ()
{
    this.data        = null;
    this.bit_offset  = 0;
    this.byte_offset = 0;
    this.bit_buffer  = null;
};

/**
 * util
 */
BitIO.prototype = Object.create(Util.prototype);
BitIO.prototype.constructor = BitIO;

/**
 * @param data
 */
BitIO.prototype.generate = function (data)
{
    var length = 0 | data.length;
    var array  = this.createArray(length);

    var i = 0;
    while (i < length) {
        array[i] = data.charCodeAt(i) & 0xff;
        i = (i + 1)|0;
    }

    this.data = array;
};

/**
 * @param str
 * @returns {XML|string|void|*}
 */
BitIO.prototype.decodeToShiftJis = function (str)
{
    var self = this;
    return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig,
        function (s)
        {
            var c = self.$parseInt(s.substring(1, 3), 16);
            var l = s.length;
            return 3 === l ? self.$fromCharCode(c < 160 ? c : c + 65216) : self.$JCT11280.charAt((c < 160 ? c - 129 : c - 193) * 188 + (4 === l ? s.charCodeAt(3) - 64 : (c = self.$parseInt(s.substring(4), 16)) < 127 ? c - 64 : c - 65));
        }
    );
};

/**
 * @param compressed
 * @param size
 * @returns {*}
 */
BitIO.prototype.unlzma = function (compressed, size)
{

    var self = this;

    /**
     * @param buffer
     * @constructor
     */
    var InputStream = function (buffer)
    {
        this.buffer    = buffer;
        this.processed = 0;
    };

    /**
     * properties
     */
    Object.defineProperties(DisplayObject.prototype, {
        available: {
            get: function () {
                return (this.buffer.length - this.processed)|0;
            }
        }
    });

    /**
     * @returns {*}
     */
    InputStream.prototype.readByte = function ()
    {
        var value = this.buffer[this.processed]|0;

        this.processed = (this.processed + 1)|0;

        return value;
    };

    /**
     * @param size
     * @constructor
     */
    var OutputStream = function (size)
    {
        this.buffer    = self.$canArrayBuffer ? new Uint8Array(size) : [];
        this.processed = 0;
    };

    /**
     * @returns {Array}
     */
    OutputStream.prototype.getBuffer = function ()
    {
        return this.buffer;
    };

    /**
     * @param data
     */
    OutputStream.prototype.add = function (data)
    {
        var length = data.length|0;
        var idx = 0;
        while (idx < length) {
            this.buffer[this.processed] = data[idx]|0;

            this.processed = (this.processed + 1)|0;

            idx = (idx + 1)|0;
        }
    };

    /**
     * @param outStream
     * @constructor
     */
    var OutWindow = function (outStream)
    {
        this.outStream = outStream;
        this.buf       = null;
        this.pos       = 0;
        this.size      = 0;
        this.isFull    = false;
        this.writePos  = 0;
        this.totalPos  = 0;
    };

    /**
     * @param dictSize
     */
    OutWindow.prototype.create = function (dictSize)
    {
        this.buf      = (self.$canArrayBuffer) ? new Uint8Array(dictSize) : [];
        this.pos      = 0;
        this.size     = dictSize;
        this.isFull   = false;
        this.writePos = 0;
        this.totalPos = 0;
    };

    /**
     * @param byte
     */
    OutWindow.prototype.putByte = function (byte)
    {
        this.totalPos = (this.totalPos + 1)|0;

        this.buf[this.pos] = byte;
        this.pos = (this.pos + 1)|0;

        if (this.pos === this.size) {
            this.flush();
            this.pos    = 0;
            this.isFull = true;
        }
    };

    /**
     * @param dist
     * @returns {*}
     */
    OutWindow.prototype.getByte = function (dist)
    {
        return this.buf[dist <= this.pos ? this.pos - dist : this.size - dist + this.pos];
    };

    /**
     * flush
     */
    OutWindow.prototype.flush = function ()
    {
        if (this.writePos < this.pos) {
            var length = this.pos - this.writePos;

            var data   = self.$canArrayBuffer ? new Uint8Array(length) : [];

            var buffer = this.buf;

            var i = this.writePos;
            while (i < this.pos) {
                data[i] = buffer[i];
                i = (i + 1)|0;
            }

            this.outStream.add(data);
            this.writePos = (this.pos === this.size) ? 0 : this.pos|0;
        }
    };

    /**
     * @param dist
     * @param len
     */
    OutWindow.prototype.copyMatch = function (dist, len)
    {
        var pos    = this.pos;
        var size   = this.size;
        var buffer = this.buf;
        var getPos = (dist <= pos) ? pos - dist : size - dist + pos;
        var left   = len;
        while (left > 0) {
            var chunk = self.$min(self.$min(left, size - pos), size - getPos);

            var i = 0;
            while (i < chunk) {
                var b  = buffer[getPos];
                getPos = (getPos + 1)|0;

                buffer[pos] = b;
                pos = (pos + 1)|0;

                i  = (i + 1)|0;
            }

            if (pos === size) {
                this.pos = pos;
                this.flush();
                pos = 0;
                this.isFull = true;
            }

            if (getPos === size) {
                getPos = 0;
            }

            left = (left - chunk)|0;
        }
        this.pos = pos;
        this.totalPos = (this.totalPos + len)|0;

    };

    /**
     * @param dist
     * @returns {boolean}
     */
    OutWindow.prototype.checkDistance = function(dist)
    {
        return (dist <= this.pos) || this.isFull;
    };

    /**
     * @returns {boolean}
     */
    OutWindow.prototype.isEmpty = function()
    {
        return (this.pos === 0) && !this.isFull;
    };

    /**
     * @param inStream
     * @constructor
     */
    var RangeDecoder = function (inStream)
    {
        this.inStream = inStream;
        this.range    = 0;
        this.code     = 0;
    };

    /**
     * init
     */
    RangeDecoder.prototype.init = function ()
    {
        this.inStream.readByte(); // rev

        this.range = 0xFFFFFFFF | 0;

        var code = 0;
        var i = 0;
        while (i < 4) {
            code = (code << 8) | this.inStream.readByte();
            i = (i + 1)|0;
        }

        this.code = code;
    };

    /**
     * @returns {boolean}
     */
    RangeDecoder.prototype.isFinishedOK = function ()
    {
        return (this.code === 0);
    };

    /**
     * @param numBits
     * @returns {number}
     */
    RangeDecoder.prototype.decodeDirectBits = function (numBits)
    {
        var res   = 0;
        var range = this.range;
        var code  = this.code;

        while (numBits) {
            range = (range >>> 1) | 0;
            code = (code - range) | 0;

            var t = code >> 31;
            code = (code + (range & t)) | 0;

            if (range >= 0 && range < 16777216) {
                range = range << 8;
                code = (code << 8) | this.inStream.readByte();
            }

            res = ((res << 1) + t + 1) | 0;

            numBits = (numBits - 1)|0;
        }

        this.range = range;
        this.code  = code;

        return res;
    };

    /**
     * @param prob
     * @param index
     * @returns {*}
     */
    RangeDecoder.prototype.decodeBit = function (prob, index)
    {
        var range = this.range;
        var code  = this.code;

        var v     = prob[index]|0;
        var bound = (range >>> 11) * v;

        var symbol;
        if ((code >>> 0) < bound) {
            v = (v + ((2048 - v) >> 5)) | 0;

            range  = bound | 0;
            symbol = 0;
        } else {
            v = (v - (v >> 5)) | 0;

            code   = (code - bound) | 0;
            range  = (range - bound) | 0;
            symbol = 1;
        }
        prob[index] = v & 0xFFFF;

        if (range >= 0 && range < 16777216) {
            range = range << 8;
            code  = (code << 8) | this.inStream.readByte();
        }

        this.range = range;
        this.code  = code;

        return symbol;
    };

    /**
     * @param numBits
     * @constructor
     */
    var BitTreeDecoder = function (numBits)
    {
        this.numBits = numBits;
        this.probs   = this.createProbsArray(1 << numBits);
    };

    /**
     * @param length
     * @returns {*}
     */
    BitTreeDecoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param rc
     * @returns {number}
     */
    BitTreeDecoder.prototype.decode = function (rc)
    {
        var m = 1;
        var i = 0;
        var numBits = this.numBits;

        while (i < numBits) {
            i = (i + 1)|0;
            m = (m << 1) + rc.decodeBit(this.probs, m);
        }

        return m - (1 << this.numBits);
    };

    /**
     * @param rc
     * @returns {number|*}
     */
    BitTreeDecoder.prototype.reverseDecode = function (rc)
    {
        return this.bitTreeReverseDecode(this.probs, 0, this.numBits, rc);
    };

    /**
     * @param probs
     * @param offset
     * @param numBits
     * @param rc
     * @returns {number}
     */
    BitTreeDecoder.prototype.bitTreeReverseDecode = function (probs, offset, numBits, rc)
    {
        var m = 1;
        var symbol = 0;
        var i = 0;
        while (i < numBits) {
            var bit = rc.decodeBit(probs, m + offset);
            m = (m << 1) + bit;
            symbol |= bit << i;

            i = (i + 1)|0;
        }

        return symbol;
    };

    /**
     *
     * @constructor
     */
    var LenDecoder = function ()
    {
        this.choice    = this.createProbsArray(2);
        this.lowCoder  = this.createBitTreeDecoderArray(3, 16);
        this.midCoder  = this.createBitTreeDecoderArray(3, 16);
        this.highCoder = new BitTreeDecoder(8);
    };

    /**
     * @param length
     * @returns {*}
     */
    LenDecoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param numBits
     * @param length
     * @returns {Array}
     */
    LenDecoder.prototype.createBitTreeDecoderArray = function (numBits, length)
    {
        var p = [];
        p.length = length;

        var i = 0;
        while (i < length) {
            p[i] = new BitTreeDecoder(numBits);
            i = (i + 1)|0;
        }

        return p;
    };

    /**
     * @param rc
     * @param posState
     * @returns {*}
     */
    LenDecoder.prototype.decode = function (rc, posState)
    {
        if (rc.decodeBit(this.choice, 0) === 0) {
            return this.lowCoder[posState].decode(rc);
        }

        if (rc.decodeBit(this.choice, 1) === 0) {
            return 8 + this.midCoder[posState].decode(rc);
        }

        return 16 + this.highCoder.decode(rc);
    };

    /**
     * @param data
     * @param size
     * @constructor
     */
    var Decoder = function (data, size)
    {
        var inStream  = new InputStream(data);
        var outStream = new OutputStream(size);

        this.outStream = outStream;
        this.rangeDec  = new RangeDecoder(inStream);
        this.outWindow = new OutWindow(outStream);

        this.lc = 0;
        this.pb = 0;
        this.lp = 0;

        this.dictSize             = 0;
        this.dictSizeInProperties = 0;
        this.leftToUnpack         = undefined;

        this.reps  = (self.$canArrayBuffer) ? new Int32Array(4) : [];
        this.state = 0;

        var header = (self.$canArrayBuffer) ? new Uint8Array(13) : [];
        var i = 0;
        while (i < 13) {
            header[i] = inStream.readByte()|0;
            i = (i + 1)|0;
        }

        var unpackSize = 0;
        var unpackSizeDefined = false;
        i = 0;
        while (i < 8) {
            var b = header[5 + i];
            if (b !== 0xFF) {
                unpackSizeDefined = true;
            }

            unpackSize |= b << (8 * i);

            i = (i + 1)|0;
        }

        this.markerIsMandatory = !unpackSizeDefined;
        this.unpackSize = unpackSizeDefined ? unpackSize : undefined;

        this.decodeProperties(header);
    };

    /**
     * @param properties
     * @returns {Decoder}
     */
    Decoder.prototype.decodeProperties = function (properties)
    {
        var d = properties[0]|0;

        this.lc = d % 9;

        d = (d / 9)|0;
        this.pb = (d / 5)|0;
        this.lp = d % 5;

        this.dictSizeInProperties = 0;

        var i = 0;
        while (i < 4) {
            this.dictSizeInProperties |= properties[i + 1] << (8 * i);
            i = (i + 1)|0;
        }

        this.dictSize = this.dictSizeInProperties;
        if (this.dictSize < 4096) {
            this.dictSize = 4096;
        }
    };

    /**
     * @returns {Decoder}
     */
    Decoder.prototype.create = function ()
    {
        this.outWindow.create(this.dictSize);

        this.init();
        this.rangeDec.init();

        this.reps[0] = 0;
        this.reps[1] = 0;
        this.reps[2] = 0;
        this.reps[3] = 0;

        this.state = 0;
        this.leftToUnpack = this.unpackSize;

        return this;
    };

    /**
     * @param state
     * @param rep0
     * @returns {number}
     */
    Decoder.prototype.decodeLiteral = function (state, rep0)
    {
        var outWindow = this.outWindow;
        var rangeDec  = this.rangeDec;

        var prevByte = 0;
        if (!outWindow.isEmpty()) {
            prevByte = outWindow.getByte(1);
        }

        var symbol     = 1;
        var litState   = ((outWindow.totalPos & ((1 << this.lp) - 1)) << this.lc) + (prevByte >> (8 - this.lc));
        var probsIndex = 0x300 * litState;

        if (state >= 7) {
            var matchByte = outWindow.getByte(rep0 + 1);
            do {
                var matchBit = (matchByte >> 7) & 1;
                matchByte <<= 1;

                var bit = rangeDec.decodeBit(this.litProbs, probsIndex + (((1 + matchBit) << 8) + symbol));

                symbol = (symbol << 1) | bit;
                if (matchBit !== bit) {
                    break;
                }
            } while (symbol < 0x100);
        }

        while (symbol < 0x100) {
            symbol = (symbol << 1) | rangeDec.decodeBit(this.litProbs, probsIndex + symbol);
        }

        return (symbol - 0x100) & 0xFF;
    };

    /**
     * @param length
     * @returns {*}
     */
    Decoder.prototype.decodeDistance = function (length)
    {
        var lenState = length;
        if (lenState > 3) {
            lenState = 3;
        }

        var rangeDec = this.rangeDec;
        var posSlot  = this.posSlotDecoder[lenState].decode(rangeDec);
        if (posSlot < 4) {
            return posSlot;
        }

        var numDirectBits = (posSlot >> 1) - 1;
        var dist = (2 | (posSlot & 1)) << numDirectBits;
        if (posSlot < 14) {
            dist = (dist + this.bitTreeReverseDecode(this.posDecoders, dist - posSlot, numDirectBits, rangeDec)) | 0;
        } else {
            dist = (dist + (rangeDec.decodeDirectBits(numDirectBits - 4) << 4)) | 0;
            dist = (dist + this.alignDecoder.reverseDecode(rangeDec)) | 0;
        }

        return dist;
    };

    /**
     * @param probs
     * @param offset
     * @param numBits
     * @param rc
     * @returns {number}
     */
    Decoder.prototype.bitTreeReverseDecode = function (probs, offset, numBits, rc)
    {
        var m = 1;
        var symbol = 0;
        var i = 0;
        while (i < numBits) {
            var bit = rc.decodeBit(probs, m + offset);
            m = (m << 1) + bit;
            symbol |= bit << i;

            i = (i + 1)|0;
        }

        return symbol;
    };

    /**
     * init
     */
    Decoder.prototype.init = function ()
    {
        this.litProbs       = this.createProbsArray(0x300 << (this.lc + this.lp));

        this.posSlotDecoder = this.createBitTreeDecoderArray(6, 4);
        this.alignDecoder   = new BitTreeDecoder(4);
        this.posDecoders    = this.createProbsArray(115);

        this.isMatch    = this.createProbsArray(192);
        this.isRep      = this.createProbsArray(12);
        this.isRepG0    = this.createProbsArray(12);
        this.isRepG1    = this.createProbsArray(12);
        this.isRepG2    = this.createProbsArray(12);
        this.isRep0Long = this.createProbsArray(192);

        this.lenDecoder    = new LenDecoder();
        this.repLenDecoder = new LenDecoder();
    };

    /**
     * @param numBits
     * @param length
     */
    Decoder.prototype.createBitTreeDecoderArray = function (numBits, length)
    {
        var p = [];
        p.length = length;

        var i = 0;
        while (i < length) {
            p[i] = new BitTreeDecoder(numBits);
            i = (i + 1)|0;
        }

        return p;
    };

    /**
     * @param length
     * @returns {*}
     */
    Decoder.prototype.createProbsArray = function (length)
    {
        var p = (self.$canArrayBuffer) ? new Uint16Array(length) : [];
        var i = 0;
        while (i < length) {
            p[i] = 1024;
            i = (i + 1)|0;
        }
        return p;
    };

    /**
     * @param state
     * @returns {number}
     */
    Decoder.prototype.updateStateLiteral = function (state)
    {
        if (state < 4) {
            return 0;
        } else if (state < 10) {
            return state - 3;
        } else {
            return state - 6;
        }
    };

    /**
     * @returns {*}
     */
    Decoder.prototype.decode = function()
    {
        var rangeDec          = this.rangeDec;
        var outWindow         = this.outWindow;
        var pb                = this.pb;
        var markerIsMandatory = this.markerIsMandatory;
        var leftToUnpack      = this.leftToUnpack;

        var isMatch       = this.isMatch;
        var isRep         = this.isRep;
        var isRepG0       = this.isRepG0;
        var isRepG1       = this.isRepG1;
        var isRepG2       = this.isRepG2;
        var isRep0Long    = this.isRep0Long;
        var lenDecoder    = this.lenDecoder;
        var repLenDecoder = this.repLenDecoder;

        var rep0  = this.reps[0];
        var rep1  = this.reps[1];
        var rep2  = this.reps[2];
        var rep3  = this.reps[3];
        var state = this.state;

        while (true) {
            if (rangeDec.inStream.available < 48) {
                this.outWindow.flush();
                break;
            }

            if (leftToUnpack === 0 && !markerIsMandatory) {
                this.outWindow.flush();
            }

            var posState = outWindow.totalPos & ((1 << pb) - 1);

            if (rangeDec.decodeBit(isMatch, (state << 4) + posState) === 0) {
                outWindow.putByte(this.decodeLiteral(state, rep0));
                state = this.updateStateLiteral(state);

                leftToUnpack = (leftToUnpack - 1)|0;
                continue;
            }

            var length;
            if (rangeDec.decodeBit(isRep, state) !== 0) {
                if (rangeDec.decodeBit(isRepG0, state) === 0) {
                    if (rangeDec.decodeBit(isRep0Long, (state << 4) + posState) === 0) {
                        state = (state < 7) ? 9 : 11;
                        outWindow.putByte(outWindow.getByte(rep0 + 1));
                        leftToUnpack = (leftToUnpack - 1)|0;
                        continue;
                    }
                } else {
                    var dist;
                    if (rangeDec.decodeBit(isRepG1, state) === 0) {
                        dist = rep1;
                    } else {
                        if (rangeDec.decodeBit(isRepG2, state) === 0) {
                            dist = rep2;
                        } else {
                            dist = rep3;
                            rep3 = rep2;
                        }
                        rep2 = rep1;
                    }
                    rep1 = rep0;
                    rep0 = dist;
                }
                length = repLenDecoder.decode(rangeDec, posState);
                state  = (state < 7) ? 8 : 11;
            } else {
                rep3   = rep2;
                rep2   = rep1;
                rep1   = rep0;
                length = lenDecoder.decode(rangeDec, posState);
                state  = (state < 7) ? 7 : 10;
                rep0   = this.decodeDistance(length);

                // end
                if (rep0 === -1) {
                    this.outWindow.flush();
                    return this;
                }
            }

            length = (length + 2)|0;
            if (leftToUnpack !== undefined && leftToUnpack < length) {
                length = leftToUnpack;
            }

            outWindow.copyMatch(rep0 + 1, length);
            leftToUnpack = (leftToUnpack - length)|0;
        }
    };

    /**
     * @returns {Array}
     */
    Decoder.prototype.output = function ()
    {
        return this.outStream.getBuffer();
    };


    // swf header rebuild
    var header = [];

    var idx = 12;
    while (idx < 17) {
        header[header.length] = compressed[idx];
        idx = (idx + 1)|0;
    }

    idx = 4;
    while (idx < 8) {
        header[header.length] = compressed[idx];
        idx = (idx + 1)|0;
    }

    var c = 8;
    var i = 5;
    while (i < 9) {
        if (header[i] >= c) {
            header[i] = (header[i] - c)|0;
            break;
        }
        header[i] = (256 + header[i] - c)|0;
        c = 1;
        i = (i + 1)|0;
    }

    idx = 0;
    while (idx < 4) {
        header[header.length] = 0;
        idx = (idx + 1)|0;
    }

    var length = header.length;
    i = 0;
    idx = 4;
    while (i < length) {
        compressed[i + idx] = header[i]|0;
        i = (i + 1)|0;
    }

    // new data
    var data = (this.$canArrayBuffer) ? new Uint8Array(compressed.slice(4)) : compressed.slice(4);

    var decoder = new Decoder(data, size);

    return decoder
        .create()
        .decode()
        .output();
};

/**
 * @param compressed
 * @param isDeCompress
 * @returns {Array}
 */
BitIO.prototype.unzip = function (compressed, isDeCompress)
{
    var sym        = 0;
    var i          = 0;
    var length     = 0;
    var data       = [];
    var bitLengths = [];

    var bitio = new BitIO();
    bitio.setData(compressed);

    var ORDER =
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

    var LEXT = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99
    ];

    var LENS = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ];

    var DEXT = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13
    ];

    var DISTS = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
        257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
        8193, 12289, 16385, 24577
    ];

    if (this.$canArrayBuffer) {
        ORDER = new Uint8Array(ORDER);
        LEXT  = new Uint8Array(LEXT);
        DEXT  = new Uint8Array(DEXT);
        LENS  = new Uint16Array(LENS);
        DISTS = new Uint16Array(DISTS);
    }

    var startOffset = 2;
    if (isDeCompress) {
        startOffset = 10;
    }
    bitio.setOffset(startOffset, 8);

    var flag = 0;
    while (!flag) {
        flag = bitio.readUB(1);

        var type = bitio.readUB(2);

        var distTable      = {};
        var litTable       = {};
        var fixedDistTable = false;
        var fixedLitTable  = false;

        if (type) {
            if (type === 1) {
                distTable = fixedDistTable;
                litTable  = fixedLitTable;

                if (!distTable) {
                    bitLengths = [];
                    i = 32;
                    while (i) {
                        i = (i - 1)|0;
                        bitLengths[bitLengths.length] = 5;
                    }
                    distTable = fixedDistTable = this.buildHuffTable(bitLengths);
                }

                if (!litTable) {
                    bitLengths = [];

                    i = 0;
                    while (i < 144) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 8;
                    }

                    while (i < 256) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 9;
                    }

                    while (i < 280) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 7;
                    }

                    while (i < 288) {
                        i = (i + 1)|0;
                        bitLengths[bitLengths.length] = 8;
                    }

                    litTable = fixedLitTable = this.buildHuffTable(bitLengths);
                }
            } else {
                var numLitLengths  = bitio.readUB(5) + 257;
                var numDistLengths = bitio.readUB(5) + 1;
                var numCodeLengths = bitio.readUB(4) + 4;
                var codeLengths    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                if (this.$canArrayBuffer) {
                    codeLengths = new Uint8Array(codeLengths);
                }

                i = 0;
                while (i < numCodeLengths) {
                    codeLengths[ORDER[i]] = bitio.readUB(3);
                    i = (i + 1)|0;
                }

                var codeTable = this.buildHuffTable(codeLengths);
                codeLengths   = null;

                var litLengths  = [];
                var prevCodeLen = 0;
                var maxLengths  = (numLitLengths + numDistLengths)|0;
                while (litLengths.length < maxLengths) {
                    sym = this.decodeSymbol(bitio, codeTable);
                    switch (sym) {
                        case 16:
                            i = (bitio.readUB(2) + 3)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = prevCodeLen;
                            }
                            break;
                        case 17:
                            i = (bitio.readUB(3) + 3)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = 0;
                            }
                            break;
                        case 18:
                            i = (bitio.readUB(7) + 11)|0;
                            while (i) {
                                i = (i - 1)|0;
                                litLengths[litLengths.length] = 0;
                            }
                            break;
                        default:
                            if (sym <= 15) {
                                litLengths[litLengths.length] = sym;
                                prevCodeLen = sym;
                            }
                            break;
                    }
                }
                distTable = this.buildHuffTable(litLengths.splice(numLitLengths, numDistLengths));
                litTable  = this.buildHuffTable(litLengths);
            }

            sym = 0;
            while (sym !== 256) {
                sym = this.decodeSymbol(bitio, litTable)|0;
                if (sym < 256) {
                    data[data.length] = sym;
                } else if (sym > 256) {
                    var mapIdx = (sym - 257)|0;
                    length     = (LENS[mapIdx] + bitio.readUB(LEXT[mapIdx]))|0;

                    var distMap = this.decodeSymbol(bitio, distTable);
                    var dist    = (DISTS[distMap] + bitio.readUB(DEXT[distMap]))|0;

                    i = (data.length - dist)|0;
                    while (length) {
                        length = (length - 1)|0;
                        data[data.length] = data[i];
                        i = (i + 1)|0;
                    }
                }
            }
        } else {
            bitio.bit_offset = 8;
            bitio.bit_buffer = null;

            length = bitio.readNumber(2)|0;
            bitio.readNumber(2); // nlen

            while (length) {
                length = (length - 1)|0;
                data[data.length] = bitio.readNumber(1);
            }
        }
    }
    return data;
};

/**
 * @param data
 * @returns {{}}
 */
BitIO.prototype.buildHuffTable = function (data)
{
    var length   = data.length|0;
    var code     = 0;
    var idx      = 0;
    var maxBits  = 0;
    var blCount  = [];
    var nextCode = [];
    var table    = {};

    var i = 0;
    while (i < length) {
        maxBits = this.$max(maxBits, data[i]);
        i = (i + 1)|0;
    }

    maxBits = (maxBits + 1)|0;

    i = length;
    while (i) {
        i = (i - 1)|0;

        idx = data[i];
        blCount[idx] = (blCount[idx] || 0) + (idx > 0);
    }

    i = 1;
    while (i < maxBits) {
        idx = (i - 1)|0;
        if (!(idx in blCount)) {
            blCount[idx] = 0;
        }

        code = (code + blCount[idx]) << 1;
        nextCode[i] = code|0;

        i = (i + 1)|0;
    }

    i = 0;
    while (i < length) {
        idx = data[i];
        if (idx) {
            table[nextCode[idx]] = {
                length: idx,
                symbol: i
            };

            nextCode[idx] = (nextCode[idx] + 1)|0;
        }

        i = (i + 1)|0;
    }

    return table;
};

/**
 * @param bitio
 * @param table
 * @returns {*}
 */
BitIO.prototype.decodeSymbol = function (bitio, table)
{
    var code   = 0;
    var length = 0;

    while (true) {
        code   = (code << 1) | bitio.readUB(1);
        length = (length + 1)|0;
        if (!(code in table)) {
            continue;
        }

        var entry = table[code];
        if (entry.length === length) {
            return entry.symbol;
        }
    }
};

/**
 * @param length
 * @returns {Array}
 */
BitIO.prototype.createArray = function (length)
{
    return (this.$canArrayBuffer) ? new Uint8Array(length) : [];
};

/**
 * @param data
 */
BitIO.prototype.setData = function (data)
{
    this.data = data;
};

/**
 * @returns {string}
 */
BitIO.prototype.getHeaderSignature = function ()
{
    var str   = "";
    var count = 3;
    while (count) {
        var code = this.getUI8();
        switch (code) {
            // trim
            case 32:
            case 96:
            case 127:
                continue;
            default:
                break;
        }

        str  += this.$fromCharCode(code);
        count = (count - 1)|0;
    }

    return str;
};

/**
 * @returns {number}
 */
BitIO.prototype.getVersion = function ()
{
    return this.getUI8();
};

/**
 * byteAlign
 */
BitIO.prototype.byteAlign = function ()
{
    if (!this.bit_offset) {
        return;
    }

    this.byte_offset = (this.byte_offset + (this.bit_offset + 7) / 8)|0;
    this.bit_offset  = 0;
};

/**
 * @param length
 * @returns {Array}
 */
BitIO.prototype.getData = function (length)
{
    this.byteAlign();

    var array = this.createArray(length);
    var key   = 0;
    var data  = this.data;
    var limit = length;

    while (limit) {
        array[key] = data[this.byte_offset];

        key = (key + 1)|0;

        this.byte_offset = (this.byte_offset + 1)|0;

        limit = (limit - 1)|0;
    }

    return array;
};

/**
 * @param value
 * @param isJis
 * @returns {string}
 */
BitIO.prototype.getDataUntil = function (value, isJis)
{
    this.byteAlign();

    var data   = this.data;
    var bo     = this.byte_offset|0;
    var offset = 0;
    if (value === null) {
        offset = -1;
    } else {
        var length = data.length|0;
        while (true) {
            var val = data[bo + offset];
            offset  = (offset + 1)|0;

            if (val === 0 || (bo + offset) >= length) {
                break;
            }
        }
    }

    var n = (offset === -1) ? data.length - bo : offset;
    var array = [];
    var ret = "";
    var _join = Array.prototype.join;
    var i = 0;
    if (value !== null) {
        i = 0;
        while (i < n) {
            var code = data[bo + i];
            i = (i + 1)|0;

            if (code === 10 || code === 13) {
                array[array.length] = "\n";
            }
            if (code < 32) {
                continue;
            }
            array[array.length] = "%" + code.toString(16);
        }

        if (array.length) {
            var str = _join.call(array, "");
            if (str.length > 5 && str.substr(-5) === "\n") {
                str = str.slice(0, -5);
            }

            if (isJis) {
                ret = this.decodeToShiftJis(str);
            } else {
                try {
                    ret = decodeURIComponent(str);
                } catch (e) {
                    ret = this.decodeToShiftJis(str);
                }
            }
        }
    } else {
        i = 0;
        while (i < n) {
            ret += this.$fromCharCode(data[bo + i]);
            i = (i + 1)|0;
        }
    }

    this.byte_offset = bo + n;

    return ret;
};

/**
 * byteCarry
 */
BitIO.prototype.byteCarry = function ()
{
    if (this.bit_offset > 7) {
        this.byte_offset  = this.byte_offset + (0 | (this.bit_offset + 7) / 8);
        this.bit_offset  &= 0x07;
    } else {
        while (this.bit_offset < 0) {
            this.byte_offset = (this.byte_offset - 1)|0;
            this.bit_offset  = (this.bit_offset + 8)|0;
        }
    }
};

/**
 * @param number
 * @returns {number}
 */
BitIO.prototype.getUIBits = function (number)
{
    var value = 0;
    while (number) {
        value <<= 1;
        value  |= this.getUIBit();
        number  = (number - 1)|0;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUIBit = function ()
{
    this.byteCarry();

    var number = (this.data[this.byte_offset] >> (7 - this.bit_offset)) & 0x1;

    this.bit_offset = (this.bit_offset + 1)|0;

    return number;
};

/**
 * @param number
 * @returns {number}
 */
BitIO.prototype.getSIBits = function (number)
{
    var value = this.getUIBits(number);
    var msb   = value & (0x1 << (number - 1));
    if (msb) {
        return -(value ^ (2 * msb - 1)) - 1;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI8 = function ()
{
    this.byteAlign();
    var value = this.data[this.byte_offset];
    this.byte_offset = (this.byte_offset + 1)|0;
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI16 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8()) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI24 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8() | (this.getUI8()) << 8) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI32 = function ()
{
    this.byteAlign();
    return (this.getUI8() | (this.getUI8() | (this.getUI8() | (this.getUI8()) << 8) << 8) << 8);
};

/**
 * @returns {number}
 */
BitIO.prototype.getUI16BE = function ()
{
    this.byteAlign();
    return (((this.getUI8()) << 8) | (this.getUI8()));
};

/**
 * @returns {*}
 */
BitIO.prototype.getFloat16 = function ()
{
    var data  = this.getData(2);
    var float = 0;
    float |= data[1] << 8;
    float |= data[0] << 0;
    return float;
};

/**
 * @returns {*}
 */
BitIO.prototype.getFloat32 = function ()
{
    var data = this.getData(4);
    var rv   = 0;
    rv |= data[3] << 24;
    rv |= data[2] << 16;
    rv |= data[1] << 8;
    rv |= data[0] << 0;

    var sign     = rv & 0x80000000;
    var exp      = (rv >> 23) & 0xff;
    var fraction = rv & 0x7fffff;
    if (!rv || rv === 0x80000000) {
        return 0;
    }

    return (sign ? -1 : 1) *
        (fraction | 0x800000) *
            this.$pow(2, (exp - 127 - 23));
};

/**
 * @returns {number}
 */
BitIO.prototype.getFloat64 = function ()
{
    var upperBits     = this.getUI32();
    var lowerBits     = this.getUI32();
    var sign          = upperBits >>> 31 & 0x1;
    var exp           = upperBits >>> 20 & 0x7FF;
    var upperFraction = upperBits & 0xFFFFF;

    return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) *
        (upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) *
            this.$pow(2, exp - 1023);
};

/**
 * @returns {number}
 */
BitIO.prototype.getFloat64LittleEndian = function ()
{
    var signBits     = 1;
    var exponentBits = 11;
    var fractionBits = 52;
    var min          = -1022;
    var max          = 1023;

    var str = "";
    var i   = 0;
    while (i < 8) {
        var bits = this.getUI8().toString(2);
        while (bits.length < 8) {
            bits = "0" + bits;
        }
        str = bits + str;
        i = (i + 1)|0;
    }

    var sign            = (str.charAt(0) === "1") ? -1 : 1;
    var exponent        = this.$parseInt(str.substr(signBits, exponentBits), 2) - max;
    var significandBase = str.substr(signBits + exponentBits, fractionBits);
    var significandBin  = "1"+ significandBase;

    var val         = 1;
    var significand = 0;
    if (exponent === -max) {
        if (significandBase.indexOf("1") === -1) {
            return 0;
        } else {
            exponent       = min;
            significandBin = "0"+ significandBase;
        }
    }

    var l = 0;
    while (l < significandBin.length) {
        var sb = significandBin.charAt(l)|0;
        significand = significand + val * sb;

        val = val / 2;
        l   = (l + 1)|0;
    }

    return sign * significand * this.$pow(2, exponent);
};

/**
 * @param data
 * @returns {number}
 */
BitIO.prototype.toUI16 = function (data)
{
    return data[0] + (data[1] << 8);
};

/**
 * @param data
 * @returns {number}
 */
BitIO.prototype.toSI16LE = function (data)
{
    var value = this.toUI16(data);
    return (value < 0x8000) ? value : (value - 0x10000);
};

/**
 * @returns {number}
 */
BitIO.prototype.getSI8 = function ()
{
    var value = this.getUI8();
    if (value >> 7) { // nBits = 8;
        value = (value - 256)|0; // Math.pow(2, 8)
    }
    return value;
};

/**
 * @returns {*}
 */
BitIO.prototype.getSI24 = function ()
{
    var _this = this;
    var value = _this.getUI24();
    if (value >> 23) { // nBits = 24;
        value = (value - 16777216)|0; // Math.pow(2, 24)
    }
    return value;
};

/**
 * @param byteInt
 * @param bitInt
 */
BitIO.prototype.incrementOffset = function (byteInt, bitInt)
{
    this.byte_offset = (this.byte_offset + byteInt)|0;
    this.bit_offset  = (this.bit_offset  + bitInt)|0;
    this.byteCarry();
};

/**
 * @param byteInt
 * @param bitInt
 */
BitIO.prototype.setOffset = function (byteInt, bitInt)
{
    this.byte_offset = byteInt;
    this.bit_offset  = bitInt;
};

/**
 * @returns {number}
 */
BitIO.prototype.getU30 = function ()
{
    var value = 0;
    var i = 0;
    while (i < 5) {
        var num = this.getUI8();

        value |= ((num & 0x7f) << (7 * i));

        if (!(num & 0x80)) {
            break;
        }

        i = (i + 1)|0;
    }
    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.getS30 = function ()
{
    var startOffset = this.byte_offset;
    var value       = this.getU30();
    var nBits       = ((this.byte_offset - startOffset) * 8)|0;
    if (value >> (nBits - 1)) {
        value = (value - this.$pow(2, nBits))|0;
    }
    return value;
};

/**
 * @param offset
 * @returns {number}
 */
BitIO.prototype.ReadU30 = function (offset)
{
    var value = 0;
    var data = this.data;
    var i = 0;
    while (i < 5) {
        var num = data[offset];
        offset  = (offset + 1)|0;

        value |= ((num & 0x7f) << (7 * i));
        if (!(num & 0x80)) {
            break;
        }

        i = (i + 1)|0;
    }
    return value;
};

/**
 * @returns {string}
 */
BitIO.prototype.AbcReadString = function ()
{
    var offset = this.byte_offset;
    var length = this.ReadU30(offset) + 1;

    var ret = [];
    var i = 0;
    while (i < length) {
        i = (i + 1)|0;

        var code = this.getUI8();
        if (code < 33) {
            continue;
        }

        switch (code) {
            default:
                break;
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 43:
            case 45:
                continue;
        }

        ret[ret.length] = this.$fromCharCode(code);
    }

    return ret.join("");
};

/**
 * @param length
 * @returns {number}
 */
BitIO.prototype.readUB = function (length)
{
    var value = 0;
    var i = 0;

    while (i < length) {
        if (this.bit_offset === 8) {
            this.bit_buffer = this.readNumber(1);
            this.bit_offset = 0;
        }

        value |= (this.bit_buffer & (0x01 << this.bit_offset) ? 1 : 0) << i;
        this.bit_offset = (this.bit_offset + 1)|0;

        i = (i + 1)|0;
    }

    return value;
};

/**
 * @returns {number}
 */
BitIO.prototype.readNumber = function (n)
{
    var value = 0;

    var o = this.byte_offset;
    var i = o + n;
    while (i > o) {
        i = (i - 1)|0;
        value = (value << 8) | this.data[i];
    }

    this.byte_offset = this.byte_offset + n;
    return value;
};

/**
 * @param size
 * @param mode
 */
BitIO.prototype.deCompress = function (size, mode)
{
    var cacheOffset  = this.byte_offset;
    this.byte_offset = 0;

    // header
    var data = this.getData(cacheOffset);

    var deCompress;
    switch (mode) {
        case "ZLIB":
            deCompress = this.unzip(this.data, true);
            break;
        case "LZMA":
            deCompress = this.unlzma(this.data, size - cacheOffset);
            break;
    }

    // create new array
    var array  = this.createArray(size);

    // header
    var i      = 0;
    var key    = 0;
    var length = data.length;
    while (i < length) {
        array[key] = data[i]|0;

        key = (key + 1)|0;
        i   = (i + 1)|0;
    }

    // data
    i = 0;
    length = deCompress.length;
    while (i < length) {
        array[key] = deCompress[i]|0;

        key = (key + 1)|0;
        i   = (i + 1)|0;
    }

    this.data        = array;
    this.byte_offset = cacheOffset;
};
/*jshint bitwise: false*/
/**
 * @param stage
 * @param bitio
 * @constructor
 */
var SwfTag = function (stage, bitio)
{
    this.stage           = stage;
    this.bitio           = bitio;
    this.currentPosition = {x: 0, y: 0};
    this.jpegTables      = null;
};

/**
 * util
 */
SwfTag.prototype = Object.create(Util.prototype);
SwfTag.prototype.constructor = SwfTag;

/**
 * @returns {*}
 */
SwfTag.prototype.getStage = function()
{
    return this.stage;
};

/**
 * @returns {*}
 */
SwfTag.prototype.getBitIO = function()
{
    return this.bitio;
};

/**
 * @param mc
 * @returns {Array}
 */
SwfTag.prototype.parse = function (mc)
{
    var bitio  = this.getBitIO();
    var length = bitio.data.length|0;
    return this.parseTags(length, mc.characterId);
};

/**
 * @param tags
 * @param parent
 */
SwfTag.prototype.build = function (tags, parent)
{
    var length = tags.length|0;
    if (length) {
        var originTags = [];
        for (var frame in tags) {
            if (!tags.hasOwnProperty(frame)) {
                continue;
            }

            var tag = tags[frame];
            this.showFrame(tag, parent, originTags);
        }
    }
};

/**
 * @param obj
 * @param mc
 * @param originTags
 */
SwfTag.prototype.showFrame = function (obj, mc, originTags)
{
    var idx;
    var newDepth = [];
    var frame    = obj.frame;
    var stage    = this.getStage();

    if (!(frame in originTags)) {
        originTags[frame] = [];
    }
    mc.setTotalFrames(this.$max(mc.getTotalFrames(), frame));

    // add ActionScript
    var actions = obj.actionScript;
    if (actions.length) {
        for (idx in actions) {
            if (!actions.hasOwnProperty(idx)) {
                continue;
            }

            mc.setActions(frame, actions[idx]);
        }
    }

    // add label
    var labels = obj.labels;
    if (labels.length) {
        for (idx in labels) {
            if (!labels.hasOwnProperty(idx)) {
                continue;
            }

            var label = labels[idx];
            mc.addLabel(label.frame, label.name);
        }
    }

    // add sounds
    var sounds = obj.sounds;
    if (sounds.length) {
        for (idx in sounds) {
            if (!sounds.hasOwnProperty(idx)) {
                continue;
            }

            mc.addSound(frame, sounds[idx]);
        }
    }

    var cTags = obj.cTags;
    if (cTags.length) {
        for (idx in cTags) {
            if (!cTags.hasOwnProperty(idx)) {
                continue;
            }

            var tag = cTags[idx];
            newDepth[tag.Depth] = true;
            this.buildTag(frame, tag, mc, originTags);
        }
    }

    // remove tag
    var tags = obj.removeTags;
    if (tags.length) {
        mc.setRemoveTag(frame, tags);
        for (idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var rTag = tags[idx];
            newDepth[rTag.Depth] = true;
        }
    }

    // copy
    if (frame > 1) {
        var prevFrame = (frame - 1)|0;
        var container = mc.container;
        if (prevFrame in container) {
            var prevTags = container[prevFrame];
            if (!(frame in container)) {
                container[frame] = [];
            }

            var length = prevTags.length|0;
            if (length) {
                var parentId = mc.instanceId;
                for (var depth in prevTags) {
                    if (!prevTags.hasOwnProperty(depth)) {
                        continue;
                    }

                    if (depth in newDepth) {
                        continue;
                    }

                    container[frame][depth] = prevTags[depth];
                    stage.copyPlaceObject(parentId, depth, frame);

                    originTags[frame][depth] = originTags[prevFrame][depth];
                }
            }
        }
    }
};

/**
 * @param frame
 * @param tag
 * @param parent
 * @param originTags
 */
SwfTag.prototype.buildTag = function (frame, tag, parent, originTags)
{
    var container = parent.container;
    if (!(frame in container)) {
        container[frame] = [];
    }

    var isCopy = true;
    if (tag.PlaceFlagMove) {
        var oTag = originTags[frame - 1][tag.Depth];
        if (oTag !== undefined) {
            if (tag.PlaceFlagHasCharacter) {
                if (tag.CharacterId !== oTag.CharacterId) {
                    isCopy = false;
                }
            } else {
                tag.PlaceFlagHasCharacter = oTag.PlaceFlagHasCharacter;
                tag.CharacterId           = oTag.CharacterId;
            }

            if (!tag.PlaceFlagHasMatrix && oTag.PlaceFlagHasMatrix) {
                tag.PlaceFlagHasMatrix = oTag.PlaceFlagHasMatrix;
                tag.Matrix             = oTag.Matrix;
            }

            if (!tag.PlaceFlagHasColorTransform && oTag.PlaceFlagHasColorTransform) {
                tag.PlaceFlagHasColorTransform = oTag.PlaceFlagHasColorTransform;
                tag.ColorTransform             = oTag.ColorTransform;
            }

            if (!tag.PlaceFlagHasClipDepth && oTag.PlaceFlagHasClipDepth) {
                tag.PlaceFlagHasClipDepth = oTag.PlaceFlagHasClipDepth;
                tag.ClipDepth             = oTag.ClipDepth;
            }

            if (!tag.PlaceFlagHasClipActions && oTag.PlaceFlagHasClipActions) {
                tag.PlaceFlagHasClipActions = oTag.PlaceFlagHasClipActions;
                tag.ClipActionRecords       = oTag.ClipActionRecords;
            }

            if (!tag.PlaceFlagHasRatio && !isCopy) {
                tag.PlaceFlagHasRatio = 1;
                tag.Ratio             = (frame - 1)|0;
            }

            if (!tag.PlaceFlagHasFilterList && oTag.PlaceFlagHasFilterList) {
                tag.PlaceFlagHasFilterList = oTag.PlaceFlagHasFilterList;
                tag.SurfaceFilterList      = oTag.SurfaceFilterList;
            }

            if (!tag.PlaceFlagHasBlendMode && oTag.PlaceFlagHasBlendMode) {
                tag.PlaceFlagHasBlendMode = oTag.PlaceFlagHasBlendMode;
                tag.BlendMode = oTag.BlendMode;
            }
        }
    }

    originTags[frame][tag.Depth] = tag;
    var buildObject = this.buildObject(tag, parent, isCopy, frame);
    if (buildObject) {
        var stage       = this.getStage();
        var placeObject = this.buildPlaceObject(tag);
        stage.setPlaceObject(placeObject, parent.instanceId, tag.Depth, frame);

        container[frame][tag.Depth] = buildObject.instanceId;
    }
};

/**
 * @param tag
 * @param parent
 * @param isCopy
 * @param frame
 * @returns {*}
 */
SwfTag.prototype.buildObject = function (tag, parent, isCopy, frame)
{
    var stage = this.getStage();
    var char  = stage.getCharacter(tag.CharacterId);
    if (!char) {
        return null;
    }

    var tagType = char.tagType;
    var isMorphShape = false;
    if (tagType === 46 || tagType === 84) {
        isMorphShape = true;
    }

    var obj = {};
    if (!isMorphShape && tag.PlaceFlagMove && isCopy) {
        var id = parent.container[frame - 1][tag.Depth];
        obj    = stage.getInstance(id);
    } else {
        if (char instanceof Array) {
            obj = this.buildMovieClip(tag, char, parent);
        } else {
            switch (tagType) {
                case 11: // DefineText
                case 33: // DefineText2
                    obj = this.buildText(tag, char);
                    break;
                case 37: // DefineEditText
                    obj = this.buildTextField(tag, char, parent);
                    break;
                case 2:  // DefineShape
                case 22: // DefineShape2
                case 32: // DefineShape3
                case 83: // DefineShape4
                    obj = this.buildShape(tag, char);
                    break;
                case 46: // MorphShape
                case 84: // MorphShape2
                    var MorphShape     = this.buildMorphShape(char, tag.Ratio);
                    MorphShape.tagType = tagType;
                    obj = this.buildShape(tag, MorphShape);
                    break;
                case 7: // DefineButton
                case 34: // DefineButton2
                    obj = this.buildButton(char, tag, parent);
                    break;
                default:
                    return 0;
            }
        }

        obj.setParent(parent);
        obj.setStage(stage);
        obj.setCharacterId(tag.CharacterId);
        obj.setRatio(tag.Ratio || 0);
        obj.setLevel(tag.Depth);
    }

    if (tag.PlaceFlagHasClipDepth) {
        obj.isClipDepth = true;
        obj.clipDepth   = tag.ClipDepth;
    }

    return obj;
};

/**
 * @param tag
 * @returns {PlaceObject}
 */
SwfTag.prototype.buildPlaceObject = function (tag)
{
    var placeObject = new PlaceObject();

    // Matrix
    if (tag.PlaceFlagHasMatrix) {
        placeObject.setMatrix(tag.Matrix);
    }

    // ColorTransform
    if (tag.PlaceFlagHasColorTransform) {
        placeObject.setColorTransform(tag.ColorTransform);
    }

    // Filter
    if (tag.PlaceFlagHasFilterList) {
        placeObject.setFilters(tag.SurfaceFilterList);
    }

    // BlendMode
    if (tag.PlaceFlagHasBlendMode) {
        placeObject.setBlendMode(tag.BlendMode);
    }

    return placeObject;
};


/**
 * @param tag
 * @param character
 * @param parent
 * @returns {MovieClip}
 */
SwfTag.prototype.buildMovieClip = function (tag, character, parent)
{
    var stage = this.getStage();
    var mc    = new MovieClip();
    mc._url   = parent._url;
    mc.setStage(stage);

    var target = "instance" + mc.instanceId;
    if (tag.PlaceFlagHasName) {
        mc.setName(tag.Name);
        target = tag.Name;
    }

    mc.setTarget(parent.getTarget() + "/" + target);
    this.build(character, mc);

    if (tag.PlaceFlagHasClipActions) {
        var ClipActionRecords = tag.ClipActionRecords;
        var length = 0 | ClipActionRecords.length;
        var eventName;
        var i = 0;
        while (i < length) {
            var actionRecord = ClipActionRecords[i];
            var eventFlag    = actionRecord.EventFlags;
            for (eventName in eventFlag) {
                if (!eventFlag.hasOwnProperty(eventName)) {
                    continue;
                }

                if (!eventFlag[eventName]) {
                    continue;
                }

                var action = mc.createActionScript(actionRecord.Actions);
                mc.addEventListener(eventName, action);
            }

            i = 0 | i + 1;
        }
    }

    return mc;
};

/**
 * @param tag
 * @param character
 * @param parent
 * @returns {TextField}
 */
SwfTag.prototype.buildTextField = function (tag, character, parent)
{
    var stage     = this.getStage();
    var textField = new TextField();
    textField.setStage(stage);
    textField.setParent(parent);
    textField.setInitParams();
    textField.setTagType(character.tagType);
    textField.setBounds(character.bounds);
    var target = "instance" + textField.instanceId;
    if (tag.PlaceFlagHasName) {
        textField.setName(tag.Name);
        target = tag.Name;
    }
    textField.setTarget(parent.getTarget() + "/" + target);

    var obj      = {};
    var data     = character.data;
    var fontData = null;
    var fontId   = data.FontID;
    if (data.HasFont) {
        fontData = stage.getCharacter(fontId);
    }

    textField.fontId    = fontId;
    textField.fontScale = data.FontHeight / 1024;
    if (fontData && fontData.ZoneTable) {
        textField.fontScale /= 20;
    }

    textField.initialText = data.InitialText;

    obj.autoSize = data.AutoSize;
    obj.border   = data.Border;
    if (obj.border) {
        obj.background = 1;
    }

    obj.bottomScroll  = 1;
    obj.condenseWhite = 0;
    obj.embedFonts    = (data.HasFont && data.UseOutlines && fontData.FontFlagsHasLayout && !data.Password) ? 1 : 0;
    obj.hscroll       = 0;
    obj.maxscroll     = 0;
    obj.scroll        = 0;
    obj.maxhscroll    = 0;
    obj.html          = data.HTML;
    obj.htmlText      = (data.HTML) ? data.InitialText : null;
    obj.length        = 0;
    obj.maxChars      = 0;
    obj.multiline     = data.Multiline;
    obj.password      = data.Password;
    obj.selectable    = data.NoSelect;
    obj.tabEnabled    = 0;
    obj.tabIndex      = 0;
    obj.text          = data.InitialText;
    obj.textColor     = data.TextColor;
    obj.textHeight    = 0;
    obj.textWidth     = 0;
    obj.type          = data.ReadOnly ? "dynamic" : "input";

    var variable = data.VariableName;
    obj.variable = variable;
    if (variable) {
        parent.setVariable(variable, data.InitialText);
    }

    obj.wordWrap = data.WordWrap;

    // TextFormat
    obj.blockIndent = 0;
    obj.bullet      = 0;

    if (fontData) {
        obj.bold   = fontData.FontFlagsBold;
        var font   = textField.getVariable("font");
        obj.font   = "'" + fontData.FontName + "', " + font;
        obj.italic = fontData.FontFlagsItalic;
    }

    if (data.HasLayout) {
        switch (data.Align) {
            case 1:
                obj.align = "right";
                break;
            case 2:
                obj.align = "center";
                break;
            case 3:
                obj.align = "justify";
                break;
        }
        obj.leftMargin  = data.LeftMargin;
        obj.rightMargin = data.RightMargin;
        obj.indent      = data.Indent;
        obj.leading     = (14400 > data.Leading) ? data.Leading : data.Leading - 65535;
    }

    obj.size      = data.FontHeight / 20;
    obj.tabStops  = [];
    obj.target    = null;
    obj.underline = 0;
    obj.url       = null;

    for (var name in obj) {
        if (!obj.hasOwnProperty(name)) {
            continue;
        }

        textField.setProperty(name, obj[name]);
    }

    if (obj.type === "input") {
        textField.setInputElement();
    }

    return textField;
};

/**
 * @param tag
 * @param character
 * @returns {StaticText}
 */
SwfTag.prototype.buildText = function (tag, character)
{
    var stage      = this.getStage();
    var staticText = new StaticText();
    staticText.setTagType(character.tagType);
    staticText.setBounds(character.bounds);

    var records     = character.textRecords;
    var length      = 0 | records.length;
    var offsetX     = 0;
    var offsetY     = 0;
    var scale       = 1;
    var textHeight  = 0;
    var ShapeTable  = null;
    var cMatrix     = character.matrix;
    var color       = null;
    var isZoneTable = false;
    var i = 0;
    while (i < length) {
        var record = records[i];
        if ("FontId" in record) {
            var fontId   = record.FontId;
            var fontData = stage.getCharacter(fontId);
            ShapeTable   = fontData.GlyphShapeTable;
            isZoneTable  = ("ZoneTable" in fontData);
        }

        if ("XOffset" in record) {
            offsetX = record.XOffset;
        }

        if ("YOffset" in record) {
            offsetY = record.YOffset;
        }

        if ("TextColor" in record) {
            color = record.TextColor;
        }

        if ("TextHeight" in record) {
            textHeight = record.TextHeight;
            if (isZoneTable) {
                textHeight /= 20;
            }
        }

        var entries = record.GlyphEntries;
        var count   = record.GlyphCount;
        scale       = textHeight / 1024;
        var idx     = 0;
        var vtc     = this.$vtc;
        while (idx < count) {
            var entry  = entries[idx];
            var shapes = ShapeTable[entry.GlyphIndex];
            var data   = vtc.convert(shapes);
            var matrix = [scale, cMatrix[1], cMatrix[2], scale, cMatrix[4] + offsetX, cMatrix[5] + offsetY];

            var textRecode = new TextRecord();
            textRecode.setData(data);
            textRecode.setColor(color);
            textRecode.setMatrix(matrix);
            staticText.addRecord(textRecode);
            offsetX += 0 | entry.GlyphAdvance;

            idx = 0 | idx + 1;
        }

        i = 0 | i + 1;
    }

    return staticText;
};

/**
 * @param tag
 * @param character
 * @returns {Shape}
 */
SwfTag.prototype.buildShape = function (tag, character)
{
    var shape = new Shape();
    shape.setTagType(character.tagType);
    shape.setBounds(character.bounds);
    shape.setData(character.data);
    return shape;
};

/**
 * @param character
 * @param tag
 * @param parent
 * @returns {SimpleButton}
 */
SwfTag.prototype.buildButton = function (character, tag, parent)
{
    var stage      = this.getStage();
    var characters = character.characters;

    var button = new SimpleButton();
    button.setStage(stage);
    button.setParent(parent);
    button.setLevel(tag.Depth);

    if ("actions" in character) {
        button.setActions(character.actions);
    }

    var target = "instance" + button.instanceId;
    if (tag.PlaceFlagHasName) {
        button.setName(tag.Name);
        target = tag.Name;
    }
    button.setTarget(parent.getTarget() + "/" + target);

    var downState = button.getSprite("down");
    if (character.ButtonStateDownSoundId) {
        downState.soundId   = character.ButtonStateDownSoundId;
        downState.soundInfo = character.ButtonStateDownSoundInfo;
    }

    var hitState = button.getSprite("hit");
    if (character.ButtonStateHitTestSoundId) {
        hitState.soundId   = character.ButtonStateHitTestSoundId;
        hitState.soundInfo = character.ButtonStateHitTestSoundInfo;
    }

    var overState = button.getSprite("over");
    if (character.ButtonStateOverSoundId) {
        overState.soundId   = character.ButtonStateOverSoundId;
        overState.soundInfo = character.ButtonStateOverSoundInfo;
    }

    var upState = button.getSprite("up");
    if (character.ButtonStateUpSoundId) {
        upState.soundId   = character.ButtonStateUpSoundId;
        upState.soundInfo = character.ButtonStateUpSoundInfo;
    }

    for (var depth in characters) {
        if (!characters.hasOwnProperty(depth)) {
            continue;
        }

        var tags = characters[depth];
        for (var idx in tags) {
            if (!tags.hasOwnProperty(idx)) {
                continue;
            }

            var bTag = tags[idx];
            var obj  = this.buildObject(bTag, button, false, 1);
            if (!obj) {
                continue;
            }

            var placeObject = this.buildPlaceObject(bTag);
            var Depth       = bTag.Depth;
            if (bTag.ButtonStateDown) {
                downState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, downState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateHitTest) {
                hitState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, hitState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateOver) {
                overState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, overState.instanceId, Depth, 0);
            }

            if (bTag.ButtonStateUp) {
                upState.addTag(Depth, obj);
                stage.setPlaceObject(placeObject, upState.instanceId, Depth, 0);
            }
        }
    }

    button.setSprite("down", downState);
    button.setSprite("hit",  hitState);
    button.setSprite("over", overState);
    button.setSprite("up",   upState);
    button.setTagType(character.tagType);

    return button;
};

/**
 * @param frame
 * @param characterId
 * @returns {{ }}
 */
SwfTag.prototype.generateDefaultTagObj = function (frame, characterId)
{
    return {
        frame:        frame,
        characterId:  characterId,
        cTags:        [],
        removeTags:   [],
        actionScript: [],
        labels:       [],
        sounds:       []
    };
};

/**
 * @param dataLength
 * @param characterId
 * @returns {Array}
 */
SwfTag.prototype.parseTags = function (dataLength, characterId)
{
    var frame   = 1;
    var tags    = [];
    var tagType = 0;
    var bitio   = this.getBitIO();

    // default set
    tags[frame] = this.generateDefaultTagObj(frame, characterId);

    while (bitio.byte_offset < dataLength) {
        var tagStartOffset = bitio.byte_offset;
        if (tagStartOffset + 2 > dataLength) {
            break;
        }

        var tagLength = bitio.getUI16();
        tagType       = tagLength >> 6;

        // long
        var length = tagLength & 0x3f;
        if (length === 0x3f) {
            if (tagStartOffset + 6 > dataLength) {
                bitio.byte_offset = tagStartOffset;
                bitio.bit_offset  = 0;
                break;
            }
            length = bitio.getUI32();
        }

        var tagDataStartOffset = bitio.byte_offset;
        if (tagType === 1) {
            frame = (frame+1)|0;
            if (dataLength > tagDataStartOffset + 2) {
                tags[frame] = this.generateDefaultTagObj(frame, characterId);
            }
        }

        var tag = this.parseTag(tagType, length);

        var o = (bitio.byte_offset - tagDataStartOffset)|0;
        if (o !== length) {
            if (o < length) {
                var eat = (length - o)|0;
                if (eat > 0) {
                    bitio.byte_offset = (bitio.byte_offset + eat)|0;
                }
            }
        }

        if (tag) {
            tags = this.addTag(tagType, tags, tag, frame);
        }

        bitio.bit_offset = 0;
    }

    return tags;
};

/**
 * @param tagType
 * @param length
 * @returns {*}
 */
SwfTag.prototype.parseTag = function (tagType, length)
{
    var obj   = null;
    var bitio = this.getBitIO();
    var stage = this.getStage();

    switch (tagType) {
        case 0: // End
            break;
        case 1: // ShowFrame
            break;
        case 2:  // DefineShape
        case 22: // DefineShape2
        case 32: // DefineShape3
        case 83: // DefineShape4
            if (length < 10) {
                bitio.byte_offset += length;
            } else {
                this.parseDefineShape(tagType);
            }
            break;
        case 9: // BackgroundColor
            stage.setBackgroundColor(
                bitio.getUI8(),
                bitio.getUI8(),
                bitio.getUI8()
            );
            break;
        case 10: // DefineFont
        case 48: // DefineFont2
        case 75: // DefineFont3
            this.parseDefineFont(tagType, length);
            break;
        case 13: // DefineFontInfo
        case 62: // DefineFontInfo2
            this.parseDefineFontInfo(tagType, length);
            break;
        case 11: // DefineText
        case 33: // DefineText2
            this.parseDefineText(tagType);
            break;
        case 4: // PlaceObject
        case 26: // PlaceObject2
        case 70: //PlaceObject3
            obj = this.parsePlaceObject(tagType, length);
            break;
        case 37: // DefineEditText
            this.parseDefineEditText(tagType);
            break;
        case 39: // DefineSprite
            this.parseDefineSprite(bitio.byte_offset + length);
            break;
        case 12: // DoAction
            obj = this.parseDoAction(length);
            break;
        case 59: // DoInitAction
            this.parseDoInitAction(length);
            break;
        case 5: // RemoveObject
        case 28: // RemoveObject2
            obj = this.parseRemoveObject(tagType);
            break;
        case 7: // DefineButton
        case 34: // DefineButton2
            obj = this.parseDefineButton(tagType, length);
            break;
        case 43: // FrameLabel
            obj = this.parseFrameLabel();
            break;
        case 88: // DefineFontName
            this.parseDefineFontName();
            break;
        case 20: // DefineBitsLossless
        case 36: // DefineBitsLossless2
            this.parseDefineBitsLossLess(tagType, length);
            break;
        case 6: // DefineBits
        case 21: // DefineBitsJPEG2
        case 35: // DefineBitsJPEG3
        case 90: // DefineBitsJPEG4
            this.parseDefineBits(tagType, length, this.jpegTables);
            break;
        case 8: // JPEGTables
            this.jpegTables = this.parseJPEGTables(length);
            break;
        case 56: // ExportAssets
            this.parseExportAssets();
            break;
        case 46: // DefineMorphShape
        case 84: // DefineMorphShape2
            this.parseDefineMorphShape(tagType);
            break;
        case 40: // NameCharacter
            bitio.getDataUntil("\0"); // NameCharacter
            break;
        case 24: // Protect
            bitio.byteAlign();
            break;
        case 63: // DebugID
            bitio.getUI8(); // UUID
            break;
        case 64: // EnableDebugger2
            bitio.getUI16(); // Reserved
            bitio.getDataUntil("\0"); // Password
            break;
        case 65: // ScriptLimits
            bitio.getUI16(); // MaxRecursionDepth
            bitio.getUI16(); // ScriptTimeoutSeconds
            break;
        case 69: // FileAttributes
            this.parseFileAttributes();
            break;
        case 77: // MetaData
            bitio.getDataUntil("\0"); // MetaData
            break;
        case 86: // DefineSceneAndFrameLabelData
            obj = this.parseDefineSceneAndFrameLabelData();
            break;
        case 18: // SoundStreamHead
        case 45: // SoundStreamHead2
            obj = this.parseSoundStreamHead(tagType);
            break;
        case 72: // DoABC
        case 82: // DoABC2
            this.parseDoABC(tagType, length);
            break;
        case 76: // SymbolClass
            this.parseSymbolClass();
            break;
        case 14: // DefineSound
            this.parseDefineSound(tagType, length);
            break;
        case 15: // StartSound
        case 89: // StartSound2
            obj = this.parseStartSound(tagType);
            break;
        case 17: // DefineButtonSound
            this.parseDefineButtonSound();
            break;
        case 73: // DefineFontAlignZones
            this.parseDefineFontAlignZones();
            break;
        case 74: // CSMTextSettings
            this.parseCSMTextSettings(tagType);
            break;
        case 19: // SoundStreamBlock
            this.parseSoundStreamBlock(tagType, length);
            break;
        case 60: // DefineVideoStream
            this.parseDefineVideoStream(tagType);
            break;
        case 61: // VideoFrame
            this.parseVideoFrame(tagType, length);
            break;
        case 78: // DefineScalingGrid
            this.parseDefineScalingGrid();
            break;
        case 41: // ProductInfo
            bitio.getUI32(); // ProductID
            bitio.getUI32(); // Edition
            bitio.getUI8(); // MajorVersion
            bitio.getUI8(); // MinorVersion
            bitio.getUI32(); // BuildLow
            bitio.getUI32(); // BuildHigh
            bitio.getUI32(); // CompilationDate
            bitio.getUI32(); // TODO
            break;
        case 3:  // FreeCharacter
        case 16: // StopSound
        case 23: // DefineButtonCxform
        case 25: // PathsArePostScript
        case 29: // SyncFrame
        case 31: // FreeAll
        case 38: // DefineVideo
        case 42: // DefineTextFormat
        case 44: // DefineBehavior
        case 47: // FrameTag
        case 49: // GeProSet
        case 52: // FontRef
        case 53: // DefineFunction
        case 54: // PlaceFunction
        case 55: // GenTagObject
        case 57: // ImportAssets
        case 58: // EnableDebugger
        case 66: // SetTabIndex
        case 71: // ImportAssets2
        case 87: // DefineBinaryData
        case 91: // DefineFont4
        case 93: // EnableTelemetry
            console.log("[base] tagType -> " + tagType);
            break;
        case 27: // 27 (invalid)
        case 30: // 30 (invalid)
        case 67: // 67 (invalid)
        case 68: // 68 (invalid)
        case 79: // 79 (invalid)
        case 80: // 80 (invalid)
        case 81: // 81 (invalid)
        case 85: // 85 (invalid)
        case 92: // 92 (invalid)
            break;
        default: // null
            break;
    }

    return obj;
};

/**
 * @param tagType
 * @param tags
 * @param tag
 * @param frame
 * @returns {*}
 */
SwfTag.prototype.addTag = function (tagType, tags, tag, frame)
{
    var tagsArray = tags[frame];
    switch (tagType) {
        case 4:  // PlaceObject
        case 26: // PlaceObject2
        case 70: // PlaceObject3
            var cTags = tagsArray.cTags;
            tagsArray.cTags[cTags.length] = tag;
            break;
        case 12: // DoAction
            var as = tagsArray.actionScript;
            tagsArray.actionScript[as.length] = tag;
            break;
        case 5: // RemoveObject
        case 28: // RemoveObject2
            var removeTags = tagsArray.removeTags;
            tagsArray.removeTags[removeTags.length] = tag;
            break;
        case 43: // FrameLabel
            var labels = tagsArray.labels;
            tag.frame  = frame;
            tagsArray.labels[labels.length] = tag;
            break;
        case 15: // StartSound
        case 89: // StartSound2
            var sounds = tagsArray.sounds;
            tagsArray.sounds[sounds.length] = tag;
            break;
    }

    return tags;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineShape = function (tagType)
{
    var bitio       = this.getBitIO();
    var characterId = bitio.getUI16();
    var bounds      = this.rect();

    if (tagType === 83) {
        var obj = {};
        obj.EdgeBounds = this.rect();
        bitio.getUIBits(5); // Reserved
        obj.UsesFillWindingRule   = bitio.getUIBits(1);
        obj.UsesNonScalingStrokes = bitio.getUIBits(1);
        obj.UsesScalingStrokes    = bitio.getUIBits(1);
    }

    var shapes = this.shapeWithStyle(tagType);
    this.appendShapeTag(characterId, bounds, shapes, tagType);
};

/**
 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
 */
SwfTag.prototype.rect = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var nBits = bitio.getUIBits(5);
    return {
        xMin: bitio.getSIBits(nBits),
        xMax: bitio.getSIBits(nBits),
        yMin: bitio.getSIBits(nBits),
        yMax: bitio.getSIBits(nBits)
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.shapeWithStyle = function (tagType)
{
    var bitio = this.getBitIO();

    var fillStyles, lineStyles;
    switch (tagType) {
        case 46:
        case 84:
            fillStyles = {fillStyleCount: 0, fillStyles: []};
            lineStyles = {lineStyleCount: 0, lineStyles: []};
            break;
        default:
            fillStyles = this.fillStyleArray(tagType);
            lineStyles = this.lineStyleArray(tagType);
            break;
    }

    var numBits      = bitio.getUI8();
    var NumFillBits  = numBits >> 4;
    var NumLineBits  = numBits & 0x0f;
    var ShapeRecords = this.shapeRecords(tagType, {
        FillBits: NumFillBits,
        LineBits: NumLineBits
    });

    return {
        fillStyles:   fillStyles,
        lineStyles:   lineStyles,
        ShapeRecords: ShapeRecords
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.fillStyleArray = function (tagType)
{
    var bitio = this.getBitIO();

    var fillStyleCount = bitio.getUI8();
    if (tagType > 2 && fillStyleCount === 0xff) {
        fillStyleCount = bitio.getUI16();
    }

    var fillStyles = [];

    var i = 0;
    while (i < fillStyleCount) {
        fillStyles[fillStyles.length] = this.fillStyle(tagType);
        i = 0 | i + 1;
    }

    return {
        fillStyleCount: fillStyleCount,
        fillStyles:     fillStyles
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.fillStyle = function (tagType)
{
    var bitio   = this.getBitIO();
    var bitType = bitio.getUI8();

    var obj = {};
    obj.fillStyleType = bitType;
    switch (bitType) {
        case 0x00:
            switch (tagType) {
                case 32:
                case 83:
                    obj.Color = this.rgba();
                    break;
                case 46:
                case 84:
                    obj.StartColor = this.rgba();
                    obj.EndColor   = this.rgba();
                    break;
                default:
                    obj.Color = this.rgb();
                    break;
            }
            break;
        case 0x10:
        case 0x12:
            switch (tagType) {
                case 46:
                case 84:
                    obj.startGradientMatrix = this.matrix();
                    obj.endGradientMatrix   = this.matrix();
                    obj.gradient            = this.gradient(tagType);
                    break;
                default:
                    obj.gradientMatrix = this.matrix();
                    obj.gradient       = this.gradient(tagType);
                    break;
            }
            break;
        case 0x13:
            obj.gradientMatrix = this.matrix();
            obj.gradient       = this.focalGradient(tagType);
            break;
        case 0x40:
        case 0x41:
        case 0x42:
        case 0x43:
            obj.bitmapId = bitio.getUI16();
            switch (tagType) {
                case 46:
                case 84:
                    obj.startBitmapMatrix = this.matrix();
                    obj.endBitmapMatrix   = this.matrix();
                    break;
                default:
                    obj.bitmapMatrix = this.matrix();
                    break;
            }
            break;
    }
    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.rgb = function ()
{
    var bitio = this.getBitIO();
    return {
        R: bitio.getUI8(),
        G: bitio.getUI8(),
        B: bitio.getUI8(),
        A: 1
    };
};

/**
 * @returns {{}}
 */
SwfTag.prototype.rgba = function ()
{
    var bitio = this.getBitIO();
    return {
        R: bitio.getUI8(),
        G: bitio.getUI8(),
        B: bitio.getUI8(),
        A: bitio.getUI8() / 255
    };
};

/**
 * @returns {Array}
 */
SwfTag.prototype.matrix = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var result = [1, 0, 0, 1, 0, 0];
    if (bitio.getUIBit()) {
        var nScaleBits = bitio.getUIBits(5);
        result[0]      = bitio.getSIBits(nScaleBits) / 0x10000;
        result[3]      = bitio.getSIBits(nScaleBits) / 0x10000;
    }

    if (bitio.getUIBit()) {
        var nRotateBits = bitio.getUIBits(5);
        result[1]       = bitio.getSIBits(nRotateBits) / 0x10000;
        result[2]       = bitio.getSIBits(nRotateBits) / 0x10000;
    }

    var nTranslateBits = bitio.getUIBits(5);

    result[4] = bitio.getSIBits(nTranslateBits);
    result[5] = bitio.getSIBits(nTranslateBits);

    return result;
};

/**
 * gradient
 * @param tagType
 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array}}
 */
SwfTag.prototype.gradient = function (tagType)
{
    var NumGradients;

    var SpreadMode        = 0;
    var InterpolationMode = 0;
    var GradientRecords   = [];

    var bitio = this.getBitIO();
    bitio.byteAlign();

    switch (tagType) {
        case 46:
        case 84:
            NumGradients = bitio.getUI8();
            break;
        default:
            SpreadMode        = bitio.getUIBits(2);
            InterpolationMode = bitio.getUIBits(2);
            NumGradients      = bitio.getUIBits(4);
            break;
    }

    var i = 0;
    while (i < NumGradients) {
        GradientRecords[GradientRecords.length] = this.gradientRecord(tagType);
        i = 0 | i + 1;
    }

    return {
        SpreadMode:        SpreadMode,
        InterpolationMode: InterpolationMode,
        GradientRecords:   GradientRecords
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.gradientRecord = function (tagType)
{
    var bitio = this.getBitIO();
    switch (tagType) {
        case 46:
        case 84:
            return {
                StartRatio: bitio.getUI8() / 255,
                StartColor: this.rgba(),
                EndRatio:   bitio.getUI8() / 255,
                EndColor:   this.rgba()
            };
        default:
            var Ratio = bitio.getUI8();
            var Color = (tagType < 32) ? this.rgb() : this.rgba();
            return {
                Ratio: Ratio / 255,
                Color: Color
            };
    }
};

/**
 * @param tagType
 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array, FocalPoint: number}}
 */
SwfTag.prototype.focalGradient = function (tagType)
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var SpreadMode        = bitio.getUIBits(2);
    var InterpolationMode = bitio.getUIBits(2);
    var numGradients      = bitio.getUIBits(4);
    var GradientRecords   = [];

    var i = 0;
    while (i < numGradients) {
        GradientRecords[GradientRecords.length] = this.gradientRecord(tagType);
        i = 0 | i + 1;
    }

    var FocalPoint = bitio.getFloat16();

    return {
        SpreadMode: SpreadMode,
        InterpolationMode: InterpolationMode,
        GradientRecords: GradientRecords,
        FocalPoint: FocalPoint
    };
};

/**
 * @param tagType
 * @returns {{lineStyleCount: number, lineStyles: Array}}
 */
SwfTag.prototype.lineStyleArray = function (tagType)
{
    var bitio = this.getBitIO();

    var lineStyleCount = bitio.getUI8();
    if (tagType > 2 && lineStyleCount === 0xff) {
        lineStyleCount = bitio.getUI16();
    }

    var lineStyles = [];
    var i = 0;
    while (i < lineStyleCount) {
        lineStyles[lineStyles.length] = this.lineStyles(tagType);
        i = 0 | i + 1;
    }

    return {
        lineStyleCount: lineStyleCount,
        lineStyles:     lineStyles
    };
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.lineStyles = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.fillStyleType = 0;
    switch (tagType) {
        case 46:
            obj = {
                StartWidth: bitio.getUI16(),
                EndWidth:   bitio.getUI16(),
                StartColor: this.rgba(),
                EndColor:   this.rgba()
            };
            break;
        case 84:
            obj.StartWidth       = bitio.getUI16();
            obj.EndWidth         = bitio.getUI16();
            obj.StartCapStyle    = bitio.getUIBits(2);
            obj.JoinStyle        = bitio.getUIBits(2);
            obj.HasFillFlag      = bitio.getUIBit();
            obj.NoHScaleFlag     = bitio.getUIBit();
            obj.NoVScaleFlag     = bitio.getUIBit();
            obj.PixelHintingFlag = bitio.getUIBit();

            bitio.getUIBits(5); // Reserved
            obj.NoClose     = bitio.getUIBit();
            obj.EndCapStyle = bitio.getUIBits(2);

            if (obj.JoinStyle === 2) {
                obj.MiterLimitFactor = bitio.getUI16();
            }

            if (obj.HasFillFlag) {
                obj.FillType = this.fillStyle(tagType);
            } else {
                obj.StartColor = this.rgba();
                obj.EndColor   = this.rgba();
            }
            break;
        case 83: // DefineShape4
            obj.Width            = bitio.getUI16();
            obj.StartCapStyle    = bitio.getUIBits(2);
            obj.JoinStyle        = bitio.getUIBits(2);
            obj.HasFillFlag      = bitio.getUIBit();
            obj.NoHScaleFlag     = bitio.getUIBit();
            obj.NoVScaleFlag     = bitio.getUIBit();
            obj.PixelHintingFlag = bitio.getUIBit();
            bitio.getUIBits(5); // Reserved
            obj.NoClose     = bitio.getUIBit();
            obj.EndCapStyle = bitio.getUIBits(2);

            if (obj.JoinStyle === 2) {
                obj.MiterLimitFactor = bitio.getUI16();
            }

            if (obj.HasFillFlag) {
                obj.FillType = this.fillStyle(tagType);
            } else {
                obj.Color = this.rgba();
            }
            break;
        case 32: // DefineShape3
            obj.Width = bitio.getUI16();
            obj.Color = this.rgba();
            break;
        default:  // DefineShape1or2
            obj.Width = bitio.getUI16();
            obj.Color = this.rgb();
            break;
    }

    return obj;
};

/**
 * @param tagType
 * @param currentNumBits
 * @returns {Array}
 */
SwfTag.prototype.shapeRecords = function (tagType, currentNumBits)
{
    var bitio = this.getBitIO();

    var shapeRecords     = [];
    this.currentPosition = {x: 0, y: 0};
    while (true) {
        // reset
        var shape = 0;

        var first6Bits = bitio.getUIBits(6);
        if (first6Bits & 0x20) {
            var numBits = first6Bits & 0x0f;
            if (first6Bits & 0x10) {
                shape = this.straightEdgeRecord(tagType, numBits);
            } else {
                shape = this.curvedEdgeRecord(tagType, numBits);
            }
        } else if (first6Bits) {
            shape = this.styleChangeRecord(tagType, first6Bits, currentNumBits);
        }

        shapeRecords[shapeRecords.length] = shape;
        if (shape === 0) {
            bitio.byteAlign();
            break;
        }
    }

    return shapeRecords;
};

/**
 * @param tagType
 * @param numBits
 * @returns {{}}
 */
SwfTag.prototype.straightEdgeRecord = function (tagType, numBits)
{
    var bitio  = this.getBitIO();
    var deltaX = 0;
    var deltaY = 0;

    var GeneralLineFlag = bitio.getUIBit();
    if (GeneralLineFlag) {
        deltaX = bitio.getSIBits(numBits + 2);
        deltaY = bitio.getSIBits(numBits + 2);
    } else {
        var VertLineFlag = bitio.getUIBit();
        if (VertLineFlag) {
            deltaY = bitio.getSIBits(numBits + 2);
        } else {
            deltaX = bitio.getSIBits(numBits + 2);
        }
    }

    var AnchorX = deltaX;
    var AnchorY = deltaY;

    switch (tagType) {
        case 46:
        case 84:
            break;
        default:
            AnchorX = this.currentPosition.x + deltaX;
            AnchorY = this.currentPosition.y + deltaY;

            // position
            this.currentPosition.x = AnchorX;
            this.currentPosition.y = AnchorY;
            break;
    }

    return {
        ControlX: 0,
        ControlY: 0,
        AnchorX:  AnchorX,
        AnchorY:  AnchorY,
        isCurved: false,
        isChange: false
    };
};

/**
 * @param tagType
 * @param numBits
 * @returns {{}}
 */
SwfTag.prototype.curvedEdgeRecord = function (tagType, numBits)
{
    var bitio = this.getBitIO();

    var controlDeltaX = bitio.getSIBits(numBits + 2);
    var controlDeltaY = bitio.getSIBits(numBits + 2);
    var anchorDeltaX  = bitio.getSIBits(numBits + 2);
    var anchorDeltaY  = bitio.getSIBits(numBits + 2);

    var ControlX = controlDeltaX;
    var ControlY = controlDeltaY;
    var AnchorX  = anchorDeltaX;
    var AnchorY  = anchorDeltaY;

    switch (tagType) {
        case 46:
        case 84:
            break;
        default:
            ControlX = this.currentPosition.x + controlDeltaX;
            ControlY = this.currentPosition.y + controlDeltaY;
            AnchorX  = ControlX + anchorDeltaX;
            AnchorY  = ControlY + anchorDeltaY;

            // position
            this.currentPosition.x = AnchorX;
            this.currentPosition.y = AnchorY;
            break;
    }

    return {
        ControlX: ControlX,
        ControlY: ControlY,
        AnchorX:  AnchorX,
        AnchorY:  AnchorY,
        isCurved: true,
        isChange: false
    };
};

/**
 * @param tagType
 * @param changeFlag
 * @param currentNumBits
 * @returns {{}}
 */
SwfTag.prototype.styleChangeRecord = function (tagType, changeFlag, currentNumBits)
{
    var bitio = this.getBitIO();

    var obj = {
        isChange:   true,
        FillStyle0: 0,
        FillStyle1: 0,
        LineStyle:  0
    };

    obj.StateNewStyles  = (changeFlag >> 4) & 1;
    obj.StateLineStyle  = (changeFlag >> 3) & 1;
    obj.StateFillStyle1 = (changeFlag >> 2) & 1;
    obj.StateFillStyle0 = (changeFlag >> 1) & 1;
    obj.StateMoveTo    = changeFlag & 1;

    if (obj.StateMoveTo) {
        var moveBits = bitio.getUIBits(5);
        obj.MoveX    = bitio.getSIBits(moveBits);
        obj.MoveY    = bitio.getSIBits(moveBits);

        // position
        this.currentPosition.x = obj.MoveX;
        this.currentPosition.y = obj.MoveY;
    }

    if (obj.StateFillStyle0) {
        obj.FillStyle0 = bitio.getUIBits(currentNumBits.FillBits);
    }

    if (obj.StateFillStyle1) {
        obj.FillStyle1 = bitio.getUIBits(currentNumBits.FillBits);
    }

    if (obj.StateLineStyle) {
        obj.LineStyle = bitio.getUIBits(currentNumBits.LineBits);
    }

    if (obj.StateNewStyles) {
        obj.FillStyles = this.fillStyleArray(tagType);
        obj.LineStyles = this.lineStyleArray(tagType);

        var numBits = bitio.getUI8();
        currentNumBits.FillBits = obj.NumFillBits = numBits >> 4;
        currentNumBits.LineBits = obj.NumLineBits = numBits & 0x0f;
    }

    return obj;
};

/**
 * @param characterId
 * @param bounds
 * @param shapes
 * @param tagType
 */
SwfTag.prototype.appendShapeTag = function (characterId, bounds, shapes, tagType)
{
    var stage = this.getStage();
    stage.setCharacter(characterId, {
        tagType: tagType,
        data:    this.$vtc.convert(shapes, false),
        bounds:  bounds
    });
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineBitsLossLess = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset    = bitio.byte_offset;
    var CharacterId    = bitio.getUI16();
    var format         = bitio.getUI8();
    var width          = bitio.getUI16();
    var height         = bitio.getUI16();
    var isAlpha        = (tagType === 36);
    var colorTableSize = (format === 3) ? bitio.getUI8() + 1 : 0;

    // unCompress
    var sub = bitio.byte_offset - startOffset;
    var compressed = bitio.getData(length - sub);
    var data = bitio.unzip(compressed, false);

    // canvas
    var canvas    = this.$cacheStore.getCanvas();
    canvas.width  = width;
    canvas.height = height;

    var imageContext = canvas.getContext("2d");
    var imgData      = imageContext.createImageData(width, height);
    var pxData       = imgData.data;

    var idx   = 0;
    var pxIdx = 0;
    var x     = width;
    var y     = height;
    if (format === 5 && !isAlpha) {
        idx   = 0;
        pxIdx = 0;
        y = height;
        while (y) {
            y = 0 | y - 1;

            x = width;
            while (x) {
                x = 0 | x - 1;

                idx = 0 | idx + 1;
                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = data[idx];
                idx   = 0 | idx + 1;
                pxIdx = 0 | pxIdx + 1;

                pxData[pxIdx] = 255;
                pxIdx = 0 | pxIdx + 1;
            }
        }
    } else {
        var bpp   = (isAlpha) ? 4 : 3;
        var cmIdx = 0 | colorTableSize * bpp;

        var pad = 0;
        if (colorTableSize) {
            pad = 0 | ((width + 3) & ~3) - width;
        }

        var isAlphaBug = this.$isAlphaBug;

        y = height;
        while (y) {
            y = 0 | y - 1;

            x = width;
            while (x) {
                x = 0 | x - 1;

                idx = (colorTableSize) ? data[cmIdx++] * bpp : cmIdx++ * bpp;
                idx |= 0;

                if (!isAlpha) {
                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx++] = data[idx];
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;

                    pxData[pxIdx] = 255;
                    idx   = 0 | idx + 1;
                    pxIdx = 0 | pxIdx + 1;
                } else {
                    var alpha = (format === 3) ? data[idx + 3] : data[idx];
                    idx = 0 | idx + 1;

                    if (!isAlphaBug) {
                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx] * 255 / alpha;
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;
                    } else {
                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;

                        pxData[pxIdx] = data[idx];
                        idx   = 0 | idx + 1;
                        pxIdx = 0 | pxIdx + 1;
                    }

                    pxData[pxIdx] = alpha;
                    pxIdx = 0 | pxIdx + 1;

                    if (format === 3) {
                        idx = 0 | idx + 1;
                    }
                }
            }

            cmIdx = 0 | cmIdx + pad;
        }
    }

    imageContext.putImageData(imgData, 0, 0);
    stage.setCharacter(CharacterId, imageContext);
};

/**
 * parseExportAssets
 */
SwfTag.prototype.parseExportAssets = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();
    var count = bitio.getUI16();

    var exportAssets = stage.exportAssets;
    var packages     = stage.packages;

    var idx = 0;
    while (idx < count) {
        var id   = bitio.getUI16();
        var name = bitio.getDataUntil("\0");
        if (name.substr(0, 10) === "__Packages") {
            packages[id] = 1;
        }
        exportAssets[name] = id;

        idx = 0 | idx + 1;
    }

    stage.exportAssets = exportAssets;
};

/**
 * @param length
 * @returns {string}
 */
SwfTag.prototype.parseJPEGTables = function (length)
{
    var bitio = this.getBitIO();
    return bitio.getData(length);
};

/**
 * @param tagType
 * @param length
 * @param jpegTables
 */
SwfTag.prototype.parseDefineBits = function (tagType, length, jpegTables)
{
    var bitio = this.getBitIO();

    var startOffset = bitio.byte_offset;
    var CharacterId = bitio.getUI16();
    var sub = bitio.byte_offset - startOffset;

    var ImageDataLen = length - sub;
    switch (tagType) {
        case 35:
        case 90:
            ImageDataLen = bitio.getUI32();
            break;
        default:
            break;
    }

    if (tagType === 90) {
        var DeblockParam = bitio.getUI16();
        console.log("TODO DeblockParam", DeblockParam);
    }

    var JPEGData = bitio.getData(ImageDataLen);
    var BitmapAlphaData = 0;
    switch (tagType) {
        case 35:
        case 90:
            BitmapAlphaData = bitio.getData(length - sub - ImageDataLen);
            break;
        default:
            break;
    }
    bitio.byte_offset = startOffset + length;

    // render
    var stage = this.getStage();
    stage.imgUnLoadCount++;

    var cacheStore = this.$cacheStore;

    var image = this.$document.createElement("img");
    image.addEventListener("load", function()
    {
        var width  = this.width;
        var height = this.height;

        var canvas       = cacheStore.getCanvas();
        canvas.width     = width;
        canvas.height    = height;
        var imageContext = canvas.getContext("2d");
        imageContext.drawImage(this, 0, 0, width, height);

        if (BitmapAlphaData) {
            var data    = bitio.unzip(BitmapAlphaData, false);
            var imgData = imageContext.getImageData(0, 0, width, height);
            var pxData  = imgData.data;
            var pxIdx   = 3;

            var len = width * height;
            var i = 0;
            while (i < len) {
                pxData[pxIdx] = data[i];
                pxIdx = 0 | pxIdx + 4;
                i = 0 | i + 1;
            }

            imageContext.putImageData(imgData, 0, 0);
        }

        stage.setCharacter(CharacterId, imageContext);
        stage.imgUnLoadCount--;
    });

    if (jpegTables !== null && jpegTables.length > 4) {
        var margeData = [];

        var len = 0 | jpegTables.length - 2;
        var idx = 0;
        while (idx < len) {
            margeData[margeData.length] = jpegTables[idx];
            idx = 0 | idx + 1;
        }

        len = 0 | JPEGData.length;
        idx = 2;
        while (idx < len) {
            margeData[margeData.length] = JPEGData[idx];
            idx = 0 | idx + 1;
        }

        JPEGData = margeData;
    }

    image.src = "data:image/jpeg;base64," +
        this.base64encode(this.parseJpegData(JPEGData));

    // for android bug
    if (this.$isAndroid) {
        var timer = this.$setTimeout;
        timer(function () {}, 0);
    }
};

/**
 * @param JPEGData
 * @returns {string}
 */
SwfTag.prototype.parseJpegData = function (JPEGData)
{
    var i   = 0;
    var idx = 0;
    var str = "";
    var length = 0 | JPEGData.length;

    // erroneous
    if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD9 && JPEGData[2] === 0xFF && JPEGData[3] === 0xD8) {
        i = 4;
        while (i < length) {
            str += this.$fromCharCode(JPEGData[i]);
            i = 0 | i + 1;
        }
    } else if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD8) {
        idx = 0;
        i = 2;
        while (idx < i) {
            str += this.$fromCharCode(JPEGData[idx]);
            idx = 0 | idx + 1;
        }

        while (i < length) {
            if (JPEGData[i] === 0xFF) {
                if (JPEGData[i + 1] === 0xD9 && JPEGData[i + 2] === 0xFF && JPEGData[i + 3] === 0xD8) {
                    i = 0 | i + 4;

                    idx = i;
                    while (idx < length) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }
                    break;
                } else if (JPEGData[i + 1] === 0xDA) {
                    idx = i;
                    while (idx < length) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }
                    break;
                } else {
                    var segmentLength = 0 | ((JPEGData[i + 2] << 8) + JPEGData[i + 3] + i + 2);

                    idx = i;
                    while (idx < segmentLength) {
                        str += this.$fromCharCode(JPEGData[idx]);
                        idx = 0 | idx + 1;
                    }

                    i = 0 | i + (segmentLength - i);
                }
            }
        }
    }

    return str;
};

/**
 * @param data
 * @returns {*}
 */
SwfTag.prototype.base64encode = function (data)
{
    if (this.$canBtoa) {
        return window.btoa(data);
    }

    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var out    = [];
    var i      = 0;
    var length = data.length;
    while (i < length) {
        var c1 = data.charCodeAt(i) & 0xff;
        i = 0 | i + 1;

        if (i === length) {
            out[out.length] = base64EncodeChars.charAt(c1 >> 2);
            out[out.length] = base64EncodeChars.charAt((c1 & 0x3) << 4);
            out[out.length] = "==";
            break;
        }

        var c2 = data.charCodeAt(i);
        i = 0 | i + 1;

        if (i === length) {
            out[out.length] = base64EncodeChars.charAt(c1 >> 2);
            out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out[out.length] = base64EncodeChars.charAt((c2 & 0xF) << 2);
            out[out.length] = "=";
            break;
        }

        var c3 = data.charCodeAt(i);
        i = 0 | i + 1;

        out[out.length] = base64EncodeChars.charAt(c1 >> 2);
        out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out[out.length] = base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out[out.length] = base64EncodeChars.charAt(c3 & 0x3F);
    }

    return out.join("");
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineFont = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var endOffset = bitio.byte_offset + length;

    var i   = 0;
    var len = 0;
    var obj = {};
    obj.tagType = tagType;
    obj.FontId  = bitio.getUI16();

    var numGlyphs = 0;
    switch (tagType) {
        case 48:
        case 75:
            var fontFlags            = bitio.getUI8();
            obj.FontFlagsHasLayout   = (fontFlags >>> 7) & 1;
            obj.FontFlagsShiftJIS    = (fontFlags >>> 6) & 1;
            obj.FontFlagsSmallText   = (fontFlags >>> 5) & 1;
            obj.FontFlagsANSI        = (fontFlags >>> 4) & 1;
            obj.FontFlagsWideOffsets = (fontFlags >>> 3) & 1;
            obj.FontFlagsWideCodes   = (fontFlags >>> 2) & 1;
            obj.FontFlagsItalic      = (fontFlags >>> 1) & 1;
            obj.FontFlagsBold        = (fontFlags) & 1;
            bitio.byteAlign();

            obj.LanguageCode = bitio.getUI8();
            obj.FontNameLen  = bitio.getUI8();
            if (obj.FontNameLen) {
                var startOffset = bitio.byte_offset;
                var data        = bitio.getData(obj.FontNameLen);

                var str = "";
                len = obj.FontNameLen;
                i = 0;
                while (i < len) {
                    if (data[i] > 127) {
                        i = 0 | i + 1;
                        continue;
                    }
                    str += this.$fromCharCode(data[i]);
                    i = 0 | i + 1;
                }

                var fontName;
                if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
                    fontName = bitio.decodeToShiftJis(str);
                } else {
                    fontName = decodeURIComponent(str);
                }

                obj.FontName = this.getFontName(fontName);
                bitio.byte_offset = startOffset + obj.FontNameLen;
            }

            numGlyphs = bitio.getUI16();
            obj.NumGlyphs = numGlyphs;
            break;
        default:
            break;
    }


    // offset
    var offset = bitio.byte_offset;
    if (tagType === 10) {
        numGlyphs = bitio.getUI16();
    }

    if (numGlyphs) {
        var OffsetTable = [];
        if (tagType === 10) {
            OffsetTable[0] = numGlyphs;
            numGlyphs /= 2;
            numGlyphs -= 1;
        }

        if (obj.FontFlagsWideOffsets) {
            i = 0;
            while (i < numGlyphs) {
                OffsetTable[OffsetTable.length] = bitio.getUI32();
                i = 0 | i + 1;
            }

            if (tagType !== 10) {
                obj.CodeTableOffset = bitio.getUI32();
            }
        } else {
            i = 0;
            while (i < numGlyphs) {
                OffsetTable[OffsetTable.length] = bitio.getUI16();
                i = 0 | i + 1;
            }

            if (tagType !== 10) {
                obj.CodeTableOffset = bitio.getUI16();
            }
        }

        // Shape
        var GlyphShapeTable = [];
        if (tagType === 10) {
            numGlyphs += 1;
        }

        i = 0;
        while (i < numGlyphs) {
            bitio.setOffset(OffsetTable[i] + offset, 0);

            var numBits     = bitio.getUI8();
            var NumFillBits = numBits >> 4;
            var NumLineBits = numBits & 0x0f;

            var currentNumBits = {
                FillBits: NumFillBits,
                LineBits: NumLineBits
            };

            var shapes = {};
            shapes.ShapeRecords = this.shapeRecords(tagType, currentNumBits);

            shapes.lineStyles = {
                lineStyles: [{
                    Color:         {R: 0, G: 0, B: 0, A: 1},
                    lineStyleType: 0
                }]
            };

            shapes.fillStyles = {
                fillStyles: [{
                    Color:         {R: 0, G: 0, B: 0, A: 1},
                    fillStyleType: 0
                }]
            };

            GlyphShapeTable[GlyphShapeTable.length] = shapes;

            i = 0 | i + 1;
        }
        obj.GlyphShapeTable = GlyphShapeTable;

        switch (tagType) {
            case 48:
            case 75:
                bitio.setOffset(obj.CodeTableOffset + offset, 0);
                var CodeTable = [];
                if (obj.FontFlagsWideCodes) {
                    i = 0;
                    while (i < numGlyphs) {
                        CodeTable[CodeTable.length] = bitio.getUI16();
                        i = 0 | i + 1;
                    }
                } else {
                    i = 0;
                    while (i < numGlyphs) {
                        CodeTable[CodeTable.length] = bitio.getUI8();
                        i = 0 | i + 1;
                    }
                }
                obj.CodeTable = CodeTable;

                if (obj.FontFlagsHasLayout) {
                    obj.FontAscent  = bitio.getUI16();
                    obj.FontDescent = bitio.getUI16();
                    obj.FontLeading = bitio.getUI16();

                    var FontAdvanceTable = [];
                    i = 0;
                    while (i < numGlyphs) {
                        FontAdvanceTable[FontAdvanceTable.length] = bitio.getUI16();
                        i = 0 | i + 1;

                    }
                    obj.FontAdvanceTable = FontAdvanceTable;

                    var FontBoundsTable = [];
                    i = 0;
                    while (i < numGlyphs) {
                        FontBoundsTable[FontBoundsTable.length] = this.rect();
                        i = 0 | i + 1;
                    }
                    obj.FontBoundsTable = FontBoundsTable;

                    if (tagType === 75) {
                        var count         = bitio.getUI16();
                        obj.KerningCount  = count;

                        i = 0;
                        var kRecord = [];
                        var flag = obj.FontFlagsWideCodes;
                        while (i < count) {
                            var FontKerningCode1 = (flag) ? bitio.getUI16() : bitio.getUI8();
                            var FontKerningCode2 = (flag) ? bitio.getUI16() : bitio.getUI8();
                            var FontKerningAdjustment = bitio.getSIBits(16);

                            kRecord[kRecord.length] = {
                                FontKerningCode1:      FontKerningCode1,
                                FontKerningCode2:      FontKerningCode2,
                                FontKerningAdjustment: FontKerningAdjustment
                            };
                            i = 0 | i + 1;
                        }

                        obj.KerningRecord = kRecord;
                    }
                }
                break;
            default:
                break;
        }

    }

    bitio.byte_offset = endOffset;
    stage.setCharacter(obj.FontId, obj);
    stage.fonts[obj.FontName] = obj;
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineFontInfo = function (tagType, length)
{
    var bitio = this.getBitIO();
    var endOffset = bitio.byte_offset + length;

    var obj = {};
    obj.tagType = tagType;
    obj.FontId  = bitio.getUI16();

    var len  = bitio.getUI8();
    var data = bitio.getData(len);
    var str  = "";
    var i    = 0;
    while (i < len) {
        if (data[i] > 127) {
            continue;
        }

        str += this.$fromCharCode(data[i]);

        i = 0 | i + 1;
    }

    obj.FontFlagsReserved  = bitio.getUIBits(2);
    obj.FontFlagsSmallText = bitio.getUIBits(1);
    obj.FontFlagsShiftJIS  = bitio.getUIBits(1);
    obj.FontFlagsANSI      = bitio.getUIBits(1);
    obj.FontFlagsItalic    = bitio.getUIBits(1);
    obj.FontFlagsBold      = bitio.getUIBits(1);
    obj.FontFlagsWideCodes = bitio.getUIBits(1);
    if (tagType === 62) {
        obj.LanguageCode = bitio.getUI8();
    }

    var fontName;
    if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
        fontName = bitio.decodeToShiftJis(str);
    } else {
        fontName = decodeURIComponent(str);
    }
    obj.FontName = this.getFontName(fontName);

    bitio.byteAlign();

    var CodeTable = [];
    if (obj.FontFlagsWideCodes || tagType === 62) {
        while (bitio.byte_offset < endOffset) {
            CodeTable[CodeTable.length] = bitio.getUI16();
        }
    } else {
        while (bitio.byte_offset < endOffset) {
            CodeTable[CodeTable.length] = bitio.getUI8();
        }
    }
    obj.CodeTable = CodeTable;
};

/**
 * @param fontName
 * @returns {string}
 */
SwfTag.prototype.getFontName = function (fontName)
{
    var length = fontName.length;

    var str = fontName.substr(length - 1);
    if (str.charCodeAt(0) === 0) {
        fontName = fontName.slice(0, -1);
    }

    switch (fontName) {
        case "_sans":
            return "sans-serif";
        case "_serif":
            return "serif";
        case "_typewriter":
            return "monospace";
        default:
            var ander = fontName.substr(0, 1);
            if (ander === "_") {
                return "sans-serif";
            }
            return fontName;
    }
};

/**
 * parseDefineFontName
 */
SwfTag.prototype.parseDefineFontName = function ()
{
    var bitio = this.getBitIO();
    bitio.getUI16(); // FontId
    bitio.getDataUntil("\0"); // FontName
    bitio.getDataUntil("\0"); // FontCopyright
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineText = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    var characterId = bitio.getUI16();
    obj.tagType     = tagType;
    obj.bounds      = this.rect();
    obj.matrix      = this.matrix();

    var GlyphBits   = bitio.getUI8();
    var AdvanceBits = bitio.getUI8();
    obj.textRecords = this.getTextRecords(tagType, GlyphBits, AdvanceBits);

    stage.setCharacter(characterId, obj);
};

/**
 * @param tagType
 * @param GlyphBits
 * @param AdvanceBits
 * @returns {Array}
 */
SwfTag.prototype.getTextRecords = function (tagType, GlyphBits, AdvanceBits)
{
    var bitio   = this.getBitIO();
    var records = [];
    while (bitio.getUI8() !== 0) {
        bitio.incrementOffset(-1, 0);

        var obj = {};
        obj.TextRecordType       = bitio.getUIBits(1);
        obj.StyleFlagsReserved   = bitio.getUIBits(3);
        obj.StyleFlagsHasFont    = bitio.getUIBits(1);
        obj.StyleFlagsHasColor   = bitio.getUIBits(1);
        obj.StyleFlagsHasYOffset = bitio.getUIBits(1);
        obj.StyleFlagsHasXOffset = bitio.getUIBits(1);

        if (obj.StyleFlagsHasFont) {
            obj.FontId = bitio.getUI16();
        }

        if (obj.StyleFlagsHasColor) {
            if (tagType === 11) {
                obj.TextColor = this.rgb();
            } else {
                obj.TextColor = this.rgba();
            }
        }

        if (obj.StyleFlagsHasXOffset) {
            obj.XOffset = bitio.getUI16();
        }

        if (obj.StyleFlagsHasYOffset) {
            obj.YOffset = bitio.getUI16();
        }

        if (obj.StyleFlagsHasFont) {
            obj.TextHeight = bitio.getUI16();
        }

        obj.GlyphCount   = bitio.getUI8();
        obj.GlyphEntries = this.getGlyphEntries(obj.GlyphCount, GlyphBits, AdvanceBits);

        records[records.length] = obj;
    }

    return records;
};

/**
 * @param count
 * @param GlyphBits
 * @param AdvanceBits
 * @returns {Array}
 */
SwfTag.prototype.getGlyphEntries = function (count, GlyphBits, AdvanceBits)
{
    var bitio = this.getBitIO();

    var i = 0;
    var entries = [];
    while (i < count) {
        entries[entries.length] = {
            GlyphIndex:   bitio.getUIBits(GlyphBits),
            GlyphAdvance: bitio.getSIBits(AdvanceBits)
        };

        i = 0 | i + 1;
    }

    return entries;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineEditText = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};

    obj.CharacterId = bitio.getUI16();
    var bounds = this.rect();

    var flag1 = bitio.getUI8();
    obj.HasText      = (flag1 >>> 7) & 1;
    obj.WordWrap     = (flag1 >>> 6) & 1;
    obj.Multiline    = (flag1 >>> 5) & 1;
    obj.Password     = (flag1 >>> 4) & 1;
    obj.ReadOnly     = (flag1 >>> 3) & 1;
    obj.HasTextColor = (flag1 >>> 2) & 1;
    obj.HasMaxLength = (flag1 >>> 1) & 1;
    obj.HasFont      = flag1 & 1;

    var flag2 = bitio.getUI8();
    obj.HasFontClass = (flag2 >>> 7) & 1;
    obj.AutoSize     = (flag2 >>> 6) & 1;
    obj.HasLayout    = (flag2 >>> 5) & 1;
    obj.NoSelect     = (flag2 >>> 4) & 1;
    obj.Border       = (flag2 >>> 3) & 1;
    obj.WasStatic    = (flag2 >>> 2) & 1;
    obj.HTML         = (flag2 >>> 1) & 1;
    obj.UseOutlines  = flag2 & 1;

    var isJis = 0;
    if (obj.HasFont) {
        obj.FontID   = bitio.getUI16();
        var fontData = stage.getCharacter(obj.FontID);
        isJis = (fontData.FontFlagsShiftJIS) ? 1 : 0;

        if (obj.HasFontClass) {
            obj.FontClass = bitio.getDataUntil("\0");
        }
        obj.FontHeight = bitio.getUI16();
    }

    if (obj.HasTextColor) {
        obj.TextColor = this.rgba();
    }

    if (obj.HasMaxLength) {
        obj.MaxLength = bitio.getUI16();
    }

    if (obj.HasLayout) {
        obj.Align       = bitio.getUI8();
        obj.LeftMargin  = bitio.getUI16();
        obj.RightMargin = bitio.getUI16();
        obj.Indent      = bitio.getUI16();
        obj.Leading     = bitio.getUI16();
    }

    var VariableName = bitio.getDataUntil("\0", isJis) + "";
    obj.VariableName = (VariableName === "") ? null : VariableName;
    obj.InitialText  = "";
    if (obj.HasText) {
        var text = bitio.getDataUntil("\0", isJis);
        if (obj.HTML) {
            if (text.indexOf("<sbr />") !== -1) {
                text = text.replace(new RegExp("<sbr />", "gi"), "\n");
            }

            if (text.indexOf("<b>") !== -1) {
                text = text.replace(new RegExp("<b>", "gi"), "");
                text = text.replace(new RegExp("</b>", "gi"), "");
            }

            var span = this.$document.createElement("span");
            span.innerHTML = text;

            var tags    = span.getElementsByTagName("p");
            var length  = 0 | tags.length;
            var tagData = [];
            var i = 0;
            while (i < length) {
                tagData[i] = tags[i];
                i = 0 | i + 1;
            }

            obj.InitialText = tagData;
        } else {
            obj.InitialText = text;
        }
    }

    stage.setCharacter(obj.CharacterId, {
        data:    obj,
        bounds:  bounds,
        tagType: tagType
    });
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineMorphShape = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType     = tagType;
    obj.CharacterId = bitio.getUI16();
    obj.StartBounds = this.rect();
    obj.EndBounds   = this.rect();

    if (tagType === 84) {
        obj.StartEdgeBounds = this.rect();
        obj.EndEdgeBounds   = this.rect();
        bitio.getUIBits(6); // Reserved
        obj.UsesNonScalingStrokes = bitio.getUIBits(1);
        obj.UsesScalingStrokes    = bitio.getUIBits(1);
    }

    var offset    = bitio.getUI32();
    var endOffset = bitio.byte_offset + offset;

    obj.MorphFillStyles = this.fillStyleArray(tagType);
    obj.MorphLineStyles = this.lineStyleArray(tagType);

    obj.StartEdges = this.shapeWithStyle(tagType);
    if (bitio.byte_offset !== endOffset) {
        bitio.byte_offset = endOffset;
    }

    obj.EndEdges = this.shapeWithStyle(tagType);

    // fill1 control
    var startPosition     = {x: 0, y: 0};
    var endPosition       = {x: 0, y: 0};
    var StartRecords      = obj.StartEdges.ShapeRecords;
    var EndRecords        = obj.EndEdges.ShapeRecords;
    var StartRecordLength = StartRecords.length;
    var EndRecordLength   = EndRecords.length;

    var length = this.$max(StartRecordLength, EndRecordLength);

    var i = 0;
    while (i < length) {
        var addRecode   = {};
        var StartRecord = StartRecords[i];
        var EndRecord   = EndRecords[i];
        if (!StartRecord && !EndRecord) {
            i = 0 | i + 1;
            continue;
        }

        if (!StartRecord.isChange && !EndRecord.isChange) {
            if (StartRecord.isCurved) {
                startPosition.x += StartRecord.ControlX + StartRecord.AnchorX;
                startPosition.y += StartRecord.ControlY + StartRecord.AnchorY;
            } else {
                startPosition.x += StartRecord.AnchorX;
                startPosition.y += StartRecord.AnchorY;
            }

            if (EndRecord.isCurved) {
                endPosition.x += EndRecord.ControlX + EndRecord.AnchorX;
                endPosition.y += EndRecord.ControlY + EndRecord.AnchorY;
            } else {
                endPosition.x += EndRecord.AnchorX;
                endPosition.y += EndRecord.AnchorY;
            }

            i = 0 | i + 1;
            continue;
        }

        if (StartRecord.isChange && !EndRecord.isChange) {
            addRecode = {
                FillStyle0:      StartRecord.FillStyle0,
                FillStyle1:      StartRecord.FillStyle1,
                LineStyle:       StartRecord.LineStyle,
                StateFillStyle0: StartRecord.StateFillStyle0,
                StateFillStyle1: StartRecord.StateFillStyle1,
                StateLineStyle:  StartRecord.StateLineStyle,
                StateMoveTo:     StartRecord.StateMoveTo,
                StateNewStyles:  StartRecord.StateNewStyles,
                isChange:        true
            };

            if (StartRecord.StateMoveTo) {
                addRecode.MoveX = endPosition.x;
                addRecode.MoveY = endPosition.y;
                startPosition.x = StartRecord.MoveX;
                startPosition.y = StartRecord.MoveY;
            }

            EndRecords.splice(i, 0, addRecode);
        } else if (!StartRecord.isChange && EndRecord.isChange) {
            addRecode = {
                FillStyle0:      EndRecord.FillStyle0,
                FillStyle1:      EndRecord.FillStyle1,
                LineStyle:       EndRecord.LineStyle,
                StateFillStyle0: EndRecord.StateFillStyle0,
                StateFillStyle1: EndRecord.StateFillStyle1,
                StateLineStyle:  EndRecord.StateLineStyle,
                StateMoveTo:     EndRecord.StateMoveTo,
                StateNewStyles:  EndRecord.StateNewStyles,
                isChange:        true
            };

            if (EndRecord.StateMoveTo) {
                addRecode.MoveX = startPosition.x;
                addRecode.MoveY = startPosition.y;
                endPosition.x   = EndRecord.MoveX;
                endPosition.y   = EndRecord.MoveY;
            }

            StartRecords.splice(i, 0, addRecode);
        } else {
            if (StartRecord.StateMoveTo) {
                startPosition.x = StartRecord.MoveX;
                startPosition.y = StartRecord.MoveY;
            }

            if (EndRecord.StateMoveTo) {
                endPosition.x = EndRecord.MoveX;
                endPosition.y = EndRecord.MoveY;
            }
        }

        i = 0 | i + 1;
    }


    var FillType  = 0;
    var FillStyle = 0;
    length = obj.StartEdges.ShapeRecords.length;
    i = 0;
    while (i < length) {
        var record = StartRecords[i];
        i = 0 | i + 1;

        if (!record.isChange) {
            continue;
        }

        if (record.StateFillStyle0) {
            FillStyle = record.FillStyle0;
        }

        if (FillStyle) {
            record.StateFillStyle0 = 1;
            record.StateFillStyle1 = 1;
            if (FillType) {
                record.FillStyle0 = 0;
                record.FillStyle1 = FillStyle;
            } else {
                record.FillStyle0 = FillStyle;
                record.FillStyle1 = 0;
            }
        } else {
            record.StateFillStyle1 = 1;
            record.FillStyle1 = 0;
        }

        FillType = (FillType) ? 0 : 1;
    }

    stage.setCharacter(obj.CharacterId, obj);
};

/**
 * @param char
 * @param ratio
 * @returns {{data: Array, bounds: {xMax: number, xMin: number, yMax: number, yMin: number}}}
 */
SwfTag.prototype.buildMorphShape = function (char, ratio)
{
    var per = (ratio === undefined) ? 0 : ratio / 65535;
    var startPer = 1 - per;
    var newShapeRecords = [];

    var morphLineStyles = char.MorphLineStyles;
    var lineStyles      = morphLineStyles.lineStyles;
    var lineStyleCount  = morphLineStyles.lineStyleCount;

    var morphFillStyles = char.MorphFillStyles;
    var fillStyles      = morphFillStyles.fillStyles;
    var fillStyleCount  = morphFillStyles.fillStyleCount;

    var StartEdges        = char.StartEdges;
    var StartShapeRecords = StartEdges.ShapeRecords;

    var EndEdges        = char.EndEdges;
    var EndShapeRecords = EndEdges.ShapeRecords;

    var shapes = {
        lineStyles: {
            lineStyleCount: lineStyleCount,
            lineStyles:     []
        },
        fillStyles: {
            fillStyleCount: fillStyleCount,
            fillStyles:     []
        },
        ShapeRecords: []
    };

    var position = {x: 0, y: 0};
    var len = StartShapeRecords.length;
    for (var i = 0; i < len; i++) {
        var StartRecord = StartShapeRecords[i];
        if (!StartRecord) {
            continue;
        }

        var newRecord = {};
        var EndRecord = EndShapeRecords[i];
        if (StartRecord.isChange) {
            var MoveX = 0;
            var MoveY = 0;

            if (StartRecord.StateMoveTo === 1) {
                MoveX      = StartRecord.MoveX * startPer + EndRecord.MoveX * per;
                MoveY      = StartRecord.MoveY * startPer + EndRecord.MoveY * per;
                position.x = MoveX;
                position.y = MoveY;
            }

            newRecord = {
                FillStyle0:       StartRecord.FillStyle0,
                FillStyle1:      StartRecord.FillStyle1,
                LineStyle:       StartRecord.LineStyle,
                MoveX:           MoveX,
                MoveY:           MoveY,
                StateFillStyle0: StartRecord.StateFillStyle0,
                StateFillStyle1: StartRecord.StateFillStyle1,
                StateLineStyle:  StartRecord.StateLineStyle,
                StateMoveTo:     StartRecord.StateMoveTo,
                StateNewStyles:  StartRecord.StateNewStyles,
                isChange:        true
            };
        } else {
            var AnchorX = 0;
            var AnchorY = 0;
            var ControlX = 0;
            var ControlY = 0;

            var startAnchorX = StartRecord.AnchorX;
            var startAnchorY = StartRecord.AnchorY;
            var endAnchorX   = EndRecord.AnchorX;
            var endAnchorY   = EndRecord.AnchorY;

            var startControlX = StartRecord.ControlX;
            var startControlY = StartRecord.ControlY;
            var endControlX   = EndRecord.ControlX;
            var endControlY   = EndRecord.ControlY;

            if (per > 0 && per < 1 && StartRecord.isCurved !== EndRecord.isCurved) {
                if (!StartRecord.isCurved) {
                    startAnchorX  = StartRecord.AnchorX / 2;
                    startAnchorY  = StartRecord.AnchorY / 2;
                    startControlX = startAnchorX;
                    startControlY = startAnchorY;
                }
                if (!EndRecord.isCurved) {
                    endAnchorX  = EndRecord.AnchorX / 2;
                    endAnchorY  = EndRecord.AnchorY / 2;
                    endControlX = endAnchorX;
                    endControlY = endAnchorY;
                }
            }

            ControlX = startControlX * startPer + endControlX * per + position.x;
            ControlY = startControlY * startPer + endControlY * per + position.y;
            AnchorX  = startAnchorX * startPer + endAnchorX * per + ControlX;
            AnchorY  = startAnchorY * startPer + endAnchorY * per + ControlY;

            position.x = AnchorX;
            position.y = AnchorY;

            newRecord = {
                AnchorX:  AnchorX,
                AnchorY:  AnchorY,
                ControlX: ControlX,
                ControlY: ControlY,
                isChange: false,
                isCurved: (StartRecord.isCurved || EndRecord.isCurved)
            };
        }

        newShapeRecords[i] = newRecord;
    }
    newShapeRecords[newShapeRecords.length] = 0;
    shapes.ShapeRecords = newShapeRecords;

    var EndColor;
    var StartColor;
    var color;
    for (i = 0; i < lineStyleCount; i++) {
        var lineStyle = lineStyles[i];
        EndColor      = lineStyle.EndColor;
        StartColor    = lineStyle.StartColor;
        color = {
            R: this.$floor(StartColor.R * startPer + EndColor.R * per),
            G: this.$floor(StartColor.G * startPer + EndColor.G * per),
            B: this.$floor(StartColor.B * startPer + EndColor.B * per),
            A: StartColor.A * startPer + EndColor.A * per
        };

        var EndWidth   = lineStyles[i].EndWidth;
        var StartWidth = lineStyles[i].StartWidth;
        shapes.lineStyles.lineStyles[i] = {
            Width: this.$floor(StartWidth * startPer + EndWidth * per),
            Color: color,
            fillStyleType: 0
        };
    }

    for (i = 0; i < fillStyleCount; i++) {
        var fillStyle     = fillStyles[i];
        var fillStyleType = fillStyle.fillStyleType;

        if (fillStyleType === 0x00) {
            EndColor   = fillStyle.EndColor;
            StartColor = fillStyle.StartColor;
            color = {
                R: this.$floor(StartColor.R * startPer + EndColor.R * per),
                G: this.$floor(StartColor.G * startPer + EndColor.G * per),
                B: this.$floor(StartColor.B * startPer + EndColor.B * per),
                A: StartColor.A * startPer + EndColor.A * per
            };

            shapes.fillStyles.fillStyles[i] = {
                Color:         color,
                fillStyleType: fillStyleType
            };
        } else {
            var EndGradientMatrix = fillStyle.endGradientMatrix;
            var StartGradientMatrix = fillStyle.startGradientMatrix;
            var matrix = [
                StartGradientMatrix[0] * startPer + EndGradientMatrix[0] * per,
                StartGradientMatrix[1] * startPer + EndGradientMatrix[1] * per,
                StartGradientMatrix[2] * startPer + EndGradientMatrix[2] * per,
                StartGradientMatrix[3] * startPer + EndGradientMatrix[3] * per,
                StartGradientMatrix[4] * startPer + EndGradientMatrix[4] * per,
                StartGradientMatrix[5] * startPer + EndGradientMatrix[5] * per
            ];

            var gRecords = [];
            var gradient = fillStyle.gradient;
            var GradientRecords = gradient.GradientRecords;
            var gLen = GradientRecords.length;
            for (var gIdx = 0; gIdx < gLen; gIdx++) {
                var gRecord = GradientRecords[gIdx];
                EndColor    = gRecord.EndColor;
                StartColor  = gRecord.StartColor;

                color = {
                    R: this.$floor(StartColor.R * startPer + EndColor.R * per),
                    G: this.$floor(StartColor.G * startPer + EndColor.G * per),
                    B: this.$floor(StartColor.B * startPer + EndColor.B * per),
                    A: StartColor.A * startPer + EndColor.A * per
                };

                gRecords[gIdx] = {
                    Color: color,
                    Ratio: gRecord.StartRatio * startPer + gRecord.EndRatio * per
                };
            }

            shapes.fillStyles.fillStyles[i] = {
                gradient:       {GradientRecords: gRecords},
                gradientMatrix: matrix,
                fillStyleType:  fillStyleType
            };
        }
    }

    var EndBounds   = char.EndBounds;
    var StartBounds = char.StartBounds;
    var bounds = {
        xMax: StartBounds.xMax * startPer + EndBounds.xMax * per,
        xMin: StartBounds.xMin * startPer + EndBounds.xMin * per,
        yMax: StartBounds.yMax * startPer + EndBounds.yMax * per,
        yMin: StartBounds.yMin * startPer + EndBounds.yMin * per
    };

    return {
        data: this.$vtc.convert(shapes, true),
        bounds: bounds
    };
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseFrameLabel = function ()
{
    return {
        name:  this.getBitIO().getDataUntil("\0"),
        frame: 0
    };
};

/**
 * @param tagType
 * @returns {*}
 */
SwfTag.prototype.parseRemoveObject = function (tagType)
{
    var bitio = this.getBitIO();
    switch (tagType) {
        case 5:
            console.log("TODO: RemoveObject");
            return {
                CharacterId: bitio.getUI16(),
                Depth:       bitio.getUI16()
            };
        default:
            return {
                Depth: bitio.getUI16()
            };
    }
};

/**
 * @param tagType
 * @param length
 * @returns {*}
 */
SwfTag.prototype.parseDefineButton = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType   = tagType;
    var endOffset = bitio.byte_offset + length;
    obj.ButtonId  = bitio.getUI16();

    var ActionOffset = 0;
    if (tagType !== 7) {
        obj.ReservedFlags = bitio.getUIBits(7);
        obj.TrackAsMenu   = bitio.getUIBits(1);
        ActionOffset      = bitio.getUI16();
    }

    obj.characters = this.buttonCharacters(endOffset);

    // actionScript
    if (tagType === 7) {
        var offset = endOffset - bitio.byte_offset;
        if (offset > 0) {
            obj.actions = this.parseDoAction(offset);
        }
    } else if (ActionOffset > 0) {
        obj.actions = this.buttonActions(endOffset);
    }

    // set layer
    stage.setCharacter(obj.ButtonId, obj);
    if (bitio.byte_offset !== endOffset) {
        bitio.byte_offset = endOffset;
    }

    return obj;
};

/**
 * @param offset
 * @returns {Array}
 */
SwfTag.prototype.buttonCharacters = function (offset)
{
    var bitio = this.getBitIO();

    var characters = [];
    while (bitio.getUI8() !== 0) {
        bitio.incrementOffset(-1, 0);
        var cacheOffset = bitio.byte_offset;

        var record = this.buttonRecord();
        if (bitio.byte_offset > offset) {
            bitio.byte_offset = cacheOffset;
            break;
        }

        var depth = record.Depth;
        if (!(record.Depth in characters)) {
            characters[depth] = [];
        }

        var length = characters[depth].length;
        characters[depth][length] = record;
    }

    return characters;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.buttonRecord = function ()
{
    var bitio = this.getBitIO();

    var obj = {};

    bitio.getUIBits(2); // Reserved
    obj.PlaceFlagHasBlendMode  = bitio.getUIBits(1);
    obj.PlaceFlagHasFilterList = bitio.getUIBits(1);
    obj.ButtonStateHitTest     = bitio.getUIBits(1);
    obj.ButtonStateDown        = bitio.getUIBits(1);
    obj.ButtonStateOver        = bitio.getUIBits(1);
    obj.ButtonStateUp          = bitio.getUIBits(1);
    obj.CharacterId            = bitio.getUI16();
    obj.Depth                  = bitio.getUI16();
    obj.PlaceFlagHasMatrix     = 1;
    obj.Matrix                 = this.matrix();
    obj.ColorTransform         = this.colorTransform();

    obj.PlaceFlagHasColorTransform = (obj.ColorTransform === undefined) ? 0 : 1;
    if (obj.PlaceFlagHasBlendMode) {
        obj.BlendMode = bitio.getUI8();
    }

    if (obj.PlaceFlagHasFilterList) {
        obj.SurfaceFilterList = this.getFilterList();
    }

    obj.PlaceFlagHasRatio     = 0;
    obj.PlaceFlagHasClipDepth = 0;
    obj.Sound                 = null;

    return obj;
};

/**
 * @param endOffset
 * @returns {Array}
 */
SwfTag.prototype.buttonActions = function (endOffset)
{
    var bitio = this.getBitIO();

    var results = [];
    while (true) {
        var obj = {};
        var startOffset    = bitio.byte_offset;
        var CondActionSize = bitio.getUI16();

        obj.CondIdleToOverDown    = bitio.getUIBits(1);
        obj.CondOutDownToIdle     = bitio.getUIBits(1);
        obj.CondOutDownToOverDown = bitio.getUIBits(1);
        obj.CondOverDownToOutDown = bitio.getUIBits(1);
        obj.CondOverDownToOverUp  = bitio.getUIBits(1);
        obj.CondOverUpToOverDown  = bitio.getUIBits(1);
        obj.CondOverUpToIdle      = bitio.getUIBits(1);
        obj.CondIdleToOverUp      = bitio.getUIBits(1);
        obj.CondKeyPress          = bitio.getUIBits(7);
        obj.CondOverDownToIdle    = bitio.getUIBits(1);

        // ActionScript
        var length = endOffset - bitio.byte_offset + 1;

        obj.ActionScript = this.parseDoAction(length);
        results[results.length] = obj;

        if (!CondActionSize) {
            break;
        }

        bitio.byte_offset = startOffset + CondActionSize;
    }

    return results;
};

/**
 * @param tagType
 * @param length
 * @returns {{}}
 */
SwfTag.prototype.parsePlaceObject = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType = tagType;

    switch (tagType) {
        case 4:
            obj.CharacterId = bitio.getUI16();
            obj.Depth       = bitio.getUI16();
            obj.Matrix      = this.matrix();
            obj.PlaceFlagHasMatrix = 1;

            bitio.byteAlign();

            if ((bitio.byte_offset - startOffset) < length) {
                obj.ColorTransform = this.colorTransform();
                obj.PlaceFlagHasColorTransform = 1;
            }
            break;
        default:
            obj.PlaceFlagHasClipActions = bitio.getUIBits(1);
            if (stage.getVersion() < 5) {
                obj.PlaceFlagHasClipActions = 0;
            }

            obj.PlaceFlagHasClipDepth      = bitio.getUIBits(1);
            obj.PlaceFlagHasName           = bitio.getUIBits(1);
            obj.PlaceFlagHasRatio          = bitio.getUIBits(1);
            obj.PlaceFlagHasColorTransform = bitio.getUIBits(1);
            obj.PlaceFlagHasMatrix         = bitio.getUIBits(1);
            obj.PlaceFlagHasCharacter      = bitio.getUIBits(1);
            obj.PlaceFlagMove              = bitio.getUIBits(1);

            // PlaceObject3
            if (tagType === 70) {
                bitio.getUIBits(1); // Reserved
                obj.PlaceFlagOpaqueBackground = bitio.getUIBits(1);
                obj.PlaceFlagHasVisible       = bitio.getUIBits(1);
                obj.PlaceFlagHasImage         = bitio.getUIBits(1);
                obj.PlaceFlagHasClassName     = bitio.getUIBits(1);
                obj.PlaceFlagHasCacheAsBitmap = bitio.getUIBits(1);
                obj.PlaceFlagHasBlendMode     = bitio.getUIBits(1);
                obj.PlaceFlagHasFilterList    = bitio.getUIBits(1);
            }

            obj.Depth = bitio.getUI16();

            if (obj.PlaceFlagHasClassName ||
                (obj.PlaceFlagHasImage && obj.PlaceFlagHasCharacter)
            ) {
                obj.ClassName = bitio.getDataUntil("\0");
            }

            if (obj.PlaceFlagHasCharacter) {
                obj.CharacterId = bitio.getUI16();
            }

            if (obj.PlaceFlagHasMatrix) {
                obj.Matrix = this.matrix();
            }

            if (obj.PlaceFlagHasColorTransform) {
                obj.ColorTransform = this.colorTransform();
            }

            if (obj.PlaceFlagHasRatio) {
                obj.Ratio = bitio.getUI16();
            }

            if (obj.PlaceFlagHasName) {
                obj.Name = bitio.getDataUntil("\0");
            }

            if (obj.PlaceFlagHasClipDepth) {
                obj.ClipDepth = bitio.getUI16();
            }

            if (tagType === 70) {
                if (obj.PlaceFlagHasFilterList) {
                    obj.SurfaceFilterList = this.getFilterList();
                }
                if (obj.PlaceFlagHasBlendMode) {
                    obj.BlendMode = bitio.getUI8();
                }
                if (obj.PlaceFlagHasCacheAsBitmap) {
                    obj.BitmapCache = bitio.getUI8();
                }
                if (obj.PlaceFlagHasVisible) {
                    obj.Visible = bitio.getUI8();
                    obj.BackgroundColor = this.rgba();
                }
            }

            if (obj.PlaceFlagHasClipActions) {
                bitio.getUI16(); // Reserved
                obj.AllEventFlags = this.parseClipEventFlags();

                var endLength = startOffset + length;

                var actionRecords = [];
                while (bitio.byte_offset < endLength) {
                    var clipActionRecord = this.parseClipActionRecord(endLength);
                    actionRecords[actionRecords.length] = clipActionRecord;
                    if (endLength <= bitio.byte_offset) {
                        break;
                    }

                    var endFlag = (stage.getVersion() <= 5) ? bitio.getUI16() : bitio.getUI32();
                    if (!endFlag) {
                        break;
                    }

                    if (stage.getVersion() <= 5) {
                        bitio.byte_offset -= 2;
                    } else {
                        bitio.byte_offset -= 4;
                    }

                    if (clipActionRecord.KeyCode) {
                        bitio.byte_offset -= 1;
                    }
                }
                obj.ClipActionRecords = actionRecords;
            }

            break;
    }

    bitio.byteAlign();
    bitio.byte_offset = startOffset + length;

    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseClipActionRecord = function (endLength)
{
    var bitio = this.getBitIO();

    var obj = {};
    var EventFlags = this.parseClipEventFlags();
    if (endLength > bitio.byte_offset) {
        var ActionRecordSize = bitio.getUI32();
        if (EventFlags.keyPress) {
            obj.KeyCode = bitio.getUI8();
        }

        obj.EventFlags = EventFlags;
        obj.Actions    = this.parseDoAction(ActionRecordSize);
    }

    return obj;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseClipEventFlags = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.keyUp      = bitio.getUIBits(1);
    obj.keyDown    = bitio.getUIBits(1);
    obj.mouseUp    = bitio.getUIBits(1);
    obj.mouseDown  = bitio.getUIBits(1);
    obj.mouseMove  = bitio.getUIBits(1);
    obj.unload     = bitio.getUIBits(1);
    obj.enterFrame = bitio.getUIBits(1);
    obj.load       = bitio.getUIBits(1);

    if (stage.getVersion() >= 6) {
        obj.dragOver       = bitio.getUIBits(1);
        obj.rollOut        = bitio.getUIBits(1);
        obj.rollOver       = bitio.getUIBits(1);
        obj.releaseOutside = bitio.getUIBits(1);
        obj.release        = bitio.getUIBits(1);
        obj.press          = bitio.getUIBits(1);
        obj.initialize     = bitio.getUIBits(1);
    }

    obj.data = bitio.getUIBits(1);

    if (stage.getVersion() >= 6) {
        bitio.getUIBits(5); // Reserved
        obj.construct = bitio.getUIBits(1);
        obj.keyPress  = bitio.getUIBits(1);
        obj.dragOut   = bitio.getUIBits(1);
        bitio.getUIBits(8); // Reserved
    }

    bitio.byteAlign();

    return obj;
};

/**
 * @returns {Array}
 */
SwfTag.prototype.getFilterList = function ()
{
    var bitio = this.getBitIO();

    var NumberOfFilters = bitio.getUI8();
    var i = 0;
    var result = [];
    while (i < NumberOfFilters) {
        var filter = this.getFilter();
        if (filter) {
            result[result.length] = filter;
        }
        i = 0 | i + 1;
    }

    return (result.length) ? result : null;
};

/**
 * @return {{}}
 */
SwfTag.prototype.getFilter = function ()
{
    var bitio = this.getBitIO();

    var filterId = bitio.getUI8();
    var filter   = null;
    switch (filterId) {
        case 0:
            filter = this.dropShadowFilter();
            break;
        case 1:
            filter = this.blurFilter();
            break;
        case 2:
            filter = this.glowFilter();
            break;
        case 3:
            filter = this.bevelFilter();
            break;
        case 4:
            filter = this.gradientGlowFilter();
            break;
        case 5:
            filter = this.convolutionFilter();
            break;
        case 6:
            filter = this.colorMatrixFilter();
            break;
        case 7:
            filter = this.gradientBevelFilter();
            break;
    }

    return filter;
};

/**
 * @returns {DropShadowFilter}
 */
SwfTag.prototype.dropShadowFilter = function ()
{
    var bitio = this.getBitIO();

    var rgba  = this.rgba();
    var alpha = rgba.A;
    var color = rgba.R << 16 | rgba.G << 8 | rgba.B;

    var blurX      = bitio.getUI32() / 0x10000;
    var blurY      = bitio.getUI32() / 0x10000;
    var angle      = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance   = bitio.getUI32() / 0x10000;
    var strength   = bitio.getFloat16() / 256;
    var inner      = (bitio.getUIBits(1)) ? true  : false;
    var knockout   = (bitio.getUIBits(1)) ? true  : false;
    var hideObject = (bitio.getUIBits(1)) ? false : true;
    var quality    = bitio.getUIBits(5);

    if (!strength) {
        return null;
    }

    return new DropShadowFilter(
        distance, angle, color, alpha, blurX, blurY,
        strength, quality, inner, knockout, hideObject
    );
};

/**
 * @returns {BlurFilter}
 */
SwfTag.prototype.blurFilter = function ()
{
    var bitio   = this.getBitIO();
    var blurX   = bitio.getUI32() / 0x10000;
    var blurY   = bitio.getUI32() / 0x10000;
    var quality = bitio.getUIBits(5);
    bitio.getUIBits(3); // Reserved

    return new BlurFilter(blurX, blurY, quality);
};

/**
 * @returns {GlowFilter}
 */
SwfTag.prototype.glowFilter = function ()
{
    var bitio    = this.getBitIO();
    var rgba     = this.rgba();
    var alpha    = rgba.A;
    var color    = rgba.R << 16 | rgba.G << 8 | rgba.B;
    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource
    var quality = bitio.getUIBits(5);

    if (!strength) {
        return null;
    }

    return new GlowFilter(
        color, alpha, blurX, blurY,
        strength, quality, inner, knockout
    );
};

/**
 * @returns {BevelFilter}
 */
SwfTag.prototype.bevelFilter = function ()
{
    var bitio = this.getBitIO();

    var rgba;
    rgba = this.rgba();
    var highlightAlpha = rgba.A;
    var highlightColor = rgba.R << 16 | rgba.G << 8 | rgba.B;

    rgba = this.rgba();
    var shadowAlpha = rgba.A;
    var shadowColor = rgba.R << 16 | rgba.G << 8 | rgba.B;

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new BevelFilter(
        distance, angle, highlightColor, highlightAlpha,
        shadowColor, shadowAlpha, blurX, blurY,
        strength, quality, type, knockout
    );
};

/**
 * @returns {GradientGlowFilter}
 */
SwfTag.prototype.gradientGlowFilter = function ()
{
    var bitio = this.getBitIO();

    var NumColors = bitio.getUI8()|0;

    var colors = [];
    var alphas = [];

    var i = 0;
    while (i < NumColors) {
        var rgba = this.rgba();
        alphas[alphas.length] = rgba.A;
        colors[colors.length] = (rgba.R << 16 | rgba.G << 8 | rgba.B)|0;
        i = (i + 1)|0;
    }

    i = 0;
    var ratios = [];
    while (i < NumColors) {
        ratios[ratios.length] = +(bitio.getUI8() / 255);
        i = (i + 1)|0;
    }

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new GradientGlowFilter(
        distance, angle, colors, alphas, ratios,
        blurX, blurY, strength, quality, type, knockout
    );
};

/**
 * @returns {ConvolutionFilter}
 */
SwfTag.prototype.convolutionFilter = function ()
{
    var bitio = this.getBitIO();

    var matrixX = bitio.getUI8();
    var matrixY = bitio.getUI8();
    var divisor = bitio.getFloat32;
    var bias    = bitio.getFloat32;

    // matrix
    var count = matrixX * matrixY;
    var matrix = [];
    while (count) {
        count = (count - 1)|0;
        matrix[matrix.length] = bitio.getFloat32();
    }

    var color = this.rgba();

    // Reserved
    bitio.getUIBits(6);

    var clamp         = (bitio.getUIBits(1)) ? true :false;
    var preserveAlpha = (bitio.getUIBits(1)) ? true :false;

    return new ConvolutionFilter(
        matrixX, matrixY, matrix, divisor, bias,
        preserveAlpha, clamp, color
    );
};

/**
 * @returns {GradientBevelFilter}
 */
SwfTag.prototype.gradientBevelFilter = function ()
{
    var bitio = this.getBitIO();

    var NumColors = bitio.getUI8()|0;

    var colors = [];
    var alphas = [];

    var i = 0;
    while (i < NumColors) {
        var rgba = this.rgba();
        alphas[alphas.length] = rgba.A;
        colors[colors.length] = (rgba.R << 16 | rgba.G << 8 | rgba.B)|0;
        i = (i + 1)|0;
    }


    i = 0;
    var ratios = [];
    while (i < NumColors) {
        ratios[ratios.length] = +(bitio.getUI8() / 255);
        i = (i + 1)|0;
    }

    var blurX    = bitio.getUI32() / 0x10000;
    var blurY    = bitio.getUI32() / 0x10000;
    var angle    = bitio.getUI32() / 0x10000 * 180 / this.$PI;
    var distance = bitio.getUI32() / 0x10000;
    var strength = bitio.getFloat16() / 256;
    var inner    = (bitio.getUIBits(1)) ? true : false;
    var knockout = (bitio.getUIBits(1)) ? true : false;
    bitio.getUIBits(1); // CompositeSource

    var OnTop   = bitio.getUIBits(1);
    var quality = bitio.getUIBits(4);

    var type = "inner";
    if (!inner) {
        if (OnTop) {
            type = "full";
        } else {
            type = "outer";
        }
    }

    if (!strength) {
        return null;
    }

    return new GradientBevelFilter(
        distance, angle, colors, alphas, ratios,
        blurX, blurY, strength, quality, type, knockout
    );
};

/**
 * @returns {ColorMatrixFilter}
 */
SwfTag.prototype.colorMatrixFilter = function ()
{
    var bitio = this.getBitIO();
    var matrix = [];
    for (var i = 0; i < 20; i++) {
        matrix[matrix.length] = bitio.getFloat32();
    }
    return new ColorMatrixFilter(matrix);
};

/**
 * @returns {Array}
 */
SwfTag.prototype.colorTransform = function ()
{
    var bitio = this.getBitIO();
    bitio.byteAlign();

    var result = [1, 1, 1, 1, 0, 0, 0, 0];

    var first6bits    = bitio.getUIBits(6);
    var HasAddTerms   = first6bits >> 5;
    var HasMultiTerms = (first6bits >> 4) & 1;
    var nbits         = first6bits & 0x0f;

    if (HasMultiTerms) {
        result[0] = bitio.getSIBits(nbits) / 256;
        result[1] = bitio.getSIBits(nbits) / 256;
        result[2] = bitio.getSIBits(nbits) / 256;
        result[3] = bitio.getSIBits(nbits) / 256;
    }

    if (HasAddTerms) {
        result[4] = bitio.getSIBits(nbits);
        result[5] = bitio.getSIBits(nbits);
        result[6] = bitio.getSIBits(nbits);
        result[7] = bitio.getSIBits(nbits);
    }

    return result;
};

/**
 * @param length
 */
SwfTag.prototype.parseDefineSprite = function (length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var characterId = bitio.getUI16();
    bitio.getUI16(); // FrameCount

    stage.setCharacter(characterId, this.parseTags(length, characterId));
};

/**
 * @param length
 * @returns {ActionScript}
 */
SwfTag.prototype.parseDoAction = function (length)
{
    var bitio = this.getBitIO();
    var data  = bitio.getData(length);
    return new ActionScript(data);
};

/**
 * @param length
 */
SwfTag.prototype.parseDoInitAction = function (length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var spriteId = bitio.getUI16();

    var as = new ActionScript(bitio.getData(length - 2), undefined, undefined, true);
    var mc = stage.getParent();
    mc.variables = {};
    var action = mc.createActionScript2(as);
    var packages = stage.packages;
    if (spriteId in packages) {
        mc.active = true;
        action.apply(mc);
        mc.active = false;
    }
    stage.initActions[spriteId] = action;
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseDefineSceneAndFrameLabelData = function ()
{

    var bitio = this.getBitIO();

    var obj = {};
    var count = 0 | bitio.getU30();
    obj.SceneCount = count;

    var sceneInfo  = [];
    var i = 0;
    while (i < count) {
        sceneInfo[i] = {
            offset: bitio.getU30(),
            name:   decodeURIComponent(bitio.getDataUntil("\0"))
        };
        i = 0 | i + 1;
    }
    obj.sceneInfo = sceneInfo;

    count = 0 | bitio.getU30();
    obj.FrameLabelCount = count;

    var frameInfo = [];
    i = 0;
    while (i < count) {
        frameInfo[i] = {
            num:   bitio.getU30(),
            label: decodeURIComponent(bitio.getDataUntil("\0"))
        };
        i = 0 | i + 1;
    }
    obj.frameInfo = frameInfo;

    return obj;
};

/**
 * @param tagType
 * @returns {{}}
 */
SwfTag.prototype.parseSoundStreamHead = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType = tagType;

    bitio.getUIBits(4); // Reserved

    // 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
    obj.PlaybackSoundRate = bitio.getUIBits(2);

    // 0 = 8-bit, 1 = 16-bit
    obj.PlaybackSoundSize = bitio.getUIBits(1);

    // 0 = Mono, 1 = Stereo
    obj.PlaybackSoundType = bitio.getUIBits(1);

    // 0 = Uncompressed(native-endian)
    // 1 = ADPCM
    // 2 = MP3
    // 3 = Uncompressed(little-endian)
    // 4 = Nellymoser 16 kHz
    // 5 = Nellymoser 8 kHz
    // 6 = Nellymoser
    // 11 = Speex
    obj.StreamSoundCompression = bitio.getUIBits(4);

    // 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
    obj.StreamSoundRate = bitio.getUIBits(2);

    // 0 = 8-bit, 1 = 16-bit
    obj.StreamSoundSize = bitio.getUIBits(1);

    // 0 = Mono, 1 = Stereo
    obj.StreamSoundType = bitio.getUIBits(1);

    obj.StreamSoundSampleCount = bitio.getUI16();

    if (obj.StreamSoundCompression === 2) {
        obj.LatencySeek = bitio.getSIBits(2);
    }

    return obj;
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDoABC = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    stage.abcFlag = true;

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType = tagType;
    obj.Flags   = bitio.getUI32();
    obj.Name    = bitio.getDataUntil("\0");

    // ABCBitIO
    var offset   = length - (bitio.byte_offset - startOffset);
    var ABCData  = bitio.getData(offset);
    var ABCBitIO = new BitIO();
    ABCBitIO.setData(ABCData);

    // version
    obj.minorVersion = ABCBitIO.getUI16();
    obj.majorVersion = ABCBitIO.getUI16();

    // integer
    obj.integer = this.ABCInteger(ABCBitIO);

    // uinteger
    obj.uinteger = this.ABCUinteger(ABCBitIO);

    // double
    obj.double = this.ABCDouble(ABCBitIO);

    // string_info
    obj.string = this.ABCStringInfo(ABCBitIO);

    // namespace_info
    obj.namespace = this.ABCNameSpaceInfo(ABCBitIO);

    // ns_set_info
    obj.nsSet = this.ABCNsSetInfo(ABCBitIO);

    // multiname_info;
    obj.multiname_info = this.ABCMultiNameInfo(ABCBitIO);

    var i = 0;

    // method_info
    obj.method = [];
    var methodCount = 0 | ABCBitIO.getU30();
    if (methodCount) {
        var method = [];
        i = 0;
        while (i < methodCount) {
            method[i] = this.ABCMethodInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.method = method;
    }

    // metadata_info
    obj.metadata = [];
    var metadataCount = 0 | ABCBitIO.getU30();
    if (metadataCount) {
        var metadataInfo = [];
        i = 0;
        while (i < metadataCount) {
            metadataInfo[i] = this.ABCMetadataInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.metadata = metadataInfo;
    }

    var classCount = 0 | ABCBitIO.getU30();
    obj.instance   = [];
    obj.class      = [];
    console.log(classCount)
    if (classCount) {
        // instance_info
        var instance = [];
        i = 0;
        while (i < classCount) {
            instance[i] = this.ABCInstanceInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        console.log(instance)
        obj.instance = instance;

        // class_info
        var classInfo = [];
        i = 0;
        while (i < classCount) {
            classInfo[i] = this.ABCClassInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.class = classInfo;
    }

    // script_info
    obj.script = [];
    var scriptCount = ABCBitIO.getU30();
    if (scriptCount) {
        var script = [];
        i = 0;
        while (i < scriptCount) {
            script[i] = this.ABCScriptInfo(ABCBitIO);
            i = 0 | i + 1;
        }
        obj.script = script;
    }

    // method_body_info
    obj.methodBody = [];
    var methodBodyCount  = ABCBitIO.getU30();
    if (methodBodyCount) {
        var methodBody = [];
        i = 0;
        while (i < methodBodyCount) {
            var mBody = this.ABCMethodBodyInfo(ABCBitIO);
            methodBody[mBody.method] = mBody;
            i = 0 | i + 1;
        }
        obj.methodBody = methodBody;
    }

    // build names
    obj = this.ABCMultinameToString(obj);

    // build instance
    this.ABCBuildInstance(obj);
};

/**
 * @param obj
 */
SwfTag.prototype.ABCBuildInstance = function (obj)
{
    var stage = this.getStage();

    var instances  = obj.instance;
    var length     = instances.length|0;
    var namespaces = obj.namespace;
    var string     = obj.string;
    var names      = obj.names;

    var i = 0;
    while (i < length) {
        var instance = instances[i];
        var flag     = instance.flags;

        var nsIndex = null;
        if (flag & 0x08) {
            nsIndex = instance.protectedNs;
        }

        var object = {};
        if (nsIndex) {
            var nObj = namespaces[nsIndex];
            object   = string[nObj.name];
        } else {
            object = names[instance.name];
        }

        var values    = object.split(":");
        var className = values.pop();
        var ns        = values.pop();

        // build parent
        var AVM2 = function (mc) { this["__swf2js__::builder"] = mc; };
        var prop = AVM2.prototype;

        // constructor
        prop[className] = this.ABCCreateActionScript3(obj, instance.iinit, object);

        // prototype
        var traits   = instance.trait;
        var tLength  = 0 | traits.length;
        var register = [];
        var rCount = 1;
        if (tLength) {
            var idx = 0;
            while (idx < tLength) {
                var trait  = traits[idx];
                var tName  = names[trait.name];
                var tNames = tName.split("::");
                var pName  =  tNames.pop();
                var kind   = trait.kind;

                var val = undefined;
                switch (kind) {
                    case 0: // Slot
                        register[rCount] = pName;
                        rCount = 0 | rCount + 1;
                        break;
                    case 1: // Method
                    case 2: // Getter
                    case 3: // Setter
                        val = this.ABCCreateActionScript3(obj, trait.data.info, object);
                        break;
                    case 4: // Class
                        console.log("build: Class");
                        break;
                    case 5: // Function
                        console.log("build: Function");
                        break;
                    case 6: // Const
                        console.log("build: Const");
                        break;
                }

                prop[pName] = val;
                idx = 0 | idx + 1;
            }
        }

        var localName   = "__swf2js__:"+ object;
        prop[localName] = {};

        // extends
        var superName           = instance.superName;
        prop[localName].extends = names[superName];

        // register
        prop[localName].register = register;

        // build
        var abc = stage.abc;
        var classObj = stage.avm2;
        if (ns) {
            var nss  = ns.split(".");
            var nLen = 0 | nss.length;
            var nIdx = 0;
            while (nIdx < nLen) {
                if (!(nss[nIdx] in classObj)) {
                    classObj[nss[nIdx]] = {};
                    abc[nss[nIdx]] = {};
                }

                classObj = classObj[nss[nIdx]];
                abc      = abc[nss[nIdx]];

                nIdx = 0 | nIdx + 1;
            }
        }

        abc[className]      = AVM2;
        classObj[className] = new AVM2();

        i = 0 | i + 1;
    }
};

/**
 * @param obj
 * @param methodId
 * @param abcKey
 */
SwfTag.prototype.ABCCreateActionScript3 = function (obj, methodId, abcKey)
{
    var stage = this.getStage();
    return (function (data, id, ns, stage)
    {
        return function ()
        {
            var as3    = new ActionScript3(data, id, ns, stage);
            as3.caller = this;
            as3.args   = arguments;
            return as3.execute();
        };
    })(obj, methodId, abcKey, stage);
};

/**
 * @param obj
 * @returns {*}
 */
SwfTag.prototype.ABCMultinameToString = function (obj)
{
    var multinames = obj.multiname_info;

    var length = 0 | multinames.length;
    var string = obj.string;

    var ns = obj.namespace;

    var names = [];
    var i = 1;
    while (i < length) {
        var info = multinames[i];
        var str = "";

        switch (info.kind) {
            case 0x07: // QName
            case 0x0D: // QNameA
                var namespace_info = ns[info.ns];
                switch (namespace_info.kind) {
                    default:
                        str += string[namespace_info.name];
                        break;
                    case 0x05:
                        str += "private";
                        break;
                }

                if (str !== "") {
                    str += "::";
                }

                str += string[info.name];
                break;
            case 0x0F: // RTQName
            case 0x10: // RTQNameA
                console.log("RTQName", i, info);
                break;
            case 0x09: // Multiname
            case 0x0E: // MultinameA
                str = string[info.name];
                break;
            case 0x1B: // MultinameL
            case 0x1C: // MultinameLA
                str = null;
                break;
            case 0x11: // RTQNameL
            case 0x12: // RTQNameLA
                console.log("RTQNameL", i, info);

                break;
        }

        names[i] = str;
        i = 0 | i + 1;
    }
    obj.names = names;
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCInteger = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getS30();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCUinteger = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCDouble = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.getFloat64LittleEndian();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCStringInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = ABCBitIO.AbcReadString();
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCNameSpaceInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            array[i] = {
                kind: ABCBitIO.getUI8(),
                name: ABCBitIO.getU30()
            };
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCNsSetInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            var nsCount = 0 | ABCBitIO.getU30();
            var ns = [];
            if (nsCount) {
                var j = 0;
                while (j < nsCount) {
                    ns[j] = ABCBitIO.getU30();
                    j = 0 | j + 1;
                }
            }

            array[i] = ns;
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCMultiNameInfo = function (ABCBitIO)
{
    var array = [];
    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var i = 1;
        while (i < count) {
            var obj = {};
            obj.kind = ABCBitIO.getUI8();
            switch (obj.kind) {
                case 0x07: // QName
                case 0x0D: // QNameA
                    obj.ns   = ABCBitIO.getU30();
                    obj.name = ABCBitIO.getU30();
                    break;
                case 0x0F: // RTQName
                case 0x10: // RTQNameA
                    obj.name = ABCBitIO.getU30();
                    break;
                case 0x09: // Multiname
                case 0x0E: // MultinameA
                    obj.name   = ABCBitIO.getU30();
                    obj.ns_set = ABCBitIO.getU30();
                    break;
                case 0x1B: // MultinameL
                case 0x1C: // MultinameLA
                    obj.ns_set = ABCBitIO.getU30();
                    break;
                case 0x11: // RTQNameL
                case 0x12: // RTQNameLA
                    break;
            }
            array[i] = obj;
            i = 0 | i + 1;
        }
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMethodInfo = function (ABCBitIO)
{
    var obj = {};
    var i;
    var count = 0 | ABCBitIO.getU30();
    obj.paramCount = count;
    obj.returnType = ABCBitIO.getU30();
    obj.paramType  = [];
    if (count) {
        var paramType = [];
        i = 0;
        while (i < count) {
            paramType[paramType.length] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
        obj.paramType = paramType;
    }

    obj.name  = ABCBitIO.getU30();
    obj.flags = ABCBitIO.getUI8();

    obj.options = [];
    if (obj.flags === 0x08) {
        var options = [];
        var optionCount = 0 | ABCBitIO.getU30();
        if (optionCount) {
            i = 0;
            while (i < optionCount) {
                options[options.length] = {
                    val:  ABCBitIO.getU30(),
                    kind: ABCBitIO.getUI8()
                };
                i = 0 | i + 1;
            }
        }
        obj.options = options;
    }

    obj.paramName = [];
    if (obj.flags === 0x80) {
        var paramName = [];
        if (count) {
            i = 0;
            while (i < count) {
                paramName[paramName.length] = ABCBitIO.getU30();
                i = 0 | i + 1;
            }
        }
        obj.paramName = paramName;
    }

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMetadataInfo = function (ABCBitIO)
{
    var obj = {};

    obj.name  = ABCBitIO.getU30();
    obj.items = [];

    var count = 0 | ABCBitIO.getU30();
    if (count) {
        var items = [];
        var i = 0;
        while (i < count) {
            items[items.length] = {
                key:   ABCBitIO.getU30(),
                value: ABCBitIO.getU30()
            };
            i = 0 | i + 1;
        }
        obj.items = items;
    }

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCInstanceInfo = function (ABCBitIO)
{
    var obj = {};
    obj.name      = ABCBitIO.getU30();
    obj.superName = ABCBitIO.getU30();
    obj.flags     = ABCBitIO.getUI8();
    if (obj.flags & 0x08) {
        obj.protectedNs = ABCBitIO.getU30();
    }

    var count = 0 | ABCBitIO.getU30();
    obj.interfaces = [];
    if (count) {
        var interfaces = [];
        var i = 0;
        while (i < count) {
            interfaces[interfaces.length] = ABCBitIO.getU30();
            i = 0 | i + 1;
        }
        obj.interfaces = interfaces;
    }

    obj.iinit = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);

    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCClassInfo = function (ABCBitIO)
{
    var obj = {};
    obj.cinit = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);
    return obj;
};

/**
 * @param ABCBitIO
 */
SwfTag.prototype.ABCScriptInfo = function (ABCBitIO)
{
    var obj = {};
    obj.init  = ABCBitIO.getU30();
    obj.trait = this.ABCTrait(ABCBitIO);
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCMethodBodyInfo = function (ABCBitIO)
{
    var obj = {};
    obj.method         = ABCBitIO.getU30();
    obj.maxStack       = ABCBitIO.getU30();
    obj.localCount     = ABCBitIO.getU30();
    obj.initScopeDepth = ABCBitIO.getU30();
    obj.maxScopeDepth  = ABCBitIO.getU30();

    var count = ABCBitIO.getU30();
    var codes = [];
    if (count) {
        codes = this.ABCBuildCode(ABCBitIO, count);
    }
    obj.codes = codes;

    count = 0 | ABCBitIO.getU30();
    var exceptions = [];
    if (count) {
        var i = 0;
        while (i < count) {
            exceptions[exceptions.length] = this.ABCException(ABCBitIO);
            i = 0 | i + 1;
        }
    }

    obj.exceptions = exceptions;
    obj.trait      = this.ABCTrait(ABCBitIO);

    return obj;
};

/**
 * @param ABCBitIO
 * @param count
 * @returns {Array}
 */
SwfTag.prototype.ABCBuildCode = function (ABCBitIO, count)
{
    var array = [];
    var cacheOffset = 0;
    var i = 0;
    while (i < count) {
        var obj = {};
        var offset = 0;

        var code = ABCBitIO.getUI8();
        obj.code = code;
        switch (code) {
            case 0x86: // astype
            case 0x41: // call
            case 0x80: // coerce
            case 0x42: // construct
            case 0x49: // constructsuper
            case 0xf1: // debugfile
            case 0xf0: // debugline
            case 0x94: // declocal
            case 0xc3: // declocal_i
            case 0x6a: // deleteproperty
            case 0x06: // dxns
            case 0x5e: // findproperty
            case 0x5d: // findpropstrict
            case 0x59: // getdescendants
            case 0x6e: // getglobalslot
            case 0x60: // getlex
            case 0x62: // getlocal
            case 0x66: // getproperty
            case 0x6c: // getslot
            case 0x04: // getsuper
            case 0x92: // inclocal
            case 0xc2: // inclocal_i
            case 0x68: // initproperty
            case 0xb2: // istype
            case 0x08: // kill
            case 0x56: // newarray
            case 0x5a: // newcatch
            case 0x58: // newclass
            case 0x40: // newfunction
            case 0x55: // newobject
            case 0x2f: // pushdouble
            case 0x2d: // pushint
            case 0x31: // pushnamespace
            case 0x25: // pushshort
            case 0x2c: // pushstring
            case 0x2e: // pushuint
            case 0x63: // setlocal
            case 0x6f: // setglobalslot
            case 0x61: // setproperty
            case 0x6d: // setslot
            case 0x05: // setsuper
                cacheOffset = ABCBitIO.byte_offset;
                obj.value1  = ABCBitIO.getU30();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                break;
            case 0x1b: // lookupswitch
                obj.value1 = ABCBitIO.getSI24();
                offset += 3;
                cacheOffset = ABCBitIO.byte_offset;
                obj.value2  = ABCBitIO.getSI24();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                obj.value3 = ABCBitIO.getSI24();
                offset += 3;
                break;
            case 0x65: // getscopeobject
            case 0x24: // pushbyte
                obj.value1 = ABCBitIO.getSI8();
                offset += 1;
                break;
            case 0x32: // hasnext2
                obj.value1 = ABCBitIO.getSI8();
                obj.value2 = ABCBitIO.getSI8();
                offset += 2;
                break;
            case 0x13: // ifeq
            case 0x12: // iffalse
            case 0x18: // ifge
            case 0x17: // ifgt
            case 0x16: // ifle
            case 0x15: // iflt
            case 0x0f: // ifnge
            case 0x0e: // ifngt
            case 0x0d: // ifnle
            case 0x0c: // ifnlt
            case 0x14: // ifne
            case 0x19: // ifstricteq
            case 0x1a: // ifstrictne
            case 0x11: // iftrue
            case 0x10: // jump
                obj.value1 = ABCBitIO.getSI24();
                offset += 3;
                break;
            case 0x43: // callmethod
            case 0x46: // callproperty
            case 0x4c: // callproplex
            case 0x4f: // callpropvoid
            case 0x44: // callstatic
            case 0x45: // callsuper
            case 0x4e: // callsupervoid
            case 0x4a: // constructprop
            case 0xef: // debug
                cacheOffset = ABCBitIO.byte_offset;
                obj.value1  = ABCBitIO.getU30();
                obj.value2  = ABCBitIO.getU30();
                offset += (ABCBitIO.byte_offset - cacheOffset);
                break;
        }

        obj.offset = offset;
        array[i] = obj;

        i += offset;
    }
    return array;
};

/**
 * @param ABCBitIO
 * @returns {{}}
 */
SwfTag.prototype.ABCException = function (ABCBitIO)
{
    var obj = {};
    obj.from    = ABCBitIO.getU30();
    obj.to      = ABCBitIO.getU30();
    obj.target  = ABCBitIO.getU30();
    obj.excType = ABCBitIO.getU30();
    obj.varName = ABCBitIO.getU30();
    return obj;
};

/**
 * @param ABCBitIO
 * @returns {Array}
 */
SwfTag.prototype.ABCTrait = function (ABCBitIO)
{
    var count = ABCBitIO.getU30();
    var trait = [];
    if (count) {
        for (var i = 0; i < count; i++) {
            var tObj = {};
            tObj.name = ABCBitIO.getU30();

            var tag  = ABCBitIO.getUI8();
            var kind = tag & 0x0f;
            var attributes = (kind >> 4) & 0x0f;

            var data = {};
            switch (kind) {
                default:
                    console.log("ERROR:"+ kind);
                    break;
                case 0: // Trait_Slot
                case 6: // Trait_Const
                    data.id    = ABCBitIO.getU30();
                    data.name  = ABCBitIO.getU30();
                    data.index = ABCBitIO.getU30();
                    data.kind  = null;
                    if (data.index !== 0) {
                        data.kind = ABCBitIO.getUI8();
                    }
                    break;
                case 1: // Trait_Method
                case 2: // Trait_Getter
                case 3: // Trait_Setter
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
                case 4: // Trait_Class
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
                case 5: // Trait_Function
                    data.id   = ABCBitIO.getU30();
                    data.info = ABCBitIO.getU30();
                    break;
            }
            tObj.kind = kind;
            tObj.data = data;

            if (attributes & 0x04) {
                var metadataCount = ABCBitIO.getU30();
                var metadata = [];
                if (metadataCount) {
                    for (var j = 0; j < metadataCount; j++) {
                        metadata[metadata.length] = ABCBitIO.getU30();
                    }
                }
                tObj.metadata = metadata;
            }

            trait[trait.length] = tObj;
        }
    }

    return trait;
};

/**
 * parseSymbolClass
 */
SwfTag.prototype.parseSymbolClass = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var symbols = stage.symbols;
    var count   = bitio.getUI16();
    if (count) {
        var i = 0;
        while (i < count) {
            var tagId      = bitio.getUI16();
            symbols[tagId] = bitio.getDataUntil("\0");
            i = 0 | i + 1;
        }
    }
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseDefineSound = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType          = tagType;
    obj.SoundId          = bitio.getUI16();
    obj.SoundFormat      = bitio.getUIBits(4);
    obj.SoundRate        = bitio.getUIBits(2);
    obj.SoundSize        = bitio.getUIBit();
    obj.SoundType        = bitio.getUIBit();
    obj.SoundSampleCount = bitio.getUI32();

    var sub = bitio.byte_offset - startOffset;
    var dataLength = 0 | length - sub;
    var data = bitio.getData(dataLength);
    var SoundData = "";
    var i = 0;
    while (i < dataLength) {
        SoundData += this.$fromCharCode(data[i]);
        i = 0 | i + 1;
    }

    bitio.byte_offset = startOffset + length;

    var mimeType = "";
    switch (obj.SoundFormat) {
        case 0: // Uncompressed native-endian
        case 3: // Uncompressed little-endian
            mimeType = "wave";
            break;
        case 1: // ADPCM ? 32KADPCM
            mimeType = "wave";
            break;
        case 2: // MP3
            mimeType = "mpeg";
            break;
        case 4: // Nellymoser 16
        case 5: // Nellymoser 8
        case 6: //
            mimeType = "nellymoser";
            break;
        case 11: // Speex
            mimeType = "speex";
            break;
        case 15:
            mimeType = "x-aiff";
            break;
    }

    obj.base64 = "data:audio/" + mimeType + ";base64," + window.btoa(SoundData);
    stage.sounds[obj.SoundId] = obj;
};

/**
 * @param tagType
 */
SwfTag.prototype.parseStartSound = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType = tagType;
    obj.SoundId = bitio.getUI16();
    if (tagType === 89) {
        obj.SoundClassName = bitio.getDataUntil("\0");
    }

    obj.SoundInfo = this.parseSoundInfo();
    stage.setCharacter(obj.SoundId, obj);

    var sound = stage.sounds[obj.SoundId];
    var audio = this.$document.createElement("audio");
    audio.onload = function ()
    {
        this.load();
        this.preload = "auto";
        this.autoplay = false;
        this.loop = false;
    };
    audio.src = sound.base64;

    var loadSounds = stage.loadSounds;
    loadSounds[loadSounds.length] = audio;

    return {
        SoundId: obj.SoundId,
        Audio:   audio,
        tagType: tagType
    };
};

/**
 * parseDefineButtonSound
 */
SwfTag.prototype.parseDefineButtonSound = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var buttonId = bitio.getUI16();
    var btnObj   = stage.getCharacter(buttonId);

    for (var i = 0; i < 4; i++) {
        var soundId = bitio.getUI16();
        if (soundId) {
            var soundInfo = this.parseSoundInfo();
            switch (i) {
                case 0:
                    btnObj.ButtonStateUpSoundInfo = soundInfo;
                    btnObj.ButtonStateUpSoundId   = soundId;
                    break;
                case 1:
                    btnObj.ButtonStateOverSoundInfo = soundInfo;
                    btnObj.ButtonStateOverSoundId   = soundId;
                    break;
                case 2:
                    btnObj.ButtonStateDownSoundInfo = soundInfo;
                    btnObj.ButtonStateDownSoundId   = soundId;
                    break;
                case 3:
                    btnObj.ButtonStateHitTestSoundInfo = soundInfo;
                    btnObj.ButtonStateHitTestSoundId   = soundId;
                    break;
            }
        }
    }

    stage.setCharacter(buttonId, btnObj);
};

/**
 * @returns {{}}
 */
SwfTag.prototype.parseSoundInfo = function ()
{
    var bitio = this.getBitIO();

    var obj = {};
    bitio.getUIBits(2); // Reserved
    obj.SyncStop       = bitio.getUIBit();
    obj.SyncNoMultiple = bitio.getUIBit();
    obj.HasEnvelope    = bitio.getUIBit();
    obj.HasLoops       = bitio.getUIBit();
    obj.HasOutPoint    = bitio.getUIBit();
    obj.HasInPoint     = bitio.getUIBit();

    if (obj.HasInPoint) {
        obj.InPoint = bitio.getUI32();
    }

    if (obj.HasOutPoint) {
        obj.OutPoint = bitio.getUI32();
    }

    if (obj.HasLoops) {
        obj.LoopCount = bitio.getUI16();
    }

    if (obj.HasEnvelope) {
        var point = 0 | bitio.getUI8();
        var i = 0;
        var EnvelopeRecords = [];
        while (i < point) {
            EnvelopeRecords[i] = {
                Pos44:      bitio.getUI32(),
                LeftLevel:  bitio.getUI16(),
                RightLevel: bitio.getUI16()
            };
            i = 0 | i + 1;
        }
        obj.EnvPoints       = point;
        obj.EnvelopeRecords = EnvelopeRecords;
    }

    return obj;
};

/**
 * parseDefineFontAlignZones
 */
SwfTag.prototype.parseDefineFontAlignZones = function ()
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var FontId = bitio.getUI16();
    var tag    = stage.getCharacter(FontId);

    tag.CSMTableHint = bitio.getUIBits(2);
    bitio.getUIBits(6); // Reserved

    var NumGlyphs = 0 | tag.NumGlyphs;
    var ZoneTable = [];
    var i = 0;
    while (i < NumGlyphs) {
        var NumZoneData = 0 | bitio.getUI8();
        var ZoneData = [];
        var idx = 0;
        while (idx < NumZoneData) {
            ZoneData[idx] = bitio.getUI32();
            idx = 0 | idx + 1;
        }

        ZoneTable[i] = {
            ZoneData: ZoneData,
            Mask: bitio.getUI8()
        };

        i = 0 | i + 1;
    }

    bitio.byteAlign();
    tag.ZoneTable = ZoneTable;
    stage.setCharacter(FontId, tag);
};

/**
 * @param tagType
 */
SwfTag.prototype.parseCSMTextSettings = function (tagType)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType      = tagType;
    obj.TextID       = bitio.getUI16();
    obj.UseFlashType = bitio.getUIBits(2);
    obj.GridFit      = bitio.getUIBits(3);
    bitio.getUIBits(3); // Reserved

    obj.Thickness = bitio.getUI32();
    obj.Sharpness = bitio.getUI32();
    bitio.getUI8(); // Reserved
};

/**
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseSoundStreamBlock = function (tagType, length)
{
    var bitio = this.getBitIO();

    var obj = {};
    obj.tagType    = tagType;
    obj.compressed = bitio.getData(length);
};

/**
 * @param tagType
 */
SwfTag.prototype.parseDefineVideoStream = function (tagType)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var obj = {};
    obj.tagType     = tagType;
    obj.CharacterId = bitio.getUI16();
    obj.NumFrames   = bitio.getUI16();
    obj.Width       = bitio.getUI16();
    obj.Height      = bitio.getUI16();
    bitio.getUIBits(4); // Reserved

    obj.VideoFlagsDeblocking = bitio.getUIBits(3);
    obj.VideoFlagsSmoothing  = bitio.getUIBits(1);
    obj.CodecID              = bitio.getUI8();

    stage.setCharacter(obj.CharacterId, obj);
    console.log(obj);
};

/**
 *
 * @param tagType
 * @param length
 */
SwfTag.prototype.parseVideoFrame = function (tagType, length)
{
    var bitio = this.getBitIO();
    var stage = this.getStage();

    var startOffset = bitio.byte_offset;

    var obj = {};
    obj.tagType  = tagType;
    obj.StreamID = bitio.getUI16();
    obj.FrameNum = bitio.getUI16();

    var StreamData = stage.getCharacter(obj.StreamID);
    var sub        = bitio.byte_offset - startOffset;
    var dataLength = length - sub;
    var VideoData;
    switch (StreamData.CodecID) {
        case 4:
            VideoData = this.parseVp6SwfVideoPacket(dataLength);
            break;
    }

    bitio.byte_offset = startOffset + length;

    // obj.base64 = 'data:image/jpeg;base64,' + window.btoa(VideoData);
    stage.videos[obj.StreamID] = obj;
};

/**
 * @param length
 * @returns {string}
 */
SwfTag.prototype.parseVp6SwfVideoPacket = function (length)
{
    var bitio = this.getBitIO();

    var VideoData = "";
    var data = bitio.getData(length);

    console.log(data);

    return VideoData;
};

/**
 * parseFileAttributes
 */
SwfTag.prototype.parseFileAttributes = function ()
{
    var bitio = this.getBitIO();

    var obj = {};
    bitio.getUIBit(); // Reserved
    obj.UseDirectBlit = bitio.getUIBit();
    obj.UseGPU        = bitio.getUIBit();
    obj.HasMetadata   = bitio.getUIBit();
    obj.ActionScript3 = bitio.getUIBit();
    obj.Reserved2     = bitio.getUIBits(3);
    obj.UseNetwork    = bitio.getUIBit();
    obj.Reserved3     = bitio.getUIBits(24);
};

/**
 * parseDefineScalingGrid
 */
SwfTag.prototype.parseDefineScalingGrid = function ()
{
    var obj         = {};
    var bitio       = this.getBitIO();
    obj.CharacterId = bitio.getUI16();
    obj.Splitter    = this.rect();
};
/**
 * @constructor
 */
var VectorToCanvas = function () {};

/**
 * Function
 */
VectorToCanvas.prototype.$Function = Function;

/**
 * @param src
 * @returns {{}}
 */
VectorToCanvas.prototype.clone = function (src)
{
    var execute = function (src, obj)
    {
        var prop;
        for (prop in src) {
            if (!src.hasOwnProperty(prop)) {
                continue;
            }

            var value = src[prop];
            if (value instanceof Array) {
                obj[prop] = [];
                execute(value, obj[prop]);
            } else if (value instanceof Object) {
                obj[prop] = {};
                execute(value, obj[prop]);
            } else {
                obj[prop] = value;
            }
        }
    };

    var obj = {};
    execute(src, obj);
    return obj;
};

/**
 * @param shapes
 * @param isMorph
 * @returns {Array}
 */
VectorToCanvas.prototype.convert = function (shapes, isMorph)
{
    var lineStyles = shapes.lineStyles.lineStyles;
    var fillStyles = shapes.fillStyles.fillStyles;
    var records    = shapes.ShapeRecords;
    var idx        = 0;
    var obj        = {};
    var cache      = [];
    var AnchorX    = 0;
    var AnchorY    = 0;
    var MoveX      = 0;
    var MoveY      = 0;
    var LineX      = 0;
    var LineY      = 0;
    var FillStyle0 = 0;
    var FillStyle1 = 0;
    var LineStyle  = 0;
    var fills0     = [];
    var fills1     = [];
    var lines      = [];
    var stack      = [];
    var depth      = 0;

    var length = records.length|0;
    var i = 0;
    while (i < length) {
        var record = records[i];
        i = (i + 1)|0;

        if (!record) {
            stack = this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
            stack = this.setStack(stack, lines);
            break;
        }

        if (record.isChange) {
            depth = (depth + 1)|0;
            if (record.StateNewStyles) {
                AnchorX = 0;
                AnchorY = 0;
                stack   = this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
                stack   = this.setStack(stack, lines);
                fills0  = [];
                fills1  = [];
                lines   = [];

                if (record.NumFillBits) {
                    fillStyles = record.FillStyles.fillStyles;
                }

                if (record.NumLineBits) {
                    lineStyles = record.LineStyles.lineStyles;
                }
            }

            MoveX = AnchorX;
            MoveY = AnchorY;
            if (record.StateMoveTo) {
                MoveX = record.MoveX;
                MoveY = record.MoveY;
            }

            LineX = MoveX;
            LineY = MoveY;

            if (record.StateFillStyle0) {
                FillStyle0 = record.FillStyle0|0;
            }

            if (record.StateFillStyle1) {
                FillStyle1 = record.FillStyle1|0;
            }

            if (record.StateLineStyle) {
                LineStyle = record.LineStyle|0;
            }

            continue;
        }

        AnchorX      = record.AnchorX;
        AnchorY      = record.AnchorY;
        var ControlX = record.ControlX;
        var ControlY = record.ControlY;
        var isCurved = record.isCurved;

        if (FillStyle0) {
            idx = (FillStyle0 - 1)|0;
            if (!(idx in fills0)) {
                fills0[idx] = [];
            }

            if (!(depth in fills0[idx])) {
                fills0[idx][depth] = {
                    obj:    fillStyles[idx],
                    startX: MoveX,
                    startY: MoveY,
                    endX:   0,
                    endY:   0,
                    cache:  []
                };
            }

            obj   = fills0[idx][depth];
            cache = obj.cache;
            cache[cache.length] = this.clone(record);

            obj.endX = AnchorX;
            obj.endY = AnchorY;
        }

        if (FillStyle1) {
            idx = (FillStyle1 - 1)|0;
            if (!(idx in fills1)) {
                fills1[idx] = [];
            }

            if (!(depth in fills1[idx])) {
                fills1[idx][depth] = {
                    obj:    fillStyles[idx],
                    startX: MoveX,
                    startY: MoveY,
                    endX:   0,
                    endY:   0,
                    cache:  []
                };
            }

            obj   = fills1[idx][depth];
            cache = obj.cache;
            cache[cache.length] = this.clone(record);

            obj.endX = AnchorX;
            obj.endY = AnchorY;
        }

        if (LineStyle) {
            idx = (LineStyle - 1)|0;
            if (!(idx in lines)) {
                lines[idx] = {
                    obj:   lineStyles[idx],
                    cache: []
                };
            }

            obj   = lines[idx];
            cache = obj.cache;
            cache[cache.length] = [0, LineX, LineY];

            var code = [2, AnchorX, AnchorY];
            if (isCurved) {
                code = [1, ControlX, ControlY, AnchorX, AnchorY];
            }

            cache[cache.length] = code;
        }

        LineX = AnchorX;
        LineY = AnchorY;
    }

    return stack;
};

/**
 * @param fills0
 * @param fills1
 * @param isMorph
 * @returns {*}
 */
VectorToCanvas.prototype.fillMerge = function (fills0, fills1, isMorph)
{
    fills0 = this.fillReverse(fills0);

    if (fills0.length) {
        for (var idx in fills0) {
            if (!fills0.hasOwnProperty(idx)) {
                continue;
            }

            var fills = fills0[idx];
            if (idx in fills1) {
                var fill1 = fills1[idx];
                for (var depth in fills) {
                    if (!fills.hasOwnProperty(depth)) {
                        continue;
                    }

                    fill1[fill1.length] = fills[depth];
                }
            } else {
                fills1[idx] = fills;
            }
        }
    }

    return this.coordinateAdjustment(fills1, isMorph);
};

/**
 * @param fills0
 * @returns {*}
 */
VectorToCanvas.prototype.fillReverse = function (fills0)
{
    if (!fills0.length) {
        return fills0;
    }

    for (var i in fills0) {
        if (!fills0.hasOwnProperty(i)) {
            continue;
        }

        var fills = fills0[i];
        for (var depth in fills) {
            if (!fills.hasOwnProperty(depth)) {
                continue;
            }

            var AnchorX = 0;
            var AnchorY = 0;
            var obj     = fills[depth];
            var cacheX  = obj.startX;
            var cacheY  = obj.startY;
            var cache   = obj.cache;
            var length  = cache.length|0;
            if (length) {
                for (var idx in cache) {
                    if (!cache.hasOwnProperty(idx)) {
                        continue;
                    }

                    var recode     = cache[idx];
                    AnchorX        = recode.AnchorX;
                    AnchorY        = recode.AnchorY;
                    recode.AnchorX = cacheX;
                    recode.AnchorY = cacheY;
                    cacheX         = AnchorX;
                    cacheY         = AnchorY;
                }

                var array = [];
                if (length > 0) {
                    while (length) {
                        length = (length - 1)|0;
                        array[array.length] = cache[length];
                    }
                }

                obj.cache = array;
            }

            cacheX     = obj.startX;
            cacheY     = obj.startY;
            obj.startX = obj.endX;
            obj.startY = obj.endY;
            obj.endX   = cacheX;
            obj.endY   = cacheY;
        }
    }
    return fills0;
};

/**
 * @param fills1
 * @param isMorph
 */
VectorToCanvas.prototype.coordinateAdjustment = function (fills1, isMorph)
{
    for (var i in fills1) {
        if (!fills1.hasOwnProperty(i)) {
            continue;
        }

        var array = [];
        var fills = fills1[i];

        for (var depth in fills) {
            if (!fills.hasOwnProperty(depth)) {
                continue;
            }

            array[array.length] = fills[depth];
        }

        var adjustment = [];
        if (array.length > 1 && !isMorph) {
            while (true) {
                if (!array.length) {
                    break;
                }

                var fill = array.shift();
                if (fill.startX === fill.endX && fill.startY === fill.endY) {
                    adjustment[adjustment.length] = fill;
                    continue;
                }

                var length = array.length|0;
                if (length < 0) {
                    break;
                }

                var isMatch = 0;
                while (length) {
                    length = (length - 1)|0;

                    var comparison = array[length];
                    if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
                        fill.endX  = comparison.endX;
                        fill.endY  = comparison.endY;
                        var cache0 = fill.cache;
                        var cache1 = comparison.cache;
                        var cLen   = cache1.length|0;
                        var cIdx   = 0;
                        while (cIdx < cLen) {
                            cache0[cache0.length] = cache1[cIdx];
                            cIdx = (cIdx + 1)|0;
                        }

                        array.splice(length, 1);
                        array.unshift(fill);
                        isMatch = 1;
                        break;
                    }
                }

                if (!isMatch) {
                    array.unshift(fill);
                }
            }
        } else {
            adjustment = array;
        }

        var aLen  = adjustment.length|0;
        var cache = [];
        var obj   = {};
        var idx   = 0;
        while (idx < aLen) {

            var data   = adjustment[idx];
            obj        = data.obj;
            var caches = data.cache;
            var cacheLength = (caches.length)|0;
            cache[cache.length] = [0, data.startX, data.startY];

            var compIdx = 0;
            while (compIdx < cacheLength) {
                var r = caches[compIdx];
                var code = [2, r.AnchorX, r.AnchorY];
                if (r.isCurved) {
                    code = [1, r.ControlX, r.ControlY, r.AnchorX, r.AnchorY];
                }
                cache[cache.length] = code;
                compIdx = (compIdx + 1)|0;
            }

            idx = (idx + 1)|0;
        }

        fills1[i] = {cache: cache, obj: obj};
    }

    return fills1;
};

/**
 * @param stack
 * @param array
 * @returns {*}
 */
VectorToCanvas.prototype.setStack = function (stack, array)
{
    if (array.length) {
        for (var i in array) {
            if (!array.hasOwnProperty(i)) {
                continue;
            }

            var data = array[i];
            stack[stack.length] = {
                obj: data.obj,
                cmd: this.buildCommand(data.cache)
            };
        }
    }

    return stack;
};

/**
 * @param cache
 * @returns {*}
 */
VectorToCanvas.prototype.buildCommand = function (cache)
{
    return this.toCanvas2D(cache);
};

/**
 * @param cache
 * @returns {*}
 */
VectorToCanvas.prototype.toCanvas2D = function (cache)
{
    var length = cache.length|0;
    var str    = "";
    var i      = 0;
    while (i < length) {
        var a = cache[i];
        switch (a[0]) {
            case 0:
                str += "ctx.moveTo(" + a[1] + "," + a[2] + ");";
                break;
            case 1:
                str += "ctx.quadraticCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + ");";
                break;
            case 2:
                str += "ctx.lineTo(" + a[1] + "," + a[2] + ");";
                break;
            case 3:
                str += "ctx.bezierCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + ");";
                break;
            case 4:
                str += "ctx.moveTo(" + (a[1] + a[3]) + "," + a[2] + ");";
                str += "ctx.arc(" + a[1] + "," + a[2] + "," + a[3] + ",0 , Math.PI*2, false);";
                break;

            // Graphics
            case 5: // fillStyle
                str += "var r = Math.max(0, Math.min(("+ a[1] +" * ct[0]) + ct[4], 255))|0;";
                str += "var g = Math.max(0, Math.min(("+ a[2] +" * ct[1]) + ct[5], 255))|0;";
                str += "var b = Math.max(0, Math.min(("+ a[3] +" * ct[2]) + ct[6], 255))|0;";
                str += "var a = Math.max(0, Math.min(("+ a[4] +" * 255 * ct[3]) + ct[7], 255)) / 255;";
                str += "ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
                break;
            case 6: // strokeStyle
                str += "var r = Math.max(0, Math.min(("+ a[1] +" * ct[0]) + ct[4], 255))|0;";
                str += "var g = Math.max(0, Math.min(("+ a[2] +" * ct[1]) + ct[5], 255))|0;";
                str += "var b = Math.max(0, Math.min(("+ a[3] +" * ct[2]) + ct[6], 255))|0;";
                str += "var a = Math.max(0, Math.min(("+ a[4] +" * 255 * ct[3]) + ct[7], 255)) / 255;";
                str += "ctx.strokeStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
                break;
            case 7: // fill
                str += "if (!isClip) { ctx.fill(); }";
                break;
            case 8: // stroke
                str += "if (!isClip) { ctx.stroke(); }";
                break;
            case 9: // width
                str += "ctx.lineWidth = "+ a[1] +";";
                break;
            case 10: // lineCap
                str += "ctx.lineCap = '"+ a[1] +"';";
                break;
            case 11: // lineJoin
                str += "ctx.lineJoin = '"+ a[1] +"';";
                break;
            case 12: // miterLimit
                str += "ctx.miterLimit = '"+ a[1] +"';";
                break;
            case 13: // beginPath
                str += "ctx.beginPath();";
                break;
        }

        i = (i + 1)|0;
    }

    return new this.$Function("ctx", "ct", "isClip", str);
};

Util.prototype.$vtc = new VectorToCanvas();
/**
 * @constructor
 */
var CacheStore = function ()
{
    this.pool    = [];
    this.store   = [];
    this.size    = 73400320;
};

/**
 * util
 */
CacheStore.prototype = Object.create(Util.prototype);
CacheStore.prototype.constructor = CacheStore;

/**
 * reset
 */
CacheStore.prototype.reset = function ()
{
    var store = this.store;
    for (var key in store) {
        if (!store.hasOwnProperty(key)) {
            continue;
        }

        var value = store[key];
        if (!(value instanceof CanvasRenderingContext2D)) {
            continue;
        }

        this.destroy(value);
    }

    this.store = [];
    this.size  = 73400320;
};

/**
 * @param ctx
 */
CacheStore.prototype.destroy = function (ctx)
{
    var pool   = this.pool;
    var canvas = ctx.canvas;
    var width  = canvas.width|0;
    var height = canvas.height|0;

    this.size = (this.size + width * height)|0;

    if (this.$canWebGL) {
        ctx.clear(ctx.STENCIL_BUFFER_BIT | ctx.COLOR_BUFFER_BIT);
    } else {
        ctx.clearRect(0, 0, width + 1, height + 1);
    }

    // reset
    canvas.width = canvas.height = 1;

    // pool
    pool[pool.length] = canvas;
};

/**
 * @returns {*}
 */
CacheStore.prototype.getCanvas = function ()
{
    return this.pool.pop() || this.$document.createElement("canvas");
};

/**
 * @param key
 * @returns {*}
 */
CacheStore.prototype.getCache = function (key)
{
    return this.store[key];
};

/**
 * @param key
 * @param value
 */
CacheStore.prototype.setCache = function (key, value)
{
    if (value instanceof CanvasRenderingContext2D) {
        var canvas = value.canvas;
        this.size  = (this.size - (canvas.width * canvas.height))|0;
    }
    this.store[key] = value;
};

/**
 * @param id
 * @param matrix
 * @param cxForm
 * @returns {string}
 */
CacheStore.prototype.generateKey = function (id, matrix, cxForm)
{
    // matrix
    var m = 0;
    if (matrix !== undefined) {
        var length = matrix.length|0;
        switch (length) {
            case 2:
                m = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
                break;
            default:
                var x = this.$sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
                var y = this.$sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
                m = this.$sqrt(x * x + y * y);
                break;
        }
    }

    // colorTransform
    var c0 = this.$sqrt(cxForm[0] * cxForm[0] + cxForm[4] * cxForm[4]);
    var c1 = this.$sqrt(cxForm[1] * cxForm[1] + cxForm[5] * cxForm[5]);
    var c2 = this.$sqrt(cxForm[2] * cxForm[2] + cxForm[6] * cxForm[6]);
    var c3 = this.$sqrt(cxForm[3] * cxForm[3] + cxForm[7] * cxForm[7]);
    var cx = this.$sqrt(c0 * c1 + c2 * c3);

    return id + "_" + this.$sqrt(m * m + cx * cx);
};

Util.prototype.$cacheStore = new CacheStore();
/**
 * @constructor
 */
var Swf2js = function () {};

/**
 * util
 */
Swf2js.prototype = Object.create(Util.prototype);
Swf2js.prototype.constructor = Swf2js;

/**
 * @type {DropShadowFilter}
 */
Swf2js.prototype.DropShadowFilter = DropShadowFilter;

/**
 * @type {BlurFilter}
 */
Swf2js.prototype.BlurFilter = BlurFilter;

/**
 * @type {GlowFilter}
 */
Swf2js.prototype.GlowFilter = GlowFilter;

/**
 * @type {BevelFilter}
 */
Swf2js.prototype.BevelFilter = BevelFilter;

/**
 * @type {GradientGlowFilter}
 */
Swf2js.prototype.GradientGlowFilter = GradientGlowFilter;

/**
 * @type {ConvolutionFilter}
 */
Swf2js.prototype.ConvolutionFilter = ConvolutionFilter;

/**
 * @type {ColorMatrixFilter}
 */
Swf2js.prototype.ColorMatrixFilter = ColorMatrixFilter;

/**
 * @type {GradientBevelFilter}
 */
Swf2js.prototype.GradientBevelFilter = GradientBevelFilter;

/**
 * @type {BitmapFilter}
 */
Swf2js.prototype.BitmapFilter = BitmapFilter;

/**
 * @type {LoadVars}
 */
Swf2js.prototype.LoadVars = LoadVars;


/**
 * @param url
 * @param options
 */
Swf2js.prototype.load = function (url, options)
{
    // develop only
    if (url === "develop") {
        url = location.search.substr(1).split("&")[0];
    }

    if (url) {
        var self = this;

        // stage setup
        var stage = (options && options.stage instanceof Stage) ? options.stage : new Stage();
        stage.setOptions(options);
        self.$stages[stage.getId()] = stage;

        // init
        stage.init();

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET", url, true);

        if (self.$canXHR2) {
            xmlHttpRequest.responseType = "arraybuffer";
        } else {
            xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
        }

        xmlHttpRequest.onreadystatechange = function ()
        {
            var readyState = xmlHttpRequest.readyState|0;
            if (readyState === 4) {
                var status = xmlHttpRequest.status|0;
                switch (status) {
                    case 200:
                    case 304:
                        var data = (self.$canXHR2) ? xmlHttpRequest.response : xmlHttpRequest.responseText;
                        stage.parse(data, url);
                        self.$cacheStore.reset();
                        break;
                    default :
                        alert(xmlHttpRequest.statusText);
                        break;
                }
            }
        };

        xmlHttpRequest.send(null);
    } else {
        alert("please set swf url");
    }
};

/**
 * @param url
 * @param options
 * @returns {*}
 */
Swf2js.prototype.reload = function(url, options)
{
    if (!stageId) {
        return this.load(url, options);
    }

    var stages = this.$stages;
    var stage  = stages[0];
    for (var idx in stages) {
        if (!stages.hasOwnProperty(idx)) {
            continue;
        }

        var target = stages[idx];
        target.stop();

        if (idx) {
            target.deleteNode(target.tagId);
            target = void 0;
        }
    }

    // reset
    stageId          = 1;
    this.$stages     = [];
    this.$loadStages = [];
    this.$stages[0]  = stage;

    // reload
    stage.reload(url, options);
};

/**
 * @param width
 * @param height
 * @param fps
 * @param options
 * @returns {MovieClip}
 */
Swf2js.prototype.createRootMovieClip = function(width, height, fps, options)
{
    var stage = new Stage();
    width     = width  || 240;
    height    = height || 240;
    fps       = fps    || 60;

    // set
    stage.setBaseWidth(width);
    stage.setBaseHeight(height);
    stage.setFrameRate(fps);
    stage.setOptions(options);
    this.$stages[stage.getId()] = stage;

    // init
    stage.init();
    stage.isLoad = true;

    if (this.$document.readyState === "loading") {
        var reLoad = function()
        {
            window.removeEventListener("DOMContentLoaded", reLoad, false);
            stage.resize();
            stage.loaded();
        };
        window.addEventListener("DOMContentLoaded", reLoad, false);
    }

    return stage.getParent();
};
        window.swf2js = new Swf2js();
    })(window);
}