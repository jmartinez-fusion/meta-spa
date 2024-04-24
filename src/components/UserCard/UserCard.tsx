import { type FC } from 'react'
import placeholder from './placeholderImage.jpg'
import { type UserCardProps } from './types'
import styles from './userCard.module.scss'

const UserCard: FC<UserCardProps> = ({ name, email, image }) => {
  return (
    <div className={styles.authUserContainer}>
      <img src={image ?? placeholder} alt={name} className={styles.avatar} />
      <div className={styles.userInformation}>
        <div className={styles.name}>{name}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  )
}

export default UserCard
