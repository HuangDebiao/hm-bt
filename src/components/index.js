import MyText from '@/components/my-text'
import MyBard from '@/components/my-bard'

export default {
  install (Vue) {
    Vue.component(MyBard.name, MyBard)
    Vue.component(MyText.name, MyText)
  }
}
