import {formatTimeDifference} from '@/src/util/formatTimeDifference';
import {Pressable, View} from 'react-native';
import styles from '../styles';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '@/src/constants/screenname';
import TextComp from '@/src/components/TextComp';
import GeneralIcon from '@/src/assets/GeneralIcon';
import {TicketIcon} from '@/src/assets/icons';
import React from 'react';
import {useComplainStore} from '@/src/storage/useComplainStore';

const statusStyleMap = {
  Pending: {bg: '#FEE2E2', dot: '#CF2431', text: 'Pending'},
  Closed: {bg: '#f7f0f0', dot: '#CF2431', text: 'Closed'},
  'In Progress': {bg: '#FEF3C7', dot: '#F59E0B', text: 'In Progress'},
  Resolved: {bg: '#DCFCE7', dot: '#16A34A', text: 'Resolved'},
  Reopened: {bg: '#FEF3C7', dot: '#F59E0B', text: 'In Progress'},
} as const;

function ComplaintCard({item}: {item: any}) {
  
  const {findById} = useComplainStore();
  const formattedDate = formatTimeDifference(item?.createdAt);
  const {complaintStatus} = item ?? {};
  const stat =
    complaintStatus == 'PENDING'
      ? 'Pending'
      : complaintStatus == 'Closed'
      ? 'Closed'
      : complaintStatus == 'in_progress'
      ? 'In Progress'
      : complaintStatus == 'Reopend'
      ? 'Reopend'
      : 'Resolved';
  const statusConfig = statusStyleMap[stat];
  return (
    <Pressable
      style={[styles.card, {borderLeftColor: statusConfig?.dot}]}
      onPress={() => {
        findById(item?.id);
        navigationRef.navigate(SCREEN_NAME.TICKET_DETAILS, {
          ticketDetails: item,
        });
      }}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleWrap}>
          <View style={styles.categoryPill}>
            <TextComp
              text={item?.concernedDepartment ?? ''}
              style={styles.categoryText}
            />
          </View>
          <TextComp text={item?.title} style={styles.cardTitle} />
        </View>

        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: statusConfig?.bg,
              borderWidth: item.status === 'OPEN' ? 1 : 0,
              borderColor:
                item.status === 'OPEN'
                  ? 'rgba(228, 189, 187, 0.3)'
                  : 'transparent',
            },
          ]}>
          <View
            style={[styles.statusDot, {backgroundColor: statusConfig?.dot}]}
          />
          <TextComp text={statusConfig?.text} style={styles.statusText} />
        </View>
      </View>

      <TextComp text={item?.description} style={styles.description} />

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <GeneralIcon width={20} height={16} color="#49555A" />
          <TextComp text={formattedDate} style={styles.footerText} />
        </View>
        <View style={styles.footerItem}>
          <TicketIcon width={13} height={11} color="#49555A" />
          <TextComp
            isDynamic
            text={item?.complaintId ?? 'VT'}
            style={styles.footerText}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(ComplaintCard);
