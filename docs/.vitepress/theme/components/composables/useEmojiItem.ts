import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const emojiArr = ['🎉', '🐛', '💚', '🔍️', '💫', '👷', '🎡', '🧱', '💄', '⚡️', '♻️', '🔧', '✨', '🔨', '🏷️', '🚀', '🌐', '📝', '📚', '✅', '🔖', '📦️']

export const useEmojiItem = (): Ref<string> => {
  const emoji = ref('✨')
  onMounted(() => {
    const interval = setInterval(() => {
      emoji.value = emojiArr[Math.floor(Math.random() * emojiArr.length)]
    }, 340)
    onBeforeUnmount(() => {
      clearInterval(interval)
    })
  })
  return emoji
}
