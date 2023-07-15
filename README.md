english → https://github.com/ikakonbu/Misskey-TL-Filter/blob/main/README-en.md  

# Misskey-TL-Filter
Misskeyで、フィルタリングを設定して特定の投稿を非表示にできるchrome拡張機能  
　  

   
# もくじ
* [対応環境](#対応環境)
* [昨日の説明](#機能の説明)
* [導入方法](#導入方法)
* [今後の開発予定](#今後の機能追加で検討しているもの)
* [Firefoxの人へ](#forFirefox)
* [io以外のサーバーの人へ](#他サーバーへの対応)
* [デフォルトで利用可能なサーバー一覧](#動作可能なサーバー一覧)
* [質問集など](#質問集)
　  

# 対応環境
WindowsおよびMacのChrome,Miscrost EdgeなどのChromium系ブラウザ, Firefox  
デフォルトUI および　デッキUI で動作を確認しています。  
下にある **動作可能なサーバーの一覧** に記載されているサーバで利用できます。  
一覧に記載されていないサーバでも、下にある  **他サーバーへの対応**  を行うことで他のmisskeyサーバーでも利用可能です。
また、Firefoxでは事前にブラウザの設定が必要になります。下にある **Firefoxの方へ**  を見てください

　  

# 機能の説明
機能はシンプルで,https://Misskey.io(設定した場合は他のサーバーでも) を開くと拡張機能が有効になります。  
開いている状態で拡張機能アイコンをクリックすると、各種フィルタの設定画面が開きます。

![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/2e689b22-9071-412c-aa95-1bfcf8321a19)
![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/e6873deb-7332-4b68-8e11-58ccfabb62b7)




上段ではTLごとにかけるフィルタリングを設定できます。  
ホーム、ローカル、ソーシャル、グローバル、リスト、ユーザープロフィール、ロール　のタイムラインに設定できます

* **RNを非表示**　　　　　リノートを全て非表示にします。
* **引用を非表示**　　　　引用ノートを全て非表示にします
* **NSFWを非表示**　　　閲覧注意の設定がされた画像、動画が添付されているノートをすべて非表示にします。
* **CWを非表示**　　　　`もっと見る` で本文が隠されているノートを全て非表示にします。
* **メディア非表示**　　　　写真、動画を非表示にします。(ホーム,リスト,ロール,プロフィールでのみ設定可能)
* **botを非表示**　　　　bot設定されたアカウントからの投稿を非表示にします(ローカル、ソーシャルでのみ設定可能)
* **ローカルを非表示**　　自分と同じサーバーからの投稿を非表示にします(グローバルのみ設定可能)
  
中段では全てのタイムラインで適用されるオプションです。
* **チャンネルノートを非表示**　　　  チャンネル投稿に設定されているノートを全て非表示にします。
* **画像、動画をすべて非表示**　　　　画像や動画の添付されたノートをすべて非表示にします
* **自分のサーバーからのノートを非表示**　　自分のいるサーバーから投稿されたノートを全て非表示にします
* **よそのサーバーからのノートを非表示**　　自分のところ以外のサーバーから投稿されたノートだけを表示します
* **ユーザーミュート** 右の入力欄に設定されたユーザーIDからのノートを全て非表示にします。
* **ユーザーRenoteミュート**  右の入力欄に設定されたユーザーIDのRenoteを全て非表示にします。
  
>例: 村上さん(@AureoleArk)としゅいろさん(@syuilo) を非表示にしたい場合は, ` AureoleArk,syuilo `と入力すると非表示になります。
>他のサーバーのユーザー(@ikakonbu@nijimiss.moe)の場合は、` ikakonbu@nijimiss.moe ` のように入れてください  

下段ではそのほかの設定が可能です。
* **フォロー、フォロワー数を隠す**　ユーザープロフィールなどにあるフォロー数やフォロワー数を隠します。
* **横長絵文字を見やすくする**　絵文字選択画面で不等幅の絵文字を正方形でなく長方形で表示し、絵文字の入力をやりやすくします
* **他のサーバーでも動かす** 対応していないサーバーでも動かす場合は、こちらにサーバーのアドレスを入れてください。 対応しているサーバーではこの設定は必要ありません(対応済みサーバーは下に記載しています)。
>記入例: misskey.cook, misskey.programmer.jp 
* **今の設定をCSSに**　現在こちらで設定したものをカスタムCSSとして出力し、PCに保存します。これをスマートフォンや拡張機能を入れられないPCにコピーし、misskeyサイトの　設定→全般→カスタムCSS　に貼り付けて保存することで、拡張機能が利用できない環境でも同じフィルタリングを行えます。

　  

# 導入方法
普通に利用するだけの方はストアよりダウンロード可能です。  
* Chrome Webストア(chrome, edge, opera向け)  
https://chrome.google.com/webstore/detail/misskey-tl-filter/gligjcdfcokjfdkpmjgncgdoefnpkpej  
* Firefox Add-on(Firefox向け)  
https://addons.mozilla.org/ja/firefox/addon/misskey-tl-filter/


開発、デバッグ目的、もしくは開発段階のものを早期で利用したい場合はここにあるソースコードから手動でのインストールが可能です。
zipをダウンロードして、各ブラウザの手動インストール方法に従ってインストールしてください。

　  

# 今後の機能追加で検討しているもの
* RN非表示のホワイトリスト
* セルフRNの表示/非表示(実装難度高めのため現在保留)

　  

<h2 id="forFirefox">Firefoxの方へ</h2>
firefoxでは、他のブラウザで対応している機能が標準でオフになっており、それが原因でうまく動作しません。  
そのため、以下の手順を踏んで設定を変更する必要があります。
* ` about:config `とURL欄に入力してenter
* 注意喚起の画面が出てきますが、無視して進む
* 出てきた画面の検索バーに、`layout.css.has-selector.enabled` と入力して、この名前の設定を出す。
* 出てきた設定をダブルクリックして、値を`**True**`にする。
* Firefoxを再起動し、misskey.ioにアクセス。
(場合によっては2,3回ほどページの再読み込みをしないとうまく動作をしてくれないことがあります)

　  

# 他サーバーへの対応
この拡張機能はある程度の規模のサーバーであれば動作しますが、サーバーによってはうまく動作しません。この場合は、ユーザーが設定することで他のサイトでも利用できます。
* アカウントのありなしに関わらず、一度 https://Misskey.io へアクセスしてください。
* この状態で拡張機能のアイコンをクリックすると、設定画面が開きます。  
>(Chromeなら右上のパズルのピースアイコンをクリックすると、今入っている拡張機能の一覧が表示されるので、その中から探してください。
  また、右のピンマークをクリックすることで、ブラウザの上部に常時表示することも可能です。)  
![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/4ad28793-a2bf-4b70-961f-754ee53042ba)
* 設定画面をスクロールし、下にある「他のサーバーでも動かす」オプションに、動かしたいサーバーの名前を入れてください。
>設定例: ` misskey.art `  
>動かしたいサーバーが複数ある時, ` misskey.design,nijimiss.moe,misskey.04.si `

この状態でご自身のサーバーへアクセスすることで、拡張機能が有効になります。  
ただし、misskey.io以外での動作は保証していません。動かない可能性があります。  

　  

# 動作可能なサーバー一覧
ここにあるサーバーでは、事前設定なしで拡張機能を利用できます。
* 45sukey.net
* buicha.social
* drdr.club
* eostagram.com
* fix.misskey.life
* friendsyu.me
* ikaskey.bktsk.com
* invillage-outvillage.com
* kawaiivrc.site
* labo.wovs.tk
* live-theater.net
* maniakey.com
* mattyaski.co
* mi.cbrx.io
* misskey.04.si
* misskey.art
* misskey.backspace.fm
* misskey.design
* misskey.gamelore.fun
* misskey.io
* misskey.kindworld.one
* misskey.life
* misskey.niri.la
* misskey.ranranhome.info
* misskey.sda1.net
* misskey.systems
* misskey.yukineko.me
* mi-wo.site
* mk.shrimpia.network
* mk.yopo.work
* mof.rorea.moe
* msk.ilnk.info
* nekomiya.net
* nijimiss.moe
* n-kaiwai.work
* novelskey.tarbin.net
* oekakiskey.com
* ojousama-tea.party
* otoskey.tarbin.net
* rhythmisskey.games
* seikora.one
* side.misskey.productions
* sk.204.jp
* submarin.online
* sushi.ski
* trpger.us
* voskey.icalo.net
* warpday.net
* yurisskey.yubarira.net


　  

# 質問集
[こちらのページにまとめてあります](q&a.md)

# 機能追加のリクエストやバグ報告について
もし何か機能追加やバグ報告について言いたいことがある場合は、私のmisskeyアカウントにDMしてくるか,githubにissue立てるなりしていただいて構いません  


# 再配布、改変など
MITライセンスに従います。
改変、再配布、販売などは自由ですが,このソフトウェアの著作権表示（「Copyright (c) 2023 ikakonbu」）と、このライセンスの全文（英語の文章）を、ソースコードのなかや、ソースコードに同梱したライセンス表示用の別ファイルなどに掲載してください。
また、このプログラムによる一切の損害について私は保証しません
