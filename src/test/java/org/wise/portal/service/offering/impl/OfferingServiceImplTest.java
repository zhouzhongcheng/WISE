/**
 * Copyright (c) 2007 Encore Research Group, University of Toronto
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
package org.wise.portal.service.offering.impl;

import java.util.LinkedList;
import java.util.List;

import junit.framework.TestCase;

import org.easymock.EasyMock;
import org.wise.portal.dao.ObjectNotFoundException;
import org.wise.portal.dao.module.CurnitDao;
import org.wise.portal.dao.offering.OfferingDao;
import org.wise.portal.domain.module.Curnit;
import org.wise.portal.domain.module.impl.CurnitImpl;
import org.wise.portal.domain.run.Offering;
import org.wise.portal.domain.run.impl.OfferingImpl;
import org.wise.portal.domain.run.impl.OfferingParameters;
import org.wise.portal.service.acl.AclService;
import org.wise.portal.service.offering.impl.OfferingServiceImpl;

/**
 * @author Laurel Williams
 * 
 * @version $Id$
 */
public class OfferingServiceImplTest extends TestCase {
	
	private static final String OFFERING_NAME = "offeringname";
	
	private OfferingDao<Offering> mockOfferingDao;
	
	private CurnitDao<Curnit> mockCurnitDao;
	
	private AclService<Offering> mockAclService;

	private OfferingServiceImpl offeringServiceImpl;
	
	private static final Long CURNIT_ID = new Long(3);

	private static final Long JNLP_ID = new Long(5);

	private static final Long NON_EXISTING_CURNIT_ID = new Long(9999999);

	/**
	 * @see junit.framework.TestCase#setUp()
	 */
	@SuppressWarnings("unchecked")
	protected void setUp() throws Exception {
		super.setUp();
		this.offeringServiceImpl = new OfferingServiceImpl();

		this.mockOfferingDao = EasyMock.createMock(OfferingDao.class);
		this.offeringServiceImpl.setOfferingDao(this.mockOfferingDao);
		
		this.mockCurnitDao = EasyMock.createMock(CurnitDao.class);
		this.offeringServiceImpl.setCurnitDao(this.mockCurnitDao);

		this.mockAclService = EasyMock.createMock(AclService.class);
		this.offeringServiceImpl.setAclService(mockAclService);
		
	}

	/**
	 * @see junit.framework.TestCase#tearDown()
	 */
	protected void tearDown() throws Exception {
		super.tearDown();
		this.offeringServiceImpl = null;
		this.mockOfferingDao = null;
		this.mockCurnitDao = null;
		this.mockAclService = null;
	}

	public void testGetOfferingList() throws Exception {
		List<Offering> expectedList = new LinkedList<Offering>();
		expectedList.add(new OfferingImpl());

		EasyMock.expect(this.mockOfferingDao.getList()).andReturn(expectedList);
		EasyMock.replay(this.mockOfferingDao);
		assertEquals(expectedList, offeringServiceImpl.getOfferingList());
		EasyMock.verify(this.mockOfferingDao);
	}
	
	public void testCreateOffering() throws Exception {
		//use beans
		Curnit curnit = new CurnitImpl();
		EasyMock.expect(this.mockCurnitDao.getById(CURNIT_ID)).andReturn(curnit);
		EasyMock.replay(this.mockCurnitDao);
		
		OfferingParameters offeringParameters = new OfferingParameters();
		offeringParameters.setName(OFFERING_NAME);
		offeringParameters.setCurnitId(CURNIT_ID);
		offeringParameters.setJnlpId(JNLP_ID);

		EasyMock.verify();
	}
	
	public void testCreateOfferingObjectNotFoundException_curnit() throws Exception {
		EasyMock.expect(this.mockCurnitDao.getById(NON_EXISTING_CURNIT_ID)).andThrow(new ObjectNotFoundException(NON_EXISTING_CURNIT_ID, Curnit.class));
		EasyMock.replay(this.mockCurnitDao);
		
		OfferingParameters offeringParameters = new OfferingParameters();
		offeringParameters.setName(OFFERING_NAME);
		offeringParameters.setCurnitId(NON_EXISTING_CURNIT_ID);
		offeringParameters.setJnlpId(JNLP_ID);

		try {
			offeringServiceImpl.createOffering(offeringParameters);
			fail("ObjectNotFoundException was expected");
		} catch (ObjectNotFoundException e) {
		}
				
		EasyMock.verify();
	}	
}