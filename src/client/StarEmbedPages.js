const StarEmbedPages = async (ctx, pages, emojiList = ['⏪', '⏩'], timeout = 120000) => {
  ctx.msg = ctx.message
  if (!ctx.msg && !ctx.msg.channel) throw new Error('Canal inacessível.')
  if (!pages) throw new Error('Amas cadê as paginas?.')
  if (emojiList.length != 2) throw new Error('Precisa de dois emojis pra paginas né amigão?.')
  let page = 0
  const curPage = await ctx.msg.channel.send(ctx.message.author, pages[page].create)
  for (const emoji of emojiList) await curPage.addReaction(emoji)
  const addReactionionCollector = curPage.createaddReactionionCollector(
    (addReactionion, user) => emojiList.includes(addReactionion.emoji.name) && user.id == ctx.message.author.id, {
      time: timeout
    }
  )
  addReactionionCollector.on('collect', addReactionion => {
    addReactionion.users.remove(ctx.msg.author)
    switch (addReactionion.emoji.name) {
      case emojiList[0]:
        page = page > 0 ? --page : pages.length - 1
        break
      case emojiList[1]:
        page = page + 1 < pages.length ? ++page : 0
        break
      default:
        break
    }
    curPage.edit(ctx.message.author, pages[page].create)
  })
  addReactionionCollector.on('end', () => {
    if (!curPage.deleted) {
      curPage.addReactionions.removeAll()
    }
  })
  return curPage
}
module.exports = StarEmbedPages
