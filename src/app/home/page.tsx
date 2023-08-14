'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CERTIFICATION_DUMMY } from '@/common/constants/certification.dummy'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@/common/design'

/**
 * ホーム画面
 * @screenname HomeScreen
 * @discription 資格プラットフォームを一覧表示する画面
 */

export default function HomeScreen() {
  const router = useRouter()
  /** cert：資格、plt：プラットフォーム、type：資格種類 */
  const [certPlt, setCertPlt] = useState<string[]>([])
  const [certType, setCertType] = useState<
    { pltName: string; id: string; typeName: string }[]
  >([])
  useEffect(() => {
    const fetch = async () => {
      setCertPlt(CERTIFICATION_DUMMY.map((item) => item.pltName))
      const dummyList: { pltName: string; id: string; typeName: string }[] = []

      CERTIFICATION_DUMMY.map((item) => {
        item.certType.map((cert) => {
          dummyList.push({
            pltName: item.pltName,
            id: cert.id,
            typeName: cert.name,
          })
        })
      })
      setCertType(dummyList)
    }
    fetch()
  }, [])
  const pageTransition = (exam_id: string) => {
    router.push(`/exam/${exam_id}`)
  }
  return (
    <Accordion>
      {certPlt?.map((item: string, index: number) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                {item}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {certType.map((cert) => {
            if (cert.pltName === item) {
              return (
                <AccordionPanel
                  pb={4}
                  key={cert.id}
                  onClick={() => pageTransition(cert.id)}
                >
                  {cert.typeName}
                </AccordionPanel>
              )
            }
          })}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
