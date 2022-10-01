import Lottie from 'react-lottie';
import animation from '../../lotties/empty-box.json'

import styles from './EmptyBox.module.css'

export const EmptyBox = () => {
  return (
    <div className={styles.emptyBox}>
      <p>Whoa! Such emptyness... You should add an event!</p>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animation,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        height={400}
        width={400}
      />
    </div>
  )
}