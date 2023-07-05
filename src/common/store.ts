import { ref, watch } from 'vue'

export const store = ref(0)

interface Work {
  id: string
  name: string
  platform: string[]
  category: string[]
}
interface YearlyWorks {
  year: number
  works: Work[]
}
/** 已经结构化的项目列表，外面有个年份列表包裹着 */
export const worksList = ref<YearlyWorks[]>([])
/** 去层级的项目列表，但没有年份数据 */
export const worksListSimple = ref<Work[]>([])
watch(worksList, async () => {
  for (const yearWork of worksList.value) {
    for (const work of yearWork.works) {
      worksListSimple.value.push({ 
        id: work.id, 
        name: work.name,
        platform: work.platform,
        category: work.category
      })
    }
  }
})


interface miscItem {
  type: string,
  cover: string,
  title: string,
  subtitle: string
}
/** 杂 列表内容 */
export const miscList = ref<miscItem[]>()

/** 用于禁止直接 url 访问时出现过渡 overlay，
  * 当主页（Home.vue）加载完成时，才会设置成 true，
  * trOn：TransitionON */
export const trOn = ref(false)
