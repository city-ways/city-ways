<?php

namespace App\Security;

use App\Entity\History;
use App\Entity\Parkings;
use App\Entity\Users;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class ParkingVoter extends Voter
{
    /*
     *
     */
    const BOOK = 'book';
    const EDIT = 'edit';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, [self::BOOK, self::EDIT])) {
            return false;
        }

        if (!$subject instanceof Parkings) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof Users) {
            return false;
        }
        // admin can edit all parkings
        if ($this->security->isGranted('ROLE_SUPER_ADMIN')) {
            return true;
        }

        /** @var Parkings $parkings */
        $parkings = $subject;

        switch ($attribute) {
            case self::BOOK:
                return $this->canBook($parkings, $user);
            case self::EDIT:
                return $this->canEdit($parkings, $user);
        }

        throw new \LogicException('What are you doing??');
    }

    private function canBook(Parkings $parkings, Users $user): bool
    {
        /** @var History $lastHistory */
        $lastHistory = null;
       if ($parkings->getStatus()) {
           foreach ($parkings->getHistory() as $value) {
               if ($value->getClientUser() !== null) {
                   if ($value->isInProgress() && $value->getClientUser()->getId() == $user->getId()) {
                       $lastHistory = $value;
                   }
               }
           }
           if ($lastHistory == null) {
               return false;
           }
       }
        if ($parkings->getStatus()) {
            if ($lastHistory->getParking()->getId() != $parkings->getId()){
                return false;

            }
        }
        // only the user can book a parking if the user aren't already booking one.
        foreach ($user->getHistory() as $history) {
            if ($history->isInProgress() && $history->getParking()->getId() !== $parkings->getId()) {
                return false;
            }
       }
        return true;

    }

    private function canEdit(Parkings $parkings, Users $user): bool
    {
        return $user == $parkings->getOwner()->first();
    }
}