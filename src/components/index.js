import MyText from '@/components/my-text'
import MyBard from '@/components/my-bard'
import MyChannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component(MyBard.name, MyBard)
    Vue.component(MyText.name, MyText)
    Vue.component(MyChannel.name, MyChannel)
  }
}
