import { motion } from "framer-motion"

## loading animation

export const MyComponent = () => (
<motion.div
animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
/>
)

const variants = {
open: { opacity: 1, x: 0 },
closed: { opacity: 0, x: "-100%" },
}

## Nav

export const MyComponent = () => {
const [isOpen, setIsOpen] = useState(false)

return (
<motion.nav
animate={isOpen ? "open" : "closed"}
variants={variants} >
<Toggle onClick={() => setIsOpen(isOpen => !isOpen)} />
<Items />
</motion.nav>
)
}

### scroll triggered

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
/>

## viewport scroll

import { motion, useViewportScroll } from "framer-motion"

export const CircleIndicator = () => {
const { scrollYProgress } = useViewportScroll()

return (
<motion.path
d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
style={{ pathLength: scrollYProgress }}
/>
)
}

## slide in and out

import { motion, AnimatePresence } from "framer-motion"
export const Slideshow = ({ image }) => (
<AnimatePresence>
<motion.img
key={image.src}
src={image.src}
initial={{ opacity: 0, y: 200 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
/>
</AnimatePresence>
)

## shared layout

isSelected ? <motion.div layoutId="underline" /> : null

## line drawing

Line drawing animations are made simple with the special `pathLength`, `pathSpacing` and `pathOffset` properties available on many SVG elements.
<motion.circle
initial={{ pathLength: 0 }}
animate={{ pathLength: 1 }}
/>

## svg morphing

https://codesandbox.io/s/framer-motion-morphsvg-example-dp7to?from-embed
