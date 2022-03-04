
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';
import styles from './Activitycard.module.scss'
import Link from 'next/link'


const colorByCategoryId = {
    1: '#011627',
    2: '#E71D36',
    3: '#FF9F1C',
    4: "#EF482D",
    5: '#186D6F',
    6: '#2EC4B6',
    7: '#08333F'
}

const ActivityCard = (props) =>
{
    const { t } = useTranslation();

    const image = props.image || 'https://images.unsplash.com/photo-1523867904486-8153c8afb94f';
    const title = props.title || t('activityCard_title');
    const text = props.text || t('activityCard_description');
    const price = props.price || `${t('currency')} 0.00`; 
    const category = (props.category ? props.category.name : '');
    const idCat = (props.category ? props.category.id : 0);
    const url = props.url || ``;
    const isSkeleton = props.skeleton || false;

    let content =   <>
                        <div 
                            className={styles.single_card_image} 
                            style={{ backgroundImage: `url(${image.replace('?w=540', '') + '?w=400'})` }}
                        >
                            <p style={{ backgroundColor: colorByCategoryId[idCat] }}>{category}</p>
                        </div>
                        <div className={styles.single_card_info}>
                            <h3>{title}</h3>
                            <p>{text}</p>
                            <div className={styles.single_card_info_price}>
                                <p>{price}</p>
                                <Link href={url}>
                                    <a style={{ color: colorByCategoryId[idCat] }}>{t('activityCard_text')}</a>
                                </Link>
                            </div>
                        </div>
                    </>;

    if(isSkeleton) content =    <>
                                    <div className={styles.single_card_image}>
                                        <p className={styles.single_card_category_skeleton}></p>
                                    </div>
                                    <div className={styles.single_card_info}>
                                        <div className={styles.single_card_info_title_skeleton}></div>
                                        <div className={styles.single_card_info_text_skeleton}></div>
                                        <div className={styles.single_card_info_text_skeleton}></div>
                                        <div className={styles.single_card_info_text_skeleton}></div>
                                        <div className={styles.single_card_info_price}>
                                            <div className={styles.single_card_info_price_skeleton}></div>
                                            <div className={styles.single_card_info_price_skeleton}></div>
                                        </div>
                                    </div>
                                </>;

    return (
        <div className={styles.single_card}>
            {content}
        </div>
    )
}

export default ActivityCard;