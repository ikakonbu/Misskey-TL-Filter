# Misskey-TL-Filter
misskey.io にて、特定のノートへのフィルタリングをリアルタイムで変更できるchrome拡張機能  

　  

   
# 対応環境
WindowsおよびMacのChrome(もしくはChrome拡張機能をサポートしているブラウザ)  
デフォルトUI および　デッキUI で動作を確認しています。  
Misskey.ioのみで動作します。他サーバでは現時点では対応していません。

　  

# 導入方法
普通に利用するだけの方はChrome webストアからインストールできます
https://chrome.google.com/webstore/detail/misskey-tl-filter/gligjcdfcokjfdkpmjgncgdoefnpkpej?hl=ja

開発、デバッグ目的で利用したい方は、ここにあるソースコードから手動でのインストールが可能です。
このリポジトリ全体をDonwonload ZIPでダウンロードし、展開したものを下のURLに書かれている手順で開くとインストールされます。  
https://setup-lab.net/chrome-extended-local-install/　　

　  

# 機能説明
機能はシンプルで,https://Misskey.io を開くと拡張機能が有効になります。  
開いている状態で拡張機能アイコンをクリックすると、各種フィルタの設定画面が開きます。

![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/91f50301-3f5b-47ef-b67f-3626805468a0)

上段ではTLごとにかけるフィルタリングを設定できます。ホームタイムライン、ローカルタイムライン、リスト　の３つのライムラインに個別でフィルタを利用できます

* **RNを非表示**　　　　　リノートを全て非表示にします。
* **引用を非表示**　　　　引用ノートを全て非表示にします
* **NSFWを非表示**　　　閲覧注意の設定がされた画像、動画が添付されているノートをすべて非表示にします。
* **CWを非表示**　　　　`もっと見る` で本文が隠されているノートを全て非表示にします。
   
  
下段では全てのタイムラインで適用されるオプションです。
* **チャンネルノートを非表示**　　　  チャンネル投稿に設定されているノートを全て非表示にします。
* **他のサーバーからのノートを非表示**　　misskey.io以外のサーバーから投稿されたノートを全て非表示にします
* **misskey.ioからのノートを非表示**　　misskey.io以外のサーバーから投稿されたノートだけを表示します
* **以下のユーザーIDのノートを非表示** 右の入力欄に設定されたユーザーIDからのノートを全て非表示にします。

  
>例: 村上さん(@AureoleArk)としゅいろさん(@syuilo) を非表示にしたい場合は, ` AureoleArk,syuilo `と入力すると非表示になります。
>他のサーバーのユーザー(@ikakonbu@nijimiss.moe)の場合は、` ikakonbu@nijimiss.moe ` のように入れてください  

　  

# 今後の機能追加予定
* ダークモード/ライトモードの判定をOSの色設定基準からMisskeyページの色設定基準にする(優先度：高）
* 特定ユーザーのRenoteを非表示にする機能追加(優先度:中)
* Firefoxへの実装(優先度:低)
* Misskey.io以外のインスタンスでも動くようにする(優先度:低)

　  

# 機能追加のリクエストやバグ報告について
もし何か機能追加やバグ報告について言いたいことがある場合は、私のmisskeyアカウントにDMしてくるか,githubにissue立てるなりしていただいて構いません  

　  

# 再配布、改変など
再配布、改変しての配布などについては特に制限は設けません、お好きにお使いださい。
可能であれば改変元としてここを記載してくれればいいくらいです。
また、当プログラムによって引き起こされた損害については一切保証しません。

