FROM node:20

# 必要なパッケージをインストール（sudo）
RUN apt-get update && apt-get install -y sudo

# 作業ディレクトリを設定
WORKDIR /home/household-app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 作業ディレクトリの所有者を node ユーザーに変更
RUN chown -R node:node /home/household-app

# node ユーザーに切り替える
USER node

# npm install を node ユーザーで実行
RUN npm install --verbose

# その他のソースコードをコピー
COPY --chown=node:node . .

# ポートを公開
EXPOSE 5173

# コンテナ起動時に実行するコマンド
CMD ["npm", "run", "dev"]
