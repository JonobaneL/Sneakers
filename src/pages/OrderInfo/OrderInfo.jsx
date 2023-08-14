import React from 'react';
import styles from './OrderInfo.module.scss';
import Button from '../../components/UI/button/Button';
import { useNavigate } from 'react-router-dom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
const order = {
    card:{methodID: 'method1691579698519', cartNumber: '8798237598743985', cvv: '324', date: '12/26'},
    email:"fedun.andri@mail.com",
    firstName: "Andriy",
    lastName: "Fedun",
    paymentMethod: "Credit or Debit Card",
    phoneNumber: "098 1234 454",
    shipping:{company: 'ukrposhta', appartment:7, address: 'Богдана Хмельницького 3', addressID: 'address1690821178624'},
}
const OrderInfo = () => {
    const navigate = useNavigate()
    return (
        <div className={styles['order-info']}>
            <div className={styles.title}>
                <h1>Order confirmed!</h1>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.message}>
                        <h2 className={styles.message__title}>Thank you!</h2>
                        <p className={styles.message__content}>
                            We are getting started on your order right away, and you will recive an order confirmation email to <span className={styles.message__email}>{order.email}</span>. In the meantime, explore the latest fashion and get inspired by new trends.
                        </p>
                        <div className={styles.message__button}>
                            <Button
                                width='100%'
                                height='45px'
                                mode='primary'
                                onClick={()=>navigate('/')}
                            >Continue Shopping</Button>
                        </div>
                        
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut optio est assumenda, amet odio dolore ipsa repellendus, molestias, culpa iste harum facere totam tempore voluptates. In saepe neque dignissimos voluptatem.
                    Nulla fugiat fuga, quasi amet enim, optio accusantium quo vel harum excepturi qui sed illum inventore velit id, minus quaerat tempora nam! Illum eum necessitatibus magni nesciunt tempore minus provident?
                    Neque autem temporibus similique. Maxime dicta tenetur dolores. Aperiam odit ullam iusto quia quisquam vel sit laborum ratione, ex doloribus molestiae repellendus saepe deleniti eos, tempore commodi repellat distinctio modi.
                    Saepe corporis sunt accusamus perferendis, laudantium dolore esse molestias iusto eligendi consectetur est quo ex ullam ab qui eum, excepturi ipsum fugiat suscipit quae. Voluptatem reprehenderit explicabo voluptatum excepturi nemo!
                    Libero corporis nihil minima. Totam, doloribus? Cum animi quos eius. Perspiciatis doloribus tenetur est cumque officiis laborum eum nemo, dolorum velit voluptates fuga dolore eos? Molestiae cumque repellendus numquam. Facere!
                    Non ut aspernatur officiis quae expedita tenetur quod, et veniam sunt distinctio, nihil ipsam, laboriosam quaerat officia modi dolorum praesentium natus ducimus eaque. Id quos, necessitatibus rem quam dolores deleniti!
                    Ea quas ut nihil maiores magnam ipsum? Commodi quibusdam quasi eos odio facilis ea animi unde neque, aliquam esse odit nulla totam eum ex recusandae veniam at deleniti obcaecati. Sit!
                    Reiciendis deleniti, ullam vitae nam assumenda fugit illo fugiat iusto error facilis minima iste distinctio enim doloremque voluptatum perferendis laborum amet quas ipsa voluptatem quibusdam rem molestiae totam ea. Quisquam.
                    Exercitationem voluptatum consectetur atque deserunt modi nostrum amet. Reiciendis provident, quasi voluptatem aut, sequi distinctio dolor neque doloribus autem explicabo quaerat, voluptate tenetur deleniti! Atque sit nam cumque mollitia ea.
                    Quaerat, incidunt. Commodi vel sint alias ipsum quis unde suscipit debitis maxime autem molestiae ea tenetur cumque sed cum repellendus corrupti, quae, rerum, aspernatur hic dignissimos? Consectetur cumque animi illum.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero amet itaque accusantium? Aspernatur minus culpa, deleniti molestiae aliquam voluptate saepe reprehenderit, quibusdam debitis porro obcaecati accusantium similique laudantium enim quas.
                    Sapiente rerum ab maxime, exercitationem harum blanditiis sed ad reprehenderit repellendus soluta explicabo beatae adipisci omnis, asperiores illo, quibusdam temporibus aliquam repudiandae eum necessitatibus similique cum. Cupiditate laudantium asperiores quo.
                    Amet molestias recusandae maiores debitis expedita architecto repellendus alias suscipit nobis distinctio repudiandae soluta quidem, sint eaque blanditiis eveniet totam praesentium? Culpa alias vel suscipit aut ab illo facilis cumque.
                    Asperiores, magni? Nesciunt, repellendus magnam. Tenetur odio in provident explicabo. Illo quis possimus perferendis voluptates corrupti recusandae numquam atque, quo minus, blanditiis fugiat cumque iusto suscipit eos repudiandae vel optio.
                    Eum, nemo facere. Eius architecto quibusdam corporis voluptates laboriosam nihil, perferendis enim modi perspiciatis minus aliquid hic amet animi veritatis. Laborum possimus sed repellendus unde atque, nesciunt mollitia dicta iste.
                    Nobis doloremque nulla est hic suscipit id at, totam error ratione, nemo asperiores, porro deserunt possimus culpa ex maxime quibusdam accusantium harum repellendus fugiat minus in temporibus necessitatibus laudantium. Quos.
                    Officiis ab deserunt exercitationem expedita. Hic sit error accusamus aliquid magni, eos sequi doloremque dolores fuga quos optio illo temporibus voluptas quas non enim facilis voluptates laboriosam nihil sed nisi.
                    Error recusandae in illum nulla, accusantium neque perspiciatis esse praesentium debitis dolorem soluta mollitia nisi facilis excepturi architecto dolore deserunt quae omnis deleniti, quas sunt quidem magnam numquam voluptatum. Optio?
                    Alias nisi a cum, nam ipsam nostrum hic, pariatur obcaecati unde maxime nesciunt numquam. Optio amet rerum harum ipsum laborum, atque quam voluptas tempora beatae laboriosam ratione id magni quas?
                    Neque porro perferendis possimus ratione magnam vero aliquid officia deserunt modi architecto, soluta necessitatibus sequi rerum ab aspernatur cum voluptatum, veniam delectus amet illum ea. Consequuntur quos sapiente tempora nemo!
                </div>
            </div>
            
        </div>
    );
};

export default OrderInfo;