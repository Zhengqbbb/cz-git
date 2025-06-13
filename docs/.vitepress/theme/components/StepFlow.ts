import { defineComponent, h } from 'vue'
import type { Component, PropType } from 'vue'

export default defineComponent({
    name: 'StepFlow',
    props: {
        type: String as PropType<'ul' | 'ol'>,
    },

    setup(props, { slots }) {
        return () => {
            const items = (slots.default?.() ?? [])
                .filter(vnode => (vnode.type as Component).name === 'StepFlowItem')
                .map((vnode) => {
                    vnode.props = vnode.props ?? {}
                    return vnode
                })
            const Tag = props.type === 'ol' ? 'ol' : 'ul'

            return h(Tag, { class: 'step-flow' }, items.map((item, index) => {
                return h(
                    'li',
                    { 'class': 'step-flow-item', 'data-step': index + 1 },
                    item,
                )
            }))
        }
    },
})
