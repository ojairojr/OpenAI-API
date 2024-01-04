import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data:{
      title: "Título do YouTube",
      template: `Atue como um especialista em copyrigth e crie 3 títulos para um vídeo no YouTube.
      
      Abaixo você receberá à transcrição do vídeo e, com base nela, crie esses títulos.
      Além disso, abaixo também terá uma refeência de títulos para que os retorne dessa forma.

      Os títulos deverão ter no máximo 68 caracteres.
      Os títulos devem ser chamativos e atrativos para maximizar os cliques.

      Traga-os em formato de lista como o exemplo abaixo:
      '''
      - Título 1
      - Título 2
      - Título 3
      '''
      Transcrição:
      '''
      {transcription}
      '''`.trim()
    }
  })

  await prisma.prompt.create({
    data:{
      title: "Descrição YouTube",
      template: `Seu papel é criar uma descriçao para um vídeo no YouTube.

      Abaixo receberá uma transcrição do vídeo. Com base nela crie uma descrição sucinta.
      Ela deverá possuir no máximo 80 palavras em primeira pessoa apresentando os principais pontos do vídeo.

      Utilize palavras que atraiam a atenção de quem ler.
      Ao fim da descrição, traga também entre 3 a 7 hashtags em letras minúsculas com os assuntos principais do vídeo

      O retorno deve seguir o exemplo abaixo:
      '''
      Descrição
      #hashtag1 #hashtag2 #hashtag3
      '''

      Transcrição:
      '''
      {transcription}
      '''`.trim()
    }
  })
}

main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.log(e)
      await prisma.$disconnect()
      process.exit(1)
    })