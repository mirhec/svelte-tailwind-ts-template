FROM mirhec/bible-cli as builder

RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

RUN wget "https://raw.githubusercontent.com/strongs-de/zefania-xml-bibles/master/Bibles/GER/Lutherbibel/Luther%201912/SF_2009-01-20_GER_LUTH1912_(LUTHER%201912).xml"
RUN wget "https://raw.githubusercontent.com/strongs-de/zefania-xml-bibles/master/Bibles/GER/Elberfelder/Elberfelder%201905/SF_2009-01-22_GER_ELB1905STR_(ELBERFELDER%201905).xml"
RUN wget "https://raw.githubusercontent.com/strongs-de/zefania-xml-bibles/master/Bibles/GER/Schlachterbibel/Schlachter%20Bibel%201951%20with%20Strong/SF_2009-01-20_GER_SCH1951_(SCHLACHTER%20BIBEL%201951%20WITH%20STRONG).xml"
RUN wget "https://raw.githubusercontent.com/strongs-de/zefania-xml-bibles/master/Bibles/GER/Interlinearuebersetzung/SF_2009-01-20_GER_ILGRDE_(INTERLINEAR%C3%9CBERSETZUNG).xml"
RUN wget "https://raw.githubusercontent.com/strongs-de/zefania-xml-bibles/master/Bibles/GRC/Textus%20Receptus%20NT/Strongs%20Numbers/SF_2009-01-20_GRC_GNTTR_(TEXTUS%20RECEPTUS%20NT(STRONGS)).xml"

RUN bible-cli "./*.xml" export


FROM node:17-alpine3.15

WORKDIR /usr/src/app

COPY rollup.config.js ./
COPY tsconfig.json ./
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY ./src ./src
COPY ./public ./public

RUN pnpm run build

COPY --from=builder /data/static ./public/

EXPOSE 5001

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]