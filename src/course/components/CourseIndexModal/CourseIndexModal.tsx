import React from "react";

import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useObservable } from "react-use";

import CourseIndex from "~/core/models/CourseIndex";

import UserStore from "~/ctrl/store/user";

import { _CourseIndexModalLink } from "./_CourseIndexModalLink";

interface CourseIndexModalProps {
  index: CourseIndex;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseIndexModal: React.FC<{ children?: React.ReactNode } & CourseIndexModalProps> = ({
  index,
  isOpen,
  onClose,
}) => {
  const { courseId } = useRouter().query as any;

  const userData = useObservable(UserStore.data$, UserStore.data$.value);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalCloseButton />
        <ModalBody py={8} px={6} overflowX={"hidden"}>
          <VStack divider={<Divider />} align={"start"} spacing={6}>
            {Object.entries(index).map(([chapterId, chapter], i) => (
              <VStack key={i} spacing={2} align={"start"} w={"full"}>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"medium"} lineHeight={"short"}>
                  {chapter.name}
                </Text>
                <Box w={"full"}>
                  {Object.entries(chapter.content).map(([pageId, page], j) => {
                    return (
                      <_CourseIndexModalLink
                        key={j}
                        href={`/course/${courseId}/${chapterId}/${pageId}`}
                        isFirst={j === 0}
                        isLast={j === Object.entries(chapter.content).length - 1}
                        title={page.name}
                        description={page.description}
                        progress={userData?.current[courseId]?.[chapterId]?.[pageId]}
                      />
                    );
                  })}
                </Box>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
